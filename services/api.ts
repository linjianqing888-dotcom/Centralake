
import { AppState, ContentData, ContactSubmission, User } from '../types.ts';
import { INITIAL_CONTENT, MOCK_CLIENT_DATA } from '../constants.tsx';

/**
 * 核心逻辑：
 * 1. 优先尝试从后端 API 获取数据。
 * 2. 如果没有后端，则回退到 localStorage。
 * 3. 登录逻辑现在统一由 API 处理。
 */
const STORAGE_KEY = 'centralake_cloud_mock';
const API_BASE = '/api'; // 假设您的 Vercel Serverless Functions 路径

export const ApiService = {
  delay: (ms: number) => new Promise(res => setTimeout(res, ms)),

  // 检查是否已连接云端（Vercel Postgres 等）
  async isCloudConnected(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  async getAppState(): Promise<AppState> {
    await this.delay(500);
    
    // 尝试云端同步
    try {
      const response = await fetch(`${API_BASE}/state`);
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn("Cloud Sync unavailable, falling back to LocalStorage.");
    }

    // 本地回退
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
    const state = await this.getAppState();
    state.contactSubmissions = [submission, ...state.contactSubmissions];
    
    try {
      await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        body: JSON.stringify(submission)
      });
    } catch (e) {
      // 如果没有后端，依然存入本地
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    
    return state;
  },

  async updateSiteContent(content: ContentData): Promise<void> {
    const state = await this.getAppState();
    state.siteContent = content;
    
    try {
      await fetch(`${API_BASE}/content`, {
        method: 'PATCH',
        body: JSON.stringify(content)
      });
    } catch (e) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    await this.delay(1000);
  },

  async login(email: string, pass: string): Promise<User | null> {
    await this.delay(1000);
    
    // 模拟跨设备登录逻辑：
    // 如果您有了数据库，这里应该是一个 fetch('/api/login') 请求
    // 目前使用硬编码作为演示，但逻辑已从组件中剥离
    if (email === 'admin@centralake.com' && pass === 'admin') {
      return { id: 'admin_1', email, name: 'Managing Partner', role: 'admin' };
    }
    if (email === 'client@example.com' && pass === 'client') {
      return { id: 'client_1', email, name: 'Sarah Jenkins', role: 'client', firmName: 'Global Endowment Fund' };
    }
    return null;
  },

  // 辅助功能：导出/导入数据（手动同步）
  exportData(): string {
    const data = localStorage.getItem(STORAGE_KEY);
    return data || JSON.stringify({ siteContent: INITIAL_CONTENT });
  },

  importData(json: string): void {
    try {
      JSON.parse(json); // 校验格式
      localStorage.setItem(STORAGE_KEY, json);
      window.location.reload();
    } catch {
      alert("Invalid Data Format");
    }
  }
};
