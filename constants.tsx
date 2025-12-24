
import { Service, PortfolioItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Clean, scalable, and powerful codebases built for performance, security, and growth.',
    icon: 'Code',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Frontend (React/Next.js)',
      'Backend & API Integration',
      'Fast Performance & SEO Optimization',
      'CMS Integration (Headless & Traditional)'
    ],
    benefits: [
      'Scalable Solutions for Growth',
      'Superior Site Speed',
      'Enhanced Security Protocols'
    ],
    idealFor: 'Startups and enterprises requiring robust, high-performance web applications.'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce website',
    description: 'High-performance online stores designed for conversion, featuring seamless payments and intuitive product management.',
    icon: 'ShoppingCart',
    color: 'from-purple-500 to-blue-500',
    features: [
      'Payment Gateway Integration',
      'Inventory Management Systems',
      'Conversion Rate Optimization (CRO)',
      'Mobile-First Shopping Experience'
    ],
    benefits: [
      'Scalable Online Revenue',
      'Seamless Customer Experience',
      'Automated Business Operations'
    ],
    idealFor: 'Retailers and brands ready to scale their global sales.'
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Cinematic storytelling optimized for social platforms and professional brand showcases.',
    icon: 'Video',
    color: 'from-cyan-500 to-purple-500',
    features: [
      'Social Media Reels & Shorts',
      'Cinematic Color Correction',
      'Advanced Motion Graphics',
      'Sound Design & Enhancement'
    ],
    benefits: [
      'Captivating Audience Engagement',
      'Platform-Optimized Content',
      'Viral Potential Storytelling'
    ],
    idealFor: 'Creators and brands looking to dominate social media with high-quality video.'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { 
    id: 'p1', 
    title: 'Nexa FinTech Dashboard', 
    category: 'Development', 
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    description: 'A robust financial monitoring system built with React and real-time data streaming.',
    outcome: 'Improved user data tracking efficiency by 45%.'
  },
  { 
    id: 'p2', 
    title: 'Zenith Watch E-Shop', 
    category: 'E-commerce', 
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    description: 'A luxury e-commerce experience emphasizing minimal aesthetics and seamless checkout.',
    outcome: 'Increased conversion rate by 22% in the first month.'
  },
  { 
    id: 'p3', 
    title: 'Tech Summit 2024 Reel', 
    category: 'Video Editing', 
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    description: 'High-energy promotional video with custom motion tracking and sound design.',
    outcome: 'Reached 500k+ views across social media platforms.'
  },
  { 
    id: 'p4', 
    title: 'Venture SaaS Platform', 
    category: 'Development', 
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800',
    description: 'End-to-end web application development for a complex project management tool.',
    outcome: 'Scaled to handle 10k monthly active users.'
  },
  { 
    id: 'p5', 
    title: 'Urban Fit Campaign', 
    category: 'Video Editing', 
    imageUrl: 'https://images.unsplash.com/photo-1492619334760-22c02315629c?auto=format&fit=crop&q=80&w=800',
    description: 'Series of short-form content for fitness brand awareness.',
    outcome: 'Boosted brand engagement by 300% on TikTok.'
  },
  { 
    id: 'p6', 
    title: 'Aetheria Digital Identity', 
    category: 'Branding', 
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    description: 'A comprehensive branding package including UI/UX and visual assets.',
    outcome: 'Successfully launched and secured $2M in seed funding.'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "CEO, NexaCorp",
    content: "Visualix didn't just design a website; they architected a digital identity that perfectly captures our brand's spirit. Their technical expertise is second to none.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Founder, Zenith Watches",
    content: "The attention to detail in their video work is frighteningly good. Every transition feels purposeful. We have seen a massive surge in engagement.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Marketing Director, Venture",
    content: "Fast, reliable, and modern. Visualix delivered our SaaS platform ahead of schedule and with a level of polish that exceeded our expectations.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
  }
];
