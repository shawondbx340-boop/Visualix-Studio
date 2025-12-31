
import { Service, PortfolioItem, PricingPlan, FAQItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'As a leading web design agency, we craft modern, user-focused website designs that deliver seamless user experiences and drive conversions.',
    icon: 'Layout',
    color: 'from-pink-500 to-rose-500',
    features: [
      'UI/UX Design',
      'Mobile-First Responsive Layouts',
      'Brand-Focused Visual Design',
      'Conversion-Optimized Interfaces'
    ],
    benefits: [
      'Stunning Visual Identity',
      'High User Retention',
      'Intuitive Navigation'
    ],
    idealFor: 'Brands looking to establish a premium and professional online visual presence.'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Our premium web development services provide clean, scalable, and secure codebases engineered for speed, performance, and long-term growth.',
    icon: 'Code',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Frontend Development (React / Next.js)',
      'Backend & API Integration',
      'Performance Optimization & Core Web Vitals',
      'SEO-Friendly Architecture'
    ],
    benefits: [
      'Scalable Infrastructure',
      'Superior Site Speed',
      'Enhanced Security Protocols'
    ],
    idealFor: 'Businesses needing robust, high-performance web applications.'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Development',
    description: 'Specializing in ecommerce website development, we build high-performance online stores designed to maximize sales through smooth checkout flows.',
    icon: 'ShoppingCart',
    color: 'from-purple-500 to-indigo-500',
    features: [
      'Payment Gateway Integration',
      'Inventory & Order Management',
      'Conversion Rate Optimization (CRO)',
      'Secure & Scalable Store Setup'
    ],
    benefits: [
      'Maximize Sales Revenue',
      'Seamless Checkout Experience',
      'Automated Business Operations'
    ],
    idealFor: 'Retailers and brands ready to scale their global digital sales.'
  },
  {
    id: 'hosting',
    title: 'Hosting & Domain',
    description: 'Reliable cloud hosting and domain management to keep your web design agency projects online 24/7 with zero friction.',
    icon: 'Globe',
    color: 'from-green-500 to-emerald-500',
    features: [
      'High-Speed Cloud Hosting',
      'Domain Registration & DNS',
      'SSL Certificate Implementation',
      'Professional Email Setup'
    ],
    benefits: [
      '99.9% Uptime Guarantee',
      'Enterprise-Grade Security',
      'Seamless Renewals'
    ],
    idealFor: 'Businesses wanting a hands-off approach to their technical infrastructure.'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: 'Ongoing technical care from our web development services team ensures your website remains secure, updated, and high-performing.',
    icon: 'Shield',
    color: 'from-orange-500 to-amber-500',
    features: [
      'Regular Security Patching',
      'Automated Backups',
      'Performance Audits',
      'Uptime Monitoring'
    ],
    benefits: [
      'Peace of Mind',
      'Consistent Performance',
      'Priority Support Access'
    ],
    idealFor: 'Any website owner who values long-term stability and security.'
  },
  {
    id: 'subscriptions',
    title: 'Monthly Subscriptions',
    description: 'All-in-one monthly plans covering design and web development services without large upfront costs for growing businesses.',
    icon: 'CreditCard',
    color: 'from-cyan-500 to-blue-500',
    features: [
      'Continuous Improvements',
      'Monthly Design Refresh',
      'Dedicated Support Hours',
      'Hosting Assistance Included'
    ],
    benefits: [
      'Flexible Cash Flow',
      'Unlimited Growth Potential',
      'No Large Initial Investment'
    ],
    idealFor: 'Startups and fast-growing brands who need a dedicated digital partner.'
  }
];

