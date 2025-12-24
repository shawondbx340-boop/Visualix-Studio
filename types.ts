
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  benefits: string[];
  idealFor: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'E-commerce' | 'Development' | 'Video Editing' | 'Branding';
  imageUrl: string;
  description?: string;
  outcome?: string;
}

export type Category = 'All' | 'E-commerce' | 'Development' | 'Video Editing' | 'Branding';
