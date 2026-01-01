import { ContentData } from './types.ts';

export const COLORS = {
  primary: '#0066CC', // Silver Lake Blue
  secondary: '#002147', // Navy Blue
  accent: '#00A3FF',  
  muted: '#94A3B8',
  light: '#F8FAFC',
};

export const INITIAL_CONTENT: ContentData = {
  logoUrl: "", 
  // 关键：初始值设为空字符串，而不是占位图。
  // 这样 React 发现是空时就不会去操作 DOM，保留 index.html 脚本设置好的图标。
  faviconUrl: "",
  heroTitle: "The global leader in technology investing",
  heroSubtitle: "CENTRALAKE | Integrating Value",
  heroImageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=2000",
  aboutText: "Centralake Capital is the global leader in technology investing, with approximately $100 billion in combined assets under management.",
  strategyTitle: "Our Strategic Vision",
  strategyText: "We target high-growth technology and tech-enabled opportunities across the globe, leveraging deep sector expertise.",
  philosophyText: "Value creation through partnership, innovation, and long-term perspective.",
  sectors: ["Cloud Infrastructure", "FinTech", "HealthTech", "Consumer Internet"],
  portfolioItems: [
    { id: 'p1', name: "Aether Systems", sector: "Software", description: "Cloud-native infrastructure management." },
    { id: 'p2', name: "GreenDynamics", sector: "Industrials", description: "Precision manufacturing." }
  ],
  teamMembers: [
    { id: 't1', name: "Dr. Richard Chen", title: "Managing Partner", bio: "25+ years in technology PE." }
  ]
};

export const MOCK_CLIENT_DATA = {
  "client_1": {
    clientId: "client_1",
    portfolioValue: "$450,000,000",
    quarterlyReturn: "+4.2%",
    latestReportDate: "2024-Q3",
    documents: [
      { id: '1', name: 'Q3 2024 Performance Report', date: '2024-10-15', url: '#' }
    ]
  }
};