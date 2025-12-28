
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

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'E-commerce' | 'Development' | 'Web Design' | 'Branding';
  imageUrl: string;
  description?: string;
  outcome?: string;
  link?: string;
  tags?: string[];
}

export type Category = 'All' | 'E-commerce' | 'Development' | 'Web Design' | 'Branding';
