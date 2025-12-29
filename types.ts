
export type Role = 'guest' | 'client' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  firmName?: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  sector: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  date: string;
}

export interface ContentData {
  logoUrl: string;
  faviconUrl: string; // Added for Favicon support
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  strategyTitle: string;
  strategyText: string;
  philosophyText: string;
  sectors: string[];
  portfolioItems: PortfolioItem[];
  teamMembers: TeamMember[];
}

export interface ClientData {
  clientId: string;
  portfolioValue: string;
  quarterlyReturn: string;
  latestReportDate: string;
  documents: Array<{ id: string; name: string; date: string; url: string }>;
}

export interface AppState {
  currentUser: User | null;
  siteContent: ContentData;
  clients: Record<string, ClientData>;
  contactSubmissions: ContactSubmission[];
}