export const PRICING: Record<string, PricingPlan[]> = {
  'web-design': [
    { name: 'Basic Website', price: 'From AED1,500', features: ['Up to 5 pages', 'Responsive design', 'Modern UI/UX', 'Basic SEO setup',], cta: 'Get Started' },
    { name: 'Standard Website', price: 'From AED2,500', features: ['Up to 10 pages', 'Custom UI/UX', 'Mobile-first design', 'SEO-friendly structure', 'Speed optimization', 'Contact Form',], cta: 'Get Started', popular: true },
    { name: 'Premium Website', price: 'From AED3,500', features: ['Unlimited pages', 'Fully custom design', 'Advanced UI/UX', 'Conversion-focused layout', 'Performance optimization'], cta: 'Get Started' }
  ],
  'web-dev': [
    { name: 'Frontend Dev', price: 'From AED3,999', features: ['HTML, CSS, JavaScript', 'Pixel-perfect implementation', 'React/Next.js specialized', 'Fast & clean code'], cta: 'Get Started' },
    { name: 'Full-Stack Dev', price: 'From AED4,999', features: ['Frontend + backend', 'Database integration', 'Secure & scalable setup', 'Deployment support'], cta: 'Get Started', popular: true },
    { name: 'Custom App', price: 'Custom', features: ['Tailored solution', 'Advanced features', 'API integrations', 'Long-term scalability'], cta: 'Request a Quote' }
  ],
  'ecommerce': [
    { name: 'Starter Store', price: 'From AED2,999', features: ['Up to 20 products', 'Payment gateway integration', 'Mobile-responsive store', 'Basic SEO'], cta: 'Get Started' },
    { name: 'Growth Store', price: 'From AED3,999', features: ['Unlimited products', 'Custom store design', 'Inventory & order management', 'Conversion optimization'], cta: 'Get Started', popular: true },
    { name: 'Enterprise Store', price: 'Custom', features: ['Fully custom solution', 'Advanced integrations', 'High-performance & security', 'Scalable architecture'], cta: 'Request a Quote' }
  ],
  'hosting': [
    { name: 'Hosting Setup', price: 'AED199 / yr', features: ['Hosting configuration', 'Performance optimization', 'Security setup'], cta: 'Select Plan' },
    { name: 'Domain Registration', price: 'AED59 / yr', features: ['Domain registration', 'DNS setup', 'Email config support'], cta: 'Select Plan' },
    { name: 'Domain Bundle', price: 'AED250 / yr', features: ['Domain included', 'High-speed hosting', 'SSL certificate', 'Priority Support'], cta: 'Select Plan', popular: true }
  ],
  'maintenance': [
    { name: 'Basic Care', price: 'AED150 / mo', features: ['Monthly backups', 'Security monitoring', 'Minor bug fixes', 'Uptime monitoring'], cta: 'Subscribe' },
    { name: 'Standard Care', price: 'AED250 / mo', features: ['Everything in Basic', 'Monthly updates', 'Performance optimization', 'Content updates (limited)'], cta: 'Subscribe', popular: true },
    { name: 'Premium Care', price: 'AED350 / mo', features: ['Everything in Standard', 'Priority support', 'Advanced security', 'Unlimited content updates'], cta: 'Subscribe' }
  ],
  'subscriptions': [
    { name: 'Website Sub', price: 'AED299 / mo', features: ['Design & development', 'Ongoing updates', 'Hosting assistance', 'Support included'], cta: 'Subscribe' },
    { name: 'E-Commerce Sub', price: 'AED399 / mo', features: ['Store development', 'Monthly updates', 'Product optimization', 'Priority support'], cta: 'Subscribe', popular: true },
    { name: 'Custom Sub', price: 'Custom', features: ['Tailored services', 'Dedicated support', 'Scalable solutions', 'Unlimited iterations'], cta: 'Contact Us' }
  ]
};

export const FAQS: Record<string, FAQItem[]> = {
  'web-design': [
    { question: 'How long does web design take?', answer: 'Our standard timeline is 5-7 business days, though larger projects may take up to 2 weeks for the initial phase.' },
    { question: 'Is my website mobile responsive?', answer: 'Yes, every design we produce is 100% mobile responsive and tested across all screen sizes.' },
    { question: 'How many revisions are included?', answer: 'We offer multiple revision rounds depending on the plan to ensure you are completely satisfied with the visual identity.' },
  ],
  'web-dev': [
    { question: 'Which technologies do you use?', answer: 'We specialize in modern stacks including React, Next.js, TypeScript, Tailwind CSS, and various headless CMS options.' },
    { question: 'Is the website SEO-optimized?', answer: 'Yes, technical SEO is baked into our code, including proper meta tags, semantic HTML, and lightning-fast performance.' },
    { question: 'Can the website scale in the future?', answer: 'We build with scalability in mind. Our code architecture allows adding new features or handling higher traffic without a complete rebuild.' }
  ],
  'ecommerce': [
    { question: 'Which payment gateways do you support?', answer: 'We support all major gateways like Stripe, PayPal, Apple Pay, and Google Pay, as well as local regional providers.' },
    { question: 'Is the store secure?', answer: 'Security is our top priority. We implement SSL, secure payment tokens, and follow PCI compliance best practices.' },
    { question: 'Can I manage products myself?', answer: 'Yes, we provide an intuitive dashboard where you can add, remove, and update products and categories at any time.' }
  ],
  'hosting': [
    { question: 'How reliable is your hosting?', answer: 'We use premium cloud infrastructure (AWS/Vercel) to guarantee 99.9% uptime for all client websites.' },
    { question: 'Do I get an SSL certificate?', answer: 'Yes, all our hosting and bundle plans include a free SSL certificate to ensure your site is secure.' },
    { question: 'Can I use an existing domain?', answer: 'Yes, we can handle the technical DNS configuration to point your existing domain to our high-speed servers.' }
  ],
  'maintenance': [
    { question: 'Is maintenance required?', answer: 'While not mandatory, regular maintenance is highly recommended to protect against security vulnerabilities and ensure long-term performance.' },
    { question: 'Can I upgrade my plan later?', answer: 'Yes, you can upgrade or downgrade your maintenance plan at any time to suit your growing business needs.' },
    { question: 'Do you offer emergency support?', answer: 'Priority emergency support is included in our Standard and Premium care plans for immediate assistance.' }
  ],
  'subscriptions': [
    { question: 'Is there a long-term contract?', answer: 'No, all our subscription plans are month-to-month, allowing you to cancel at any time.' },
    { question: 'What’s included in updates?', answer: 'Updates cover design tweaks, text/image changes, performance improvements, and new feature small additions.' },
    { question: 'Can I cancel anytime?', answer: 'Yes, our subscription model is built on trust and value. You are free to stop the service whenever you wish.' }
  ]
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { 
    id: 'p-nova', 
    title: 'Nova Market', 
    category: 'E-commerce Store', 
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
    description: 'A cutting-edge multi-vendor e-commerce platform built for high-scale retail operations.',
    tags: ['Web Design', 'E-Commerce'],
    link: 'https://novamarket-eta.vercel.app/'
  },
  { 
    id: 'p-alnader', 
    title: 'Alnader Furniture', 
    category: 'Furniture Company', 
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
    description: 'Bespoke furniture luxury e-commerce platform blending aesthetics with navigation.',
    tags: ['Web Design', 'UI/UX'],
    link: 'https://alnaderfurniture.vercel.app/'
  },
  { 
    id: 'p-aar', 
    title: 'AAR Tailoring', 
    category: 'Tailoring Company', 
    imageUrl: 'https://images.unsplash.com/photo-1598501479155-90baba44c8b0?auto=format&fit=crop&q=80&w=1200',
    description: 'Premium custom tailoring platform focusing on digital booking and precision craftsmanship.',
    tags: ['Web Design', 'UI/UX'],
    link: 'https://aartailoring.vercel.app/'
  }
];

