
import { AppState, User, ContentData, ClientData, ContactSubmission } from '../types';
import { INITIAL_CONTENT, MOCK_CLIENT_DATA } from '../constants';

const STORAGE_KEY = 'centralake_app_state';

const defaultState: AppState = {
  currentUser: null,
  siteContent: INITIAL_CONTENT,
  clients: MOCK_CLIENT_DATA,
  contactSubmissions: [],
};

export const StorageService = {
  getState: (): AppState => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    return JSON.parse(saved);
  },

  saveState: (state: AppState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  updateContent: (content: ContentData) => {
    const state = StorageService.getState();
    state.siteContent = content;
    StorageService.saveState(state);
  },

  addContactSubmission: (submission: ContactSubmission) => {
    const state = StorageService.getState();
    state.contactSubmissions = [submission, ...state.contactSubmissions];
    StorageService.saveState(state);
    return state;
  },

  updateClientData: (clientId: string, data: ClientData) => {
    const state = StorageService.getState();
    state.clients[clientId] = data;
    StorageService.saveState(state);
  },

  setCurrentUser: (user: User | null) => {
    const state = StorageService.getState();
    state.currentUser = user;
    StorageService.saveState(state);
  }
};
