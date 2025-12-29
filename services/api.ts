
import { AppState, ContentData, ContactSubmission, User } from '../types.ts';
import { INITIAL_CONTENT, MOCK_CLIENT_DATA } from '../constants.tsx';

/**
 * PRODUCTION SETUP GUIDE for VERCEL:
 * 
 * 1. Database: Go to Vercel Dashboard -> Storage -> Create 'Postgres'.
 * 2. Library: Install '@vercel/postgres' (requires build step).
 * 3. Logic: Replace 'localStorage' logic with real 'fetch' calls to your API routes (/api/content).
 * 
 * For this browser-only demo, we use 'localStorage' to simulate persistence.
 */
const STORAGE_KEY = 'centralake_cloud_mock';

export const ApiService = {
  delay: (ms: number) => new Promise(res => setTimeout(res, ms)),

  async getAppState(): Promise<AppState> {
    await this.delay(800);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return {
        currentUser: null,
        siteContent: INITIAL_CONTENT,
        clients: MOCK_CLIENT_DATA,
        contactSubmissions: [],
      };
    }
    return JSON.parse(saved);
  },

  async saveContactSubmission(submission: ContactSubmission): Promise<AppState> {
    // REAL WORLD: await fetch('/api/inquiries', { method: 'POST', body: JSON.stringify(submission) });
    await this.delay(1200); 
    const state = await this.getAppState();
    state.contactSubmissions = [submission, ...state.contactSubmissions];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  },

  async updateSiteContent(content: ContentData): Promise<void> {
    // REAL WORLD: await fetch('/api/config', { method: 'PATCH', body: JSON.stringify(content) });
    await this.delay(1500);
    const state = await this.getAppState();
    state.siteContent = content;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  }
};
