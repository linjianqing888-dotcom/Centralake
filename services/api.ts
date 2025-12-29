
import { AppState, ContentData, ContactSubmission, User } from '../types.ts';
import { INITIAL_CONTENT, MOCK_CLIENT_DATA } from '../constants.tsx';

const STORAGE_KEY = 'centralake_cloud_mock';
const API_BASE = '/api'; 

export const ApiService = {
  delay: (ms: number) => new Promise(res => setTimeout(res, ms)),

  async isCloudConnected(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  async uploadImage(file: File): Promise<string> {
    const response = await fetch(`${API_BASE}/upload?filename=${encodeURIComponent(file.name)}`, {
      method: 'POST',
      body: file,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Upload failed');
    }

    const blob = await response.json();
    return blob.url; // Returns the permanent public Vercel Blob URL
  },

  async initDatabase(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/init-db`);
      return res.ok;
    } catch {
      return false;
    }
  },

  async getAppState(): Promise<AppState> {
    try {
      const response = await fetch(`${API_BASE}/get-state`);
      if (response.ok) {
        const cloudData = await response.json();
        if (cloudData) {
          return cloudData;
        }
      }
    } catch (e) {
      console.warn("Backend API not reachable or table not ready.");
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const defaultState = {
        currentUser: null,
        siteContent: INITIAL_CONTENT,
        clients: MOCK_CLIENT_DATA,
        contactSubmissions: [],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
      return defaultState;
    }
    return JSON.parse(saved);
  },

  async saveContactSubmission(submission: ContactSubmission): Promise<AppState> {
    const state = await this.getAppState();
    state.contactSubmissions = [submission, ...state.contactSubmissions];
    
    try {
      await fetch(`${API_BASE}/update-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
    } catch (e) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    
    return state;
  },

  async updateSiteContent(content: ContentData): Promise<void> {
    const state = await this.getAppState();
    const newState = { ...state, siteContent: content };
    
    try {
      const response = await fetch(`${API_BASE}/update-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newState)
      });
      if (!response.ok) throw new Error('Cloud update failed');
    } catch (e) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    }
    await this.delay(800);
  },

  async login(email: string, pass: string): Promise<User | null> {
    await this.delay(1000);
    if (email === 'admin@centralake.com' && pass === 'admin') {
      return { id: 'admin_1', email, name: 'Managing Partner', role: 'admin' };
    }
    if (email === 'client@example.com' && pass === 'client') {
      return { id: 'client_1', email, name: 'Sarah Jenkins', role: 'client', firmName: 'Global Endowment Fund' };
    }
    return null;
  },

  exportData(): string {
    return localStorage.getItem(STORAGE_KEY) || "";
  },

  importData(json: string): void {
    try {
      JSON.parse(json);
      localStorage.setItem(STORAGE_KEY, json);
      window.location.reload();
    } catch {
      alert("Invalid data.");
    }
  }
};
