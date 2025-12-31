
import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, PORTFOLIO_ITEMS, TESTIMONIALS, PRICING, FAQS } from './constants.tsx';
import { PortfolioItem, Service, FAQItem as FAQType, Page } from './types.ts';

// --- Configuration ---
const LOGO_URL = "https://lh3.googleusercontent.com/d/11MM1MSzTwDTBFoq1UbPMPesn3mE61YXX"; 
const CONTACT_EMAIL = "shawondbx632@gmail.com";
const CONTACT_PHONE = "+971503602029";
const WHATSAPP_LINK = `https://wa.me/${CONTACT_PHONE.replace('+', '')}`; 

/** 
 * FORMSPREE INTEGRATION ID
 */
const FORMSPREE_ID = "mjgvjbvy"; 

// --- Premium Icons ---
const Icon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Globe: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16z M2 12h20 M12 2v20" />,
    Sparkles: <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z" />,
    ArrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    Check: <polyline points="20 6 9 17 4 12" />,
    Menu: <><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></>,
    X: <><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></>,
    Target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    Code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    Layout: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18"/><path d="M9 21V9"/></>,
    ShoppingCart: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>,
    Instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
    Twitter: <path d="M22 4s-1 2.18-4 3.5c0 0-1.24 7.28-9 11.5 0 0 5.4-2.18 5.4-2.18l-3.2 2.18c0 0-2.8-1.5-3.6-2.7C4 16 2.24 14.5 1 13.5l3.2-1c0 0-3.6-4-3.6-7 0 0 1.2 2.3 4.2 2.3 0 0-3-5.3-1-7 0 0 1.8 3.5 6.6 3.5 0 0 .5-5.3 5-5.3 2.14 0 4.1.88 5.4 2.3 0 0 2-.5 3-1.5 0 0-1 2-2 3 0 0-1.5-1 2.5-1.5z" />,
    LinkedIn: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
    WhatsApp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />,
    Shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    TrendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    Clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    CreditCard: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    Headphones: <><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></>,
    Plus: <line x1="12" y1="5" x2="12" y2="19" />,
    Minus: <line x1="5" y1="12" x2="19" />,
    ChevronDown: <polyline points="6 9 12 15 18 9" />,
    Mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    Phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
  };
  
  const isFilledIcon = name === "WhatsApp";
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill={isFilledIcon ? "currentColor" : "none"} 
      stroke={isFilledIcon ? "none" : "currentColor"} 
      strokeWidth={isFilledIcon ? "0" : "2"} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

// --- Animated Skill Bar ---
const SkillBar: React.FC<{ label: string; percentage: number; delay?: number }> = ({ label, percentage, delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => setWidth(percentage), delay);
      }
    }, { threshold: 0.1 });
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [percentage, delay]);

  return (
    <div className="mb-8" ref={barRef}>
      <div className="flex justify-between mb-2 items-center">
        <span className="text-sm font-bold uppercase tracking-widest text-white/80">{label}</span>
        <span className="text-xs font-bold text-purple-400">{width}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

// --- Scroll Reveal ---
const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right' }> = ({ children, className = "", delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setIsVisible(true); });
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.unobserve(domRef.current); };
  }, []);
  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    switch (direction) {
      case 'up': return "translateY(40px)";
      case 'down': return "translateY(-40px)";
      case 'left': return "translateX(40px)";
      case 'right': return "translateX(-40px)";
      default: return "translateY(40px)";
    }
  };
  return (
    <div 
      ref={domRef} 
      className={`${className} transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? "opacity-100" : "opacity-0"}`} 
      style={{ transitionDelay: `${delay}ms`, transform: getTransform() }}
    >
      {children}
    </div>
  );
};

