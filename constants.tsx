
import { ContentData } from './types.ts';

export const COLORS = {
  primary: '#064e3b', 
  accent: '#10b981',  
  muted: '#94A3B8',
  light: '#F8FAFC',
};

export const INITIAL_CONTENT: ContentData = {
  logoUrl: "https://placehold.co/400x100/00b36e/ffffff?text=Centralake+Capital", 
  faviconUrl: "https://placehold.co/32x32/00b36e/ffffff?text=C", 
  heroTitle: "Driving Transformation Through Strategic Capital",
  heroSubtitle: "Centralake Capital is a global private equity firm specializing in mid-market sector-leading companies.",
  heroImageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
  aboutText: "Centralake Capital focuses on private equity and special situations. We partner with world-class management teams by providing patient, long-term capital.",
  strategyTitle: "Integrated Operational Value Creation",
  strategyText: "Our strategy is built upon a foundation of deep sector expertise and a repeatable playbook for operational improvement. We don't just invest capital; we invest in the infrastructure of growth.",
  philosophyText: "We believe in sustainable business practices that drive long-term value for our investors and the communities in which we operate.",
  sectors: ["Enterprise Software", "Next-Gen Industrials", "Healthcare Tech", "Specialty Consumer"],
  portfolioItems: [
    { id: 'p1', name: "Aether Systems", sector: "Software", description: "Cloud-native infrastructure management for global enterprises." },
    { id: 'p2', name: "GreenDynamics", sector: "Industrials", description: "Precision manufacturing for the renewable energy supply chain." },
    { id: 'p3', name: "VitalConnect", sector: "Healthcare", description: "Pioneering remote patient monitoring and telemedicine platforms." }
  ],
  teamMembers: [
    { id: 't1', name: "Dr. Richard Chen", title: "Managing Partner", bio: "25+ years in private equity and operational leadership." },
    { id: 't2', name: "Elena Rodriguez", title: "Chief Investment Officer", bio: "Former head of global M&A at Tier-1 investment bank." }
  ]
};

export const MOCK_CLIENT_DATA = {
  "client_1": {
    clientId: "client_1",
    portfolioValue: "$450,000,000",
    quarterlyReturn: "+4.2%",
    latestReportDate: "2024-Q3",
    documents: [
      { id: '1', name: 'Q3 2024 Performance Report', date: '2024-10-15', url: '#' },
      { id: '2', name: 'Annual Strategy Outlook', date: '2024-01-20', url: '#' }
    ]
  }
};
