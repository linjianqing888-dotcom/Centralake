
import { AppState, ContentData, ContactSubmission, User } from '../types';
import { INITIAL_CONTENT, MOCK_CLIENT_DATA } from '../constants';

const STORAGE_KEY = 'centralake_cloud_mock';

/**
 * 这是一个模拟云端 API 的服务类。
 * 当您部署到 Vercel 并准备好真正的后端（如 Supabase 或 Vercel Postgres）时，
 * 只需在此处的 fetch() 调用中替换 URL 即可。
 */
export const ApiService = {
  // 模拟网络延迟，让交互更真实
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
    await this.delay(1200); // 模拟加密和网络传输
    const state = await this.getAppState();
    state.contactSubmissions = [submission, ...state.contactSubmissions];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  },

  async updateSiteContent(content: ContentData): Promise<void> {
    await this.delay(1500);
    const state = await this.getAppState();
    state.siteContent = content;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  async login(email: string, pass: string): Promise<User | null> {
    await this.delay(1000);
    // 模拟身份验证逻辑
    if (email === 'admin@centralake.com' && pass === 'admin') {
      return { id: 'admin_1', email, name: 'Managing Partner', role: 'admin' };
    }
    if (email === 'client@example.com' && pass === 'client') {
      return { id: 'client_1', email, name: 'Sarah Jenkins', role: 'client', firmName: 'Global Endowment Fund' };
    }
    return null;
  }
};