// --- FAQ Item Component ---
const FAQAccordionItem: React.FC<{ faq: FAQType }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass rounded-3xl border border-white/10 hover:border-white/30 transition-all overflow-hidden bg-white/[0.02]">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left p-8 flex justify-between items-center transition-all group"
      >
        <h5 className="text-xl font-bold text-white pr-8 leading-tight">{faq.question}</h5>
        <div className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <Icon name="ChevronDown" className="w-6 h-6 text-purple-400" />
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 pb-8 px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <p className="text-white text-lg font-light leading-relaxed border-t border-white/10 pt-6">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page: Page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setIsMenuOpen(false);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 200);
  };

  /**
   * Refined Formspree Submission Logic
   * Improved robustness to handle CORS and response variations.
   */
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Even if response.ok is false, check if the submission was actually received.
      // Formspree returns JSON for errors too.
      const data = await response.json();
      
      if (response.ok || data.next || data.success) {
        setFormStatus('success');
        form.reset();
      } else {
        console.error("Formspree Error:", data);
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Submission Exception:", error);
      // Fallback: If the user says they get the email, but fetch throws (e.g. adblocker),
      // we might want to inform them to try WhatsApp if it keeps failing.
      setFormStatus('error');
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' as Page },
    { name: 'Services', id: 'services' as Page },
    { name: 'Projects', id: 'projects' as Page },
    { name: 'About', id: 'about' as Page },
    { name: 'Contact', id: 'contact' as Page },
  ];

  return (
    <div className={`min-h-screen bg-[#050505] text-white selection:bg-purple-900/30 font-sans overflow-x-hidden transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Floating WhatsApp Button with Enhanced Pulse Effect */}
      <a 
        href={WHATSAPP_LINK} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] hover:scale-110 hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.8)] transition-all active:scale-95 group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none"></span>
        <span className="absolute inset-[-4px] rounded-full border-2 border-[#25D366] opacity-0 group-hover:opacity-40 transition-opacity duration-300"></span>
        <Icon name="WhatsApp" className="w-8 h-8 text-white relative z-10" />
        <span className="absolute right-16 bg-white text-[#075E54] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-lg translate-x-2 group-hover:translate-x-0">WhatsApp Us</span>
      </a>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/10 py-4 shadow-lg' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div onClick={() => navigate('home')} className="cursor-pointer flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl glow-purple overflow-hidden flex items-center justify-center bg-black">
               <img src={LOGO_URL} alt="Visualix" className="w-full h-full object-contain" />
            </div>
            <span className="font-futuristic font-bold text-lg tracking-widest uppercase text-white">Visualix Studio</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => navigate(item.id)} className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:text-purple-400 relative group py-2 ${currentPage === item.id ? 'text-purple-500' : 'text-white'}`}>
                {item.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
            <button onClick={() => navigate('contact')} className="px-8 py-3 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-xl">
              Get Started
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white relative z-[60]">
            <Icon name={isMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[45] lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl"></div>
        <div className="relative h-full flex flex-col items-center justify-center gap-10 p-6">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => navigate(item.id)} 
              className={`text-3xl font-bold font-futuristic uppercase tracking-[0.3em] transition-all ${currentPage === item.id ? 'text-purple-500' : 'text-white'}`}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => navigate('contact')} 
            className="mt-10 px-16 py-6 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm shadow-2xl hover:bg-purple-600 hover:text-white transition-all"
          >
            Get Started
          </button>
        </div>
      </div>

      <main className="relative z-10">
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center relative overflow-hidden">
              <ScrollReveal delay={50}>
                <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full glass border border-purple-900/40 mb-12 animate-soft-bounce">
                  <Icon name="Sparkles" className="w-4 h-4 text-purple-400" />
                  <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-white">Premium Web Design Agency</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold font-futuristic leading-[1.1] tracking-tighter mb-12 text-white">
                  Design. Develop.<br/><span className="gradient-text animate-flow py-2 inline-block">Scale Your Online Presence.</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                  Visualix Studio builds high-performance websites and scalable web development services designed to convert visitors and drive growth.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <button onClick={() => navigate('contact')} className="px-14 py-6 rounded-full bg-white text-black font-bold text-lg hover:bg-purple-600 hover:text-white transition-all shadow-xl uppercase tracking-widest transform hover:scale-105 active:scale-95">
                    Get a Free Quote
                  </button>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-14 py-6 glass border border-white/20 rounded-full font-bold text-sm uppercase tracking-widest text-white hover:bg-[#25D366] hover:text-white transition-all flex items-center gap-3 transform hover:scale-105 active:scale-95 group">
                    <Icon name="WhatsApp" className="w-5 h-5 text-green-400 group-hover:text-white transition-colors" /> WhatsApp Us
                  </a>
                </div>
              </ScrollReveal>
            </section>

            {/* Core Services Section */}
            <section className="py-32 px-6 bg-[#080808] border-y border-white/5">
              <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-24">
                    <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">Core Expertise</span>
                    <h2 className="text-4xl md:text-6xl font-bold font-futuristic mb-6 uppercase tracking-tighter text-white">Our Services</h2>
                  </div>
                </ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SERVICES.slice(0,3).map((s, i) => (
                    <ScrollReveal key={s.id} delay={i * 230}>
                      <div className="glass p-12 rounded-[40px] border border-white/10 hover:border-purple-500/50 transition-all group h-full flex flex-col bg-white/5 shadow-2xl">
                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform`}>
                          <Icon name={s.icon} className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-6 font-futuristic uppercase text-white">{s.title}</h3>
                        <p className="text-white leading-relaxed mb-8 font-light flex-grow">{s.description}</p>
                        <ul className="space-y-3 mb-10">
                          {s.features.map(f => (
                            <li key={f} className="flex items-center gap-4 text-white text-sm font-medium">
                              <Icon name="Check" className="w-4 h-4 text-purple-400" /> {f}
                            </li>
                          ))}
                        </ul>
                        <button onClick={() => navigate('services')} className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">Explore {s.title} <Icon name="ArrowRight" className="w-4 h-4" /></button>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Visualix Section */}
            <section className="py-32 px-6 futuristic-grid relative">
               <div className="scan-line"></div>
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <ScrollReveal direction="right">
                     <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-6 block text-[10px]">Why Choose Us</span>
                     <h2 className="text-4xl md:text-6xl font-bold font-futuristic mb-8 uppercase tracking-tighter text-white leading-tight">Elite Digital Engineering.</h2>
                     <div className="space-y-8">
                        {[
                          { t: 'Creative + Technical', d: 'High-end design meets scalable, secure code.' },
                          { t: 'AI-Assisted Delivery', d: 'Fast delivery without compromising on pixel perfection.' },
                          { t: 'Transparent Workflows', d: 'Clear communication at every stage of the mission.' },
                          { t: 'Long-Term Support', d: 'We grow with you, providing ongoing maintenance.' }
                        ].map((item, i) => (
                          <div key={item.t} className={`flex gap-6 items-start animate-fade-in`} style={{ animationDelay: `${i * 150 + 200}ms` }}>
                             <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center flex-shrink-0 text-purple-400 border border-white/10 shadow-lg">
                                <Icon name="Check" className="w-6 h-6" />
                             </div>
                             <div>
                                <h4 className="text-white font-bold font-futuristic uppercase text-sm mb-1">{item.t}</h4>
                                <p className="text-white text-sm leading-relaxed">{item.d}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </ScrollReveal>
                  <ScrollReveal direction="left" delay={300}>
                     <div className="glass p-16 rounded-[64px] border border-white/10 bg-black/40 shadow-2xl text-center hover:scale-[1.02] transition-transform">
                        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mx-auto mb-12 shadow-2xl animate-float">
                           <Icon name="TrendingUp" className="w-16 h-16 text-black" />
                        </div>
                        <h4 className="text-3xl font-bold font-futuristic uppercase tracking-tighter text-white mb-6">Results That Matter</h4>
                        <div className="grid grid-cols-1 gap-8 text-left max-w-xs mx-auto">
                           <div className="flex items-center gap-4 group">
                              <span className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">40%</span>
                              <p className="text-xs uppercase font-bold tracking-widest text-white">Faster Load Times</p>
                           </div>
                           <div className="flex items-center gap-4 group">
                              <span className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">60%</span>
                              <p className="text-xs uppercase font-bold tracking-widest text-white">Higher Engagement</p>
                           </div>
                        </div>
                     </div>
                  </ScrollReveal>
               </div>
            </section>

            {/* Testimonials Marquee Section */}
            <section className="py-32 bg-[#080808] overflow-hidden">
               <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
                  <ScrollReveal>
                    <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">Success Stories</span>
                    <h2 className="text-4xl md:text-6xl font-bold font-futuristic uppercase tracking-tighter text-white">What Our Clients Think</h2>
                  </ScrollReveal>
               </div>
               
               <div className="relative flex overflow-x-hidden">
                 <div className="flex animate-marquee hover:[animation-play-state:paused] gap-8 py-4 px-4">
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                      <div key={`${t.id}-${i}`} className="w-[400px] flex-shrink-0 glass p-10 rounded-[32px] border border-white/10 h-full flex flex-col shadow-2xl bg-white/[0.03] hover:bg-white/[0.05] transition-all group">
                         <div className="flex text-yellow-500 mb-6 gap-0.5">
                            {[...Array(t.rating || 5)].map((_, starIdx) => <span key={starIdx} className="text-xl">★</span>)}
                         </div>
                         <p className="text-white text-lg leading-relaxed mb-10 flex-grow font-light italic">
                           "{t.content}"
                         </p>
                         <div className="flex justify-between items-center pt-8 border-t border-white/5">
                            <div>
                               <h4 className="font-bold text-white uppercase tracking-tight text-lg group-hover:text-purple-400 transition-colors">{t.name}</h4>
                            </div>
                            <p className="text-white/40 text-[11px] font-medium uppercase tracking-widest whitespace-nowrap">{t.date}</p>
                         </div>
                      </div>
                    ))}
                 </div>
               </div>
            </section>

            {/* Global CTA */}
            <section className="py-40 px-6 text-center border-t border-white/10 relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full -z-10 animate-pulse-glow"></div>
               <ScrollReveal>
                 <h2 className="text-5xl md:text-8xl font-bold font-futuristic mb-10 tracking-tighter uppercase leading-[0.9] text-white">Ready to Start Your Project?</h2>
                 <p className="text-xl md:text-2xl text-white mb-16 font-light max-w-2xl mx-auto leading-relaxed">Partner with a premium web design agency. Let's build a high-performing website together.</p>
                 <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button onClick={() => navigate('contact')} className="px-14 py-6 rounded-full bg-white text-black font-bold text-xl hover:bg-purple-600 hover:text-white transition-all shadow-xl uppercase tracking-widest transform hover:scale-105 active:scale-95">Get a Free Quote</button>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-14 py-6 glass border border-white/20 rounded-full font-bold text-xl uppercase tracking-widest text-white hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 group"><Icon name="WhatsApp" className="w-6 h-6 text-green-400 group-hover:text-white transition-colors" /> WhatsApp Us</a>
                 </div>
               </ScrollReveal>
            </section>
          </>
        )}

        {currentPage === 'services' && (
          <div className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
               <ScrollReveal className="text-center mb-40">
                  <h2 className="text-5xl md:text-9xl font-bold font-futuristic mb-10 uppercase tracking-tighter text-white">Our Solutions</h2>
                  <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light leading-relaxed">High-performance digital engineering and ecommerce website development.</p>
               </ScrollReveal>

               {SERVICES.map((s, idx) => (
                 <section key={s.id} id={s.id} className="mb-60 scroll-mt-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
                       <ScrollReveal direction={idx % 2 === 0 ? 'right' : 'left'}>
                          <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">{s.id.replace('-',' ')}</span>
                          <h3 className="text-4xl md:text-6xl font-bold font-futuristic mb-8 uppercase text-white">{s.title}</h3>
                          <p className="text-white text-2xl mb-12 font-light leading-relaxed">{s.description}</p>
                          <div className="grid grid-cols-2 gap-6 mb-12">
                             {s.features.map(f => (
                               <div key={f} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white">
                                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center"><Icon name="Check" className="w-3 h-3 text-purple-400" /></div>
                                  {f}
                               </div>
                             ))}
                          </div>
                       </ScrollReveal>
                       <ScrollReveal className="h-full">
                          <div className={`p-16 rounded-[64px] bg-gradient-to-br ${s.color} flex flex-col items-center justify-center text-white h-[500px] shadow-2xl relative overflow-hidden group`}>
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
                             <Icon name={s.icon} className="w-32 h-32 mb-10 relative z-10 group-hover:scale-110 transition-transform duration-700" />
                             <h4 className="text-2xl font-bold font-futuristic uppercase tracking-widest relative z-10">Premium Delivery</h4>
                          </div>
                       </ScrollReveal>
                    </div>

                    {/* Pricing Grid */}
                    <div className="mb-24">
                       <h4 className="text-xl font-bold font-futuristic uppercase tracking-[0.4em] mb-12 text-center text-white">{s.title} Plans</h4>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {PRICING[s.id]?.map((p) => (
                            <div key={p.name} className={`glass p-12 rounded-[40px] border ${p.popular ? 'border-purple-500/50 scale-105 shadow-2xl bg-white/[0.03]' : 'border-white/10'} transition-all duration-500 hover:scale-[1.03] hover:border-purple-500/60 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_-10px_rgba(168,85,247,0.2)] relative flex flex-col group`}>
                               {p.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">Most Popular</span>}
                               <h5 className="text-xl font-bold font-futuristic uppercase text-white mb-2">{p.name}</h5>
                               <p className="text-3xl font-bold gradient-text mb-8">{p.price}</p>
                               <ul className="space-y-4 mb-12 flex-grow">
                                  {p.features.map(f => <li key={f} className="text-sm text-white flex items-center gap-3"><Icon name="Check" className="w-4 h-4 text-purple-400" /> {f}</li>)}
                               </ul>
                               <button onClick={() => navigate('contact')} className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${p.popular ? 'bg-white text-black hover:bg-purple-600 hover:text-white' : 'glass border border-white/20 text-white hover:bg-white hover:text-black'}`}>
                                  {p.cta}
                               </button>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* FAQ Accordion Section */}
                    <div className="max-w-4xl mx-auto">
                       <div className="text-center mb-12">
                          <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">Answers</span>
                          <h4 className="text-3xl font-bold font-futuristic uppercase tracking-tight text-white">{s.title} FAQ</h4>
                       </div>
                       <div className="space-y-4">
                          {FAQS[s.id]?.map((faq) => (
                            <FAQAccordionItem key={faq.question} faq={faq} />
                          ))}
                       </div>
                    </div>
                 </section>
               ))}
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Intro Section */}
              <ScrollReveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
                  <div>
                    <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">About Visualix Studio</span>
                    <h2 className="text-5xl md:text-8xl font-bold font-futuristic mb-12 uppercase tracking-tighter text-white leading-[0.8]">Clean Design. <br/><span className="text-purple-600">Smart Code.</span></h2>
                    <p className="text-white text-2xl leading-relaxed font-light mb-12">
                      Visualix Studio is a modern web design agency specializing in premium web development services and ecommerce website development. We help businesses build strong online identities through clean design and scalable code.
                    </p>
                    <p className="text-white text-lg leading-relaxed font-light mb-12">
                      Our goal is simple — to create high-performing websites that not only look great but also deliver measurable business results.
                    </p>
                    <button onClick={() => navigate('contact')} className="px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all shadow-xl">Contact Our Team</button>
                  </div>
                  <div className="rounded-[48px] overflow-hidden border border-white/10 relative h-[600px] bg-slate-900 shadow-2xl group">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-12">
                       <h4 className="text-2xl font-futuristic font-bold text-white uppercase mb-4 tracking-widest">Driven by Innovation</h4>
                       <p className="text-white font-light">Combining aesthetics with robust functionality to power your digital growth.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40">
                 <ScrollReveal direction="right" delay={100}>
                    <div className="glass p-16 rounded-[48px] border border-white/10 bg-white/5 h-full">
                       <span className="text-purple-500 font-bold uppercase tracking-[0.4em] mb-6 block text-[10px]">Strategic Path</span>
                       <h3 className="text-4xl font-bold font-futuristic mb-8 uppercase text-white">Our Vision</h3>
                       <p className="text-white text-xl font-light leading-relaxed">
                          To become a trusted partner for businesses worldwide by delivering innovative, scalable, and result-driven ecommerce website development solutions.
                       </p>
                    </div>
                 </ScrollReveal>
                 <ScrollReveal direction="left" delay={200}>
                    <div className="glass p-16 rounded-[48px] border border-white/10 bg-white/5 h-full">
                       <span className="text-purple-500 font-bold uppercase tracking-[0.4em] mb-6 block text-[10px]">Core Purpose</span>
                       <h3 className="text-4xl font-bold font-futuristic mb-8 uppercase text-white">Our Mission</h3>
                       <p className="text-white text-xl font-light leading-relaxed">
                          Our mission is to empower brands with high-performing websites by combining creative design and clean code to drive growth and long-term success.
                       </p>
                    </div>
                 </ScrollReveal>
              </div>

              {/* Expertise & Skills Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-40 items-start">
                 <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold font-futuristic mb-12 uppercase tracking-tighter text-white">Why Visualix</h2>
                    <div className="space-y-6">
                       {[
                         { t: 'Unified Expertise', d: 'Creative and technical expertise in one elite team' },
                         { t: 'AI-Assisted Workflows', d: 'Faster delivery without compromising on quality' },
                         { t: 'Transparent Processes', d: 'Consistent communication and clear reporting' },
                         { t: 'Scaleable Pricing', d: 'Affordable for startups and global brands' }
                       ].map(item => (
                         <div key={item.t} className="p-8 glass rounded-3xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all">
                            <h4 className="text-white font-bold font-futuristic uppercase text-sm mb-2">{item.t}</h4>
                            <p className="text-white text-sm leading-relaxed">{item.d}</p>
                         </div>
                       ))}
                    </div>
                 </ScrollReveal>
                 <ScrollReveal delay={200}>
                    <h2 className="text-4xl md:text-6xl font-bold font-futuristic mb-12 uppercase tracking-tighter text-white">Our Performance</h2>
                    <div className="glass p-12 rounded-[48px] border border-white/10 bg-white/5">
                      <SkillBar label="Creativity" percentage={95} delay={100} />
                      <SkillBar label="Technical Expertise" percentage={98} delay={300} />
                      <SkillBar label="Client Satisfaction" percentage={100} delay={500} />
                      <SkillBar label="Performance Optimization" percentage={96} delay={700} />
                    </div>
                 </ScrollReveal>
              </div>

              {/* Final CTA */}
              <section className="text-center py-40 bg-[#080808] rounded-[64px] border border-white/10">
                <ScrollReveal>
                  <h2 className="text-5xl md:text-8xl font-bold font-futuristic mb-10 tracking-tighter uppercase leading-[0.9] text-white">Let’s Build Something <br/><span className="gradient-text">Great Together.</span></h2>
                  <p className="text-xl md:text-2xl text-white mb-16 font-light max-w-2xl mx-auto leading-relaxed">Whether you need a web design agency or elite web development services, Visualix Studio is ready to elevate your digital presence.</p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <button onClick={() => navigate('contact')} className="px-14 py-6 rounded-full bg-white text-black font-bold text-xl hover:bg-purple-600 hover:text-white transition-all shadow-xl uppercase tracking-widest transform hover:scale-105">Get a Free Quote</button>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-14 py-6 glass border border-white/20 rounded-full font-bold text-xl uppercase tracking-widest text-white hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 group"><Icon name="WhatsApp" className="w-6 h-6 text-green-400 group-hover:text-white transition-colors" /> WhatsApp Us</a>
                  </div>
                </ScrollReveal>
              </section>
            </div>
          </div>
        )}

        {currentPage === 'projects' && (
          <div className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal className="text-center mb-32">
                 <h2 className="text-5xl md:text-9xl font-bold font-futuristic mb-10 uppercase tracking-tighter text-white">Projects</h2>
                 <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light leading-relaxed">Showcasing our ecommerce website development and custom design projects.</p>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {PORTFOLIO_ITEMS.map((item, idx) => (
                  <ScrollReveal key={item.id} delay={idx * 150}>
                    <div className="group relative glass rounded-[48px] overflow-hidden border border-white/10 aspect-[16/10] shadow-2xl cursor-pointer">
                       <img src={item.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-1000" alt="" />
                       <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                          <h4 className="text-5xl font-bold font-futuristic mb-6 uppercase tracking-tight text-white">{item.title}</h4>
                          <div className="flex flex-wrap gap-4 items-center justify-between">
                             <div className="flex gap-4">
                                {item.tags?.map(t => <span key={t} className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">{t}</span>)}
                             </div>
                             <a 
                               href={item.link || '#'} 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="px-8 py-3 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-xl flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                             >
                               Visit Site <Icon name="ArrowRight" className="w-3 h-3" />
                             </a>
                          </div>
                       </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="py-32 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
              <ScrollReveal>
                 <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-6 block text-[10px]">Get In Touch</span>
                 <h2 className="text-5xl md:text-8xl font-bold font-futuristic mb-12 uppercase tracking-tighter text-white leading-[0.8]">Let’s Start <br/><span className="text-purple-600">Your Project.</span></h2>
                 <div className="space-y-6 mb-16">
                    <p className="text-white text-2xl font-light leading-relaxed">
                        Ready to hire a premium web design agency? Our team is standing by to deliver elite web development services.
                    </p>
                    <div className="flex flex-col gap-4 mt-10">
                        <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-4 text-white hover:text-purple-400 transition-colors group">
                            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all"><Icon name="Phone" className="w-6 h-6" /></div>
                            <span className="text-lg font-bold">{CONTACT_PHONE}</span>
                        </a>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 text-white hover:text-purple-400 transition-colors group">
                            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all"><Icon name="Mail" className="w-6 h-6" /></div>
                            <span className="text-lg font-bold">{CONTACT_EMAIL}</span>
                        </a>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <button className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:border-purple-500 transition-all text-white hover:text-purple-400"><Icon name="Instagram" /></button>
                    <button className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:border-purple-500 transition-all text-white hover:text-purple-400"><Icon name="Twitter" /></button>
                    <button className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:border-purple-500 transition-all text-white hover:text-purple-400"><Icon name="LinkedIn" /></button>
                 </div>
              </ScrollReveal>
              <form 
                onSubmit={handleContactSubmit} 
                action={`https://formspree.io/f/${FORMSPREE_ID}`}
                method="POST"
                className="glass p-16 rounded-[64px] border border-white/10 space-y-8 bg-[#0a0a0a] shadow-2xl relative overflow-hidden"
              >
                {formStatus === 'success' ? (
                   <div className="text-center py-20 animate-fade-in">
                      <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-10 mx-auto glow-purple shadow-lg"><Icon name="Check" className="w-12 h-12" /></div>
                      <h3 className="text-4xl font-bold font-futuristic mb-4 uppercase tracking-tighter text-white">Sent</h3>
                      <p className="text-white mb-10 text-lg">We will reach out to you within 24 hours.</p>
                      <button type="button" onClick={() => setFormStatus('idle')} className="px-10 py-4 glass border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">New Message</button>
                   </div>
                ) : formStatus === 'error' ? (
                  <div className="text-center py-20 animate-fade-in">
                      <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-10 mx-auto shadow-lg"><Icon name="X" className="w-12 h-12" /></div>
                      <h3 className="text-4xl font-bold font-futuristic mb-4 uppercase tracking-tighter text-white">Submission Result</h3>
                      <p className="text-white mb-10 text-lg">We couldn't confirm the transmission via the UI, but if you've done this before, we likely received it. Please try once more or use WhatsApp.</p>
                      <button type="button" onClick={() => setFormStatus('idle')} className="px-10 py-4 glass border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">Retry Submission</button>
                   </div>
                ) : (
                  <>
                    <input required name="name" type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-white/30" />
                    <input required name="email" type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-white/30" />
                    <textarea required name="message" placeholder="Briefly describe your project mission..." className="w-full h-44 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:outline-none focus:border-purple-500 transition-all resize-none text-white placeholder:text-white/30" />
                    <button type="submit" className="w-full py-7 bg-white text-black rounded-2xl font-bold text-xl tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all uppercase shadow-2xl transform active:scale-95">
                      {formStatus === 'sending' ? 'Transmitting...' : 'Transmit Mission'}
                    </button>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:text-green-400 transition-colors">Or message us via WhatsApp <Icon name="WhatsApp" className="w-4 h-4" /></a>
                  </>
                )}
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Professional Footer */}
      <footer className="pt-32 pb-16 border-t border-white/10 bg-[#030303] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
            <div className="space-y-10">
              <div onClick={() => navigate('home')} className="cursor-pointer group flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-purple overflow-hidden transition-all group-hover:scale-105 bg-black">
                   <img src={LOGO_URL} alt="Visualix" className="w-full h-full object-contain" />
                </div>
                <span className="font-futuristic font-bold text-lg uppercase text-white">Visualix</span>
              </div>
              <p className="text-white text-sm leading-relaxed max-w-xs">
                Visualix Studio is an elite web design agency specializing in high-performance digital solutions and premium web experiences.
              </p>
              <div className="flex flex-col gap-3 mt-4 text-xs font-medium text-white/60">
                <div className="flex items-center gap-2">
                    <Icon name="Phone" className="w-4 h-4 text-purple-500" />
                    <span>{CONTACT_PHONE}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Icon name="Mail" className="w-4 h-4 text-purple-500" />
                    <span>{CONTACT_EMAIL}</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:text-purple-400 border border-white/10 hover:border-purple-500 transition-all"><Icon name="Instagram" className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:text-purple-400 border border-white/10 hover:border-purple-500 transition-all"><Icon name="Twitter" className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:text-purple-400 border border-white/10 hover:border-purple-500 transition-all"><Icon name="LinkedIn" className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white mb-10">Navigation</h4>
              <ul className="space-y-5">
                {navItems.map(item => <li key={item.id}><button onClick={() => navigate(item.id)} className="text-white hover:text-purple-400 text-sm font-medium transition-colors uppercase tracking-widest">{item.name}</button></li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white mb-10">Solutions</h4>
              <ul className="space-y-5">
                {SERVICES.map(s => <li key={s.id}><button onClick={() => navigate('services')} className="text-white hover:text-purple-400 text-sm font-medium transition-colors text-left tracking-widest uppercase">{s.title}</button></li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white mb-10">Newsletter</h4>
              <p className="text-white text-sm mb-8">Join our briefing for digital engineering updates.</p>
              <div className="flex gap-4">
                 <input type="email" placeholder="Email" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-purple-500 flex-grow text-white placeholder:text-white/30" />
                 <button className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all shadow-xl"><Icon name="ArrowRight" className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] text-white tracking-[0.4em] font-bold uppercase">© 2025 Visualix Studio. Built for Global Impact.</p>
            <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-white">
               <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
               <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
               <a href="#" className="hover:text-purple-400 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
