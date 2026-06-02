export interface AffiliatePartner {
  id: string;
  name: string;
  category: 'connectivity' | 'transport' | 'booking' | 'utility';
  url: string;
  description: string;
  benefits: string[];
  searchKeywords: string[];
  features: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  silo: 'connectivity' | 'transport' | 'booking' | 'utility';
  summary: string;
  content: string; // HTML-like structured format for semantic SEO (rich blocks)
  readabilityScore: number;
  longTailKeywords: string[];
  searchVolume: string;
  youtubeId?: string; // Capabilities of embedding youtube videos
  altTextMap: Record<string, string>; // Image optimization
  metaTitle?: string; // SEO optimization
  metaDescription?: string; // SEO optimization
}

export interface SiloCategory {
  id: 'connectivity' | 'transport' | 'booking' | 'utility';
  title: string;
  tagline: string;
  description: string;
  icon: string;
  highVolumeKeywords: string[];
}

export interface PlanningInput {
  destination: string;
  durationDays: number;
  budget: 'budget' | 'midrange' | 'premium';
  transportNeeded: boolean;
  needsSim: boolean;
  needsVpn: boolean;
  needsInsurance: boolean;
}

export interface YouTubeEmbed {
  title: string;
  videoId: string;
  description: string;
  category: string;
}