export const TESTIMONIALS = [
  { 
    id: 1, 
    name: "James Wilson", 
    date: "12 March 2025",
    content: "The modern design is excellent—fast and user-friendly. The CMS training was a bit rushed, but the support team was thankfully very responsive afterwards.", 
    rating: 5
  },
  { 
    id: 2, 
    name: "Lilly Daniels", 
    date: "12 September 2025",
    content: "We nearly went with a cheaper option, but for our dental practice in Surrey this investment has already paid off. The site looks polished and we're getting more enquiries through it.", 
    rating: 5
  },
  { 
    id: 3, 
    name: "Zara Webster", 
    date: "11 September 2025",
    content: "Our charity in London needed a professional but approachable website. They really cared about our goals and wanted the site to make a difference. That attitude made the whole process reassuring.", 
    rating: 5
  },
  { 
    id: 4, 
    name: "Marcus Chen", 
    date: "05 October 2025",
    content: "Absolute game changer for my tech startup. The code quality is enterprise-grade, and the design captures our futuristic vision perfectly. Highly recommended!", 
    rating: 5
  },
  { 
    id: 5, 
    name: "Sophia Rodriguez", 
    date: "18 November 2025",
    content: "I've worked with many agencies, but Visualix stands out for their technical depth. They don't just build sites; they build engines for business growth.", 
    rating: 5
  },
  { 
    id: 6, 
    name: "Oliver Smith", 
    date: "20 December 2025",
    content: "The level of detail in the UI/UX is breathtaking. Our users have complimented the new interface daily since we launched. Worth every penny of the investment.", 
    rating: 5
  },
  { 
    id: 7, 
    name: "Eleanor Rigby", 
    date: "15 January 2025",
    content: "Their e-commerce expertise transformed our boutique shop into a global brand. The performance optimization is world-class.", 
    rating: 5
  },
  { 
    id: 8, 
    name: "Arjun Mehta", 
    date: "02 February 2025",
    content: "Visualix Studio delivers exactly what they promise: elite digital engineering. The transition was smooth, and the results are undeniable.", 
    rating: 5
  },
  { 
    id: 9, 
    name: "Sarah Jenkins", 
    date: "10 February 2025",
    content: "The most professional web design agency I've ever collaborated with. They understood our brand vision immediately and executed with precision.", 
    rating: 5
  },
  { 
    id: 10, 
    name: "David Ko", 
    date: "22 March 2025",
    content: "Visualix's ecommerce website development skills are unmatched. Our conversion rates tripled within the first month of launching the new site.", 
    rating: 5
  },
  { 
    id: 11, 
    name: "Linda Graham", 
    date: "05 April 2025",
    content: "From initial concept to final launch, the web development services provided were exceptional. Fast, secure, and beautiful results.", 
    rating: 5
  },
  { 
    id: 12, 
    name: "Ben Thompson", 
    date: "15 May 2025",
    content: "A truly futuristic approach to digital design. Their use of AI in planning saved us weeks of time and delivered a superior product.", 
    rating: 5
  }
];
