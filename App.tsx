
import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, PORTFOLIO_ITEMS, TESTIMONIALS } from './constants.tsx';
import { Category, PortfolioItem, Service } from './types.ts';

// --- Premium Icons ---
const Icon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Globe: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16z M2 12h20 M12 2v20" />,
    Fingerprint: <path d="M12 10a2 2 0 0 0-2 2c0 1.1.9 2 2 2s2-.9 2-2c0-1.1-.9-2-2-2zm0 6a6 6 0 0 1-6-6 6 6 0 0 1 12 0 6 6 0 0 1-6 6zm0-10a10 10 0 0 0-10 10 10 10 0 0 0 20 0 10 10 0 0 0-10-10z" />,
    Image: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></>,
    Maximize: <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />,
    Sparkles: <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z" />,
    ArrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    Check: <polyline points="20 6 9 17 4 12" />,
    Menu: <><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></>,
    X: <><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></>,
    Target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    Layout: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18"/><path d="M9 21V9"/></>,
    Code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    Video: <><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></>,
    ShoppingCart: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>,
    Share2: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

// --- Counter Component ---
const Counter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const domRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(Math.floor((progress / duration) * end), end);
      setCount(currentCount);
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={domRef}>{count}</span>;
};

// --- Scroll Reveal Component ---
const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right' }> = ({ children, className = "", delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    switch (direction) {
      case 'up': return "translateY(30px)";
      case 'down': return "translateY(-30px)";
      case 'left': return "translateX(30px)";
      case 'right': return "translateX(-30px)";
      default: return "translateY(30px)";
    }
  };

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: getTransform()
      }}
    >
      {children}
    </div>
  );
};

// --- Modal Component ---
const ProjectModal: React.FC<{ project: PortfolioItem; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 bg-black/95 backdrop-blur-2xl animate-fade-in" onClick={onClose}>
      <div 
        className="glass w-full max-w-5xl rounded-[32px] overflow-hidden border border-white/10 relative max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 w-12 h-12 glass rounded-full flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
          <Icon name="X" className="w-6 h-6" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[400px] md:h-full relative overflow-hidden bg-slate-900">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover animate-fade-in opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="p-8 md:p-16 flex flex-col justify-center bg-[#0a0a0a]">
            <ScrollReveal delay={100} direction="right">
              <span className="text-purple-500 font-bold uppercase tracking-[0.3em] mb-4 text-[11px] block">Case Study</span>
              <h2 className="text-3xl md:text-5xl font-bold font-futuristic mb-6 uppercase tracking-tight leading-none text-white">{project.title}</h2>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="right">
              <p className="text-white text-lg mb-8 font-light leading-relaxed">
                {project.description}
              </p>
              {project.outcome && (
                <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white mb-2">Key Outcome</h4>
                  <p className="text-white font-bold">{project.outcome}</p>
                </div>
              )}
            </ScrollReveal>
            <ScrollReveal delay={300} direction="right">
              <div className="flex flex-wrap gap-3 my-10">
                 {['Strategy', 'Execution', 'Optimization'].map(tag => (
                   <span key={tag} className="px-5 py-2 rounded-full glass border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">{tag}</span>
                 ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400} direction="right">
              <button onClick={onClose} className="w-full sm:w-fit px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                Close Project
              </button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

type Page = 'home' | 'services' | 'portfolio' | 'about' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navigate = (page: Page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setIsMenuOpen(false);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 500);
  };

  const navItems = [
    { name: 'Home', id: 'home' as Page },
    { name: 'Services', id: 'services' as Page },
    { name: 'Portfolio', id: 'portfolio' as Page },
    { name: 'About', id: 'about' as Page },
    { name: 'Contact', id: 'contact' as Page },
  ];

  const processSteps = [
    { number: '01', title: 'Discovery & Planning', desc: 'We dive deep into your brand, goals, and audience to architect a roadmap for success.' },
    { number: '02', title: 'Design & Development', desc: 'Crafting pixel-perfect designs and robust code in a systematic, iterative flow.' },
    { number: '03', title: 'Review & Refinement', desc: 'Testing every touchpoint to ensure absolute polish and high-fidelity output.' },
    { number: '04', title: 'Launch & Support', desc: 'Deploying your solution to the world and providing ongoing elite support.' }
  ];

  return (
    <div className={`min-h-screen bg-[#050505] text-white selection:bg-purple-900/30 selection:text-white font-sans overflow-x-hidden transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-[-15%] left-[-15%] w-[80%] h-[80%] bg-purple-900/10 blur-[180px] rounded-full animate-pulse-glow"
          style={{ transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)` }}
        ></div>
        <div 
          className="absolute bottom-[-15%] right-[-15%] w-[80%] h-[80%] bg-blue-900/10 blur-[180px] rounded-full animate-pulse-glow delay-1000"
          style={{ transform: `translate(${mousePos.x * -0.01}px, ${mousePos.y * -0.01}px)` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5 py-4 shadow-lg' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div onClick={() => navigate('home')} className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center glow-purple shadow-2xl">
              <span className="font-bold text-xl font-futuristic text-white">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-futuristic tracking-tighter uppercase leading-none text-white">Visualix</span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-purple-500 font-bold">Studio</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:text-purple-400 relative group py-2 ${currentPage === item.id ? 'text-purple-500' : 'text-white'}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
            <button onClick={() => navigate('contact')} className="px-8 py-3 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-xl">
              Get Started
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-11 h-11 glass border border-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all">
            <Icon name={isMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-x-0 top-[84px] bg-black/98 backdrop-blur-3xl border-b border-white/5 shadow-2xl transition-all duration-700 overflow-hidden ${isMenuOpen ? 'max-h-[600px] py-12 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`text-2xl font-bold uppercase tracking-[0.4em] transform transition-all ${currentPage === item.id ? 'text-purple-500' : 'text-white'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24">
        {currentPage === 'home' && (
          <div className="space-y-40">
            {/* Hero Section */}
            <section className="min-h-[85vh] flex items-center justify-center px-6 relative overflow-hidden">
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <ScrollReveal delay={100}>
                  <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border border-purple-900/20 mb-10 shadow-lg animate-soft-bounce">
                    <Icon name="Sparkles" className="w-4 h-4 text-purple-400" />
                    <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-purple-200">Premium Digital Agency</span>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={300}>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-futuristic leading-[1.1] tracking-tighter mb-10 text-white">
                    We Design, Build & Edit <br/><span className="gradient-text animate-flow pb-4 block">Experiences That Convert.</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={500}>
                  <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                    Visualix Studio helps brands grow with modern web design, powerful development, and high-quality video editing.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={700}>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button onClick={() => navigate('contact')} className="group relative px-12 py-5 overflow-hidden rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl">
                      <div className="absolute inset-0 bg-white"></div>
                      <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-sm text-black">Get a Free Quote <Icon name="ArrowRight" className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></span>
                    </button>
                    <button onClick={() => navigate('portfolio')} className="px-12 py-5 glass border border-white/10 rounded-full font-bold text-sm uppercase tracking-widest text-white hover:bg-white/10 transition-all shadow-sm">
                      View Our Work
                    </button>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={900} className="mt-20 flex flex-wrap justify-center gap-12 opacity-80 transition-all duration-700">
                   <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold font-futuristic text-white">100%</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white">Satisfaction</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold font-futuristic text-white">Fast</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white">Delivery</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold font-futuristic text-white">Modern</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white">Solutions</span>
                   </div>
                </ScrollReveal>
              </div>
            </section>

            {/* Services Overview */}
            <section className="py-32 px-6 bg-[#080808] border-y border-white/5">
              <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                  <div className="flex justify-between items-end mb-24 gap-8 flex-wrap">
                    <div>
                      <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">Expertise</span>
                      <h2 className="text-4xl md:text-6xl font-bold font-futuristic mb-6 uppercase tracking-tighter text-white">Our Services</h2>
                    </div>
                    <button onClick={() => navigate('services')} className="px-8 py-4 glass border border-white/10 rounded-full text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-sm group">
                      Explore All Expertise <Icon name="ArrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SERVICES.map((service, i) => (
                    <ScrollReveal key={service.id} delay={i * 200}>
                      <div className="glass p-12 rounded-[40px] border border-white/5 hover:border-purple-500/50 transition-all group flex flex-col h-full relative overflow-hidden bg-white/5 shadow-2xl hover:shadow-purple-900/10">
                        {/* High Prominence Service Icons */}
                        <div className={`w-20 h-20 rounded-[28px] bg-gradient-to-br ${service.color} flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative`}>
                          <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <Icon name={service.icon} className="w-10 h-10 text-white relative z-10" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-6 font-futuristic uppercase tracking-tighter text-white">{service.title}</h3>
                        <p className="text-white leading-relaxed mb-8 text-base font-light flex-grow">{service.description}</p>
                        
                        <ul className="space-y-3 mb-10">
                           {service.features.slice(0, 3).map(f => (
                             <li key={f} className="flex items-center gap-3 text-white text-xs font-medium">
                                <Icon name="Check" className="w-4 h-4 text-purple-500" />
                                <span>{f}</span>
                             </li>
                           ))}
                        </ul>
                        <div className="h-[2px] w-full bg-white/5 group-hover:bg-purple-500/50 transition-all rounded-full"></div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Visualix */}
            <section className="py-40 px-6 relative overflow-hidden bg-[#050505] futuristic-grid">
               <div className="scan-line"></div>
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                  <ScrollReveal direction="right">
                     <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-6 block text-[10px]">The Studio Advantage</span>
                     <h2 className="text-4xl md:text-6xl font-bold font-futuristic mb-8 uppercase tracking-tighter text-white">Creative Meets <br/><span className="gradient-text animate-flow">Technical Excellence.</span></h2>
                     <p className="text-white text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
                        We don't just build assets; we engineer digital legacies. Our blend of high-end aesthetics and clean, scalable code ensures your brand dominates the market.
                     </p>
                     <div className="grid grid-cols-2 gap-8">
                        {[
                          { t: 'Fast Turnaround', d: 'Efficient workflows ensuring rapid project delivery.' },
                          { t: 'AI Assisted', d: 'Leveraging AI for efficiency and predictive design.' },
                          { t: 'Clear Comms', d: 'Transparent updates and collaborative execution.' },
                          { t: 'Scalable Growth', d: 'Built for today, architected for tomorrow.' }
                        ].map(item => (
                          <div key={item.t} className="space-y-2">
                             <h4 className="text-white font-bold font-futuristic uppercase text-sm tracking-tight">{item.t}</h4>
                             <p className="text-white text-xs leading-relaxed">{item.d}</p>
                          </div>
                        ))}
                     </div>
                  </ScrollReveal>
                  <ScrollReveal direction="left">
                     <div className="glass p-12 rounded-[48px] border border-white/10 bg-black/50 shadow-2xl relative overflow-hidden aspect-square flex items-center justify-center">
                        <div className="text-center">
                           <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mx-auto mb-10 shadow-2xl animate-soft-bounce">
                              <Icon name="Target" className="w-16 h-16 text-black" />
                           </div>
                           <h4 className="text-3xl font-bold font-futuristic uppercase tracking-tighter text-white mb-4">Precision Engineering</h4>
                           <p className="text-white text-sm max-w-xs mx-auto italic">"Crafting every pixel with a specific purpose for conversion."</p>
                        </div>
                     </div>
                  </ScrollReveal>
               </div>
            </section>

            {/* Process Section */}
            <section className="py-32 px-6 bg-[#080808] border-y border-white/5">
               <div className="max-w-7xl mx-auto">
                  <ScrollReveal>
                     <div className="text-center mb-24">
                        <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">Our Method</span>
                        <h2 className="text-4xl md:text-6xl font-bold font-futuristic mb-6 uppercase tracking-tighter text-white">How We Work</h2>
                     </div>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {processSteps.map((step, i) => (
                       <ScrollReveal key={step.number} delay={i * 150}>
                          <div className="group relative glass p-10 rounded-[40px] border border-white/5 bg-white/5 hover:bg-white/10 hover:shadow-2xl transition-all">
                             <span className="text-5xl font-bold font-futuristic text-white/25 absolute top-6 right-8 group-hover:text-purple-500/30 transition-all">{step.number}</span>
                             <h4 className="text-xl font-bold font-futuristic uppercase tracking-tighter mb-4 text-white">{step.title}</h4>
                             <p className="text-white text-sm leading-relaxed">{step.desc}</p>
                          </div>
                       </ScrollReveal>
                     ))}
                  </div>
               </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 px-6">
               <div className="max-w-7xl mx-auto">
                  <ScrollReveal>
                    <div className="text-center mb-24">
                      <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">Endorsements</span>
                      <h2 className="text-4xl md:text-6xl font-bold font-futuristic mb-8 uppercase tracking-tighter text-white text-center">Trusted By Leaders</h2>
                    </div>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                      <ScrollReveal key={t.id} delay={i * 200}>
                        <div className="glass p-12 rounded-[40px] border border-white/5 flex flex-col h-full relative bg-white/5 shadow-xl">
                           <p className="text-white text-lg leading-relaxed mb-12 flex-grow italic font-light">"{t.content}"</p>
                           <div className="flex items-center gap-6 border-t border-white/5 pt-10 mt-auto">
                              <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-xl object-cover shadow-2xl border border-white/10" />
                              <div>
                                 <h4 className="font-bold text-base tracking-widest uppercase mb-1 text-white">{t.name}</h4>
                                 <p className="text-purple-500 text-[9px] font-bold uppercase tracking-[0.3em]">{t.role}</p>
                              </div>
                           </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
               </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 px-6 text-center bg-[#050505] border-t border-white/5">
               <div className="max-w-4xl mx-auto">
                  <ScrollReveal>
                    <h2 className="text-5xl md:text-8xl font-bold font-futuristic mb-10 tracking-tighter uppercase leading-[0.9] text-white">Let’s Create Something <br/>Powerful Together.</h2>
                    <p className="text-xl md:text-2xl text-white mb-16 font-light max-w-2xl mx-auto leading-relaxed">Elevate your brand with elite digital execution. Our team is ready to launch.</p>
                    <button onClick={() => navigate('contact')} className="px-14 py-6 rounded-full bg-white text-black font-bold text-xl hover:bg-purple-600 hover:text-white transition-all shadow-2xl uppercase tracking-widest transform hover:scale-105 active:scale-95">
                      Start Your Journey
                    </button>
                  </ScrollReveal>
               </div>
            </section>
          </div>
        )}

        {currentPage === 'services' && (
          <div className="py-24 px-6 bg-[#080808]">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="mb-32 text-center">
                  <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">What We Do</span>
                  <h2 className="text-5xl md:text-8xl font-bold font-futuristic mb-10 uppercase tracking-tighter text-white">Services</h2>
                  <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">We deliver high-end creative engineering that transforms businesses into digital powerhouses.</p>
                </div>
              </ScrollReveal>

              <div className="space-y-48">
                 {SERVICES.map((s, i) => (
                   <ScrollReveal key={s.id} delay={i * 100} direction={i % 2 === 0 ? 'right' : 'left'}>
                      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-start ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                         <div className={`glass p-12 rounded-[56px] border border-white/5 h-[450px] flex flex-col items-center justify-center bg-white/5 shadow-2xl group overflow-hidden`}>
                            <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                               <Icon name={s.icon} className="w-16 h-16 text-white" />
                            </div>
                            <h4 className="text-2xl font-bold font-futuristic text-white uppercase tracking-tighter">{s.title} Overview</h4>
                         </div>
                         <div className="py-6">
                            <h3 className="text-4xl md:text-6xl font-bold font-futuristic mb-8 uppercase tracking-tighter text-white">{s.title}</h3>
                            <p className="text-white text-2xl mb-12 font-light leading-relaxed">{s.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                               <div>
                                  <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-6">Key Features</h5>
                                  <ul className="space-y-4">
                                     {s.features.map(f => (
                                       <li key={f} className="flex items-center gap-4 text-white font-bold text-sm tracking-tight">
                                          <div className="w-5 h-5 rounded-full bg-purple-900/20 flex items-center justify-center">
                                             <Icon name="Check" className="w-3 h-3 text-purple-400" />
                                          </div>
                                          {f}
                                       </li>
                                     ))}
                                  </ul>
                               </div>
                               <div>
                                  <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-6">Core Benefits</h5>
                                  <ul className="space-y-4">
                                     {s.benefits.map(b => (
                                       <li key={b} className="flex items-center gap-4 text-white text-sm">
                                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                          {b}
                                       </li>
                                     ))}
                                  </ul>
                               </div>
                            </div>

                            <div className="p-8 rounded-[32px] bg-white/5 border border-white/5 shadow-sm mb-12">
                               <h5 className="text-[9px] font-bold uppercase tracking-[0.4em] text-purple-500 mb-2">Ideal For</h5>
                               <p className="text-white font-medium">{s.idealFor}</p>
                            </div>

                            <button onClick={() => navigate('contact')} className="px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                               Start a {s.title} Project
                            </button>
                         </div>
                      </div>
                   </ScrollReveal>
                 ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'portfolio' && (
          <div className="py-24 px-6 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
                  <div>
                    <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">The Archive</span>
                    <h2 className="text-5xl md:text-8xl font-bold font-futuristic mb-10 uppercase tracking-tighter text-white">Portfolio</h2>
                  </div>
                  <div className="flex flex-wrap gap-4 bg-white/5 p-2 rounded-[24px] border border-white/5 shadow-xl">
                    {['All', 'E-commerce', 'Development', 'Video Editing', 'Branding'].map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat as Category)}
                        className={`px-8 py-3 rounded-[16px] text-[10px] font-bold uppercase tracking-[0.2em] transition-all transform active:scale-95 ${activeCategory === cat ? 'bg-white text-black shadow-2xl' : 'text-white hover:text-white hover:bg-white/5'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {PORTFOLIO_ITEMS.filter(i => activeCategory === 'All' || i.category === activeCategory).map((item, idx) => (
                  <ScrollReveal key={item.id} delay={idx * 150}>
                    <div 
                      onClick={() => setSelectedProject(item)}
                      className="group relative rounded-[40px] overflow-hidden bg-slate-900 aspect-[4/5] cursor-pointer shadow-2xl transition-all duration-700 hover:-translate-y-4"
                    >
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-60 transition-all duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-12">
                        <span className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">{item.category}</span>
                        <h4 className="text-3xl font-bold font-futuristic mb-4 uppercase tracking-tighter text-white leading-tight">{item.title}</h4>
                        <p className="text-white text-xs line-clamp-2 font-light mb-6">{item.description}</p>
                        <div className="w-12 h-12 glass border-none rounded-full flex items-center justify-center bg-white text-black transition-all">
                          <Icon name="ArrowRight" className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="py-24 px-6 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
                  <div>
                    <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-4 block text-[10px]">Our Story</span>
                    <h2 className="text-5xl md:text-8xl font-bold font-futuristic mb-12 uppercase tracking-tighter text-white leading-[0.8]">About <br/><span className="text-purple-500">Visualix.</span></h2>
                    <div className="space-y-6">
                       <p className="text-white text-2xl leading-relaxed font-light">
                          Visualix Studio is a boutique creative lab specialized in high-end design, rapid development, and cinematic video editing.
                       </p>
                       <p className="text-white text-lg leading-relaxed font-light">
                          Our philosophy centers on merging purely aesthetic artistry with robust engineering. We believe every pixel should serve a purpose, and every line of code should empower growth.
                       </p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-12 border-t border-white/5 pt-16">
                       <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-500 mb-4">Mission</h4>
                          <p className="text-white text-sm font-light">To help businesses scale by delivering high-impact, elite digital experiences.</p>
                       </div>
                       <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-4">Vision</h4>
                          <p className="text-white text-sm font-light">To become the global standard for creative digital and video production.</p>
                       </div>
                    </div>
                  </div>
                  <div className="rounded-[48px] overflow-hidden border border-white/10 relative h-[650px] shadow-2xl group bg-slate-900">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-50 transition-all duration-700 group-hover:opacity-80 group-hover:scale-105" alt="Visualix Hub" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                 <div className="bg-[#080808] rounded-[56px] p-20 mb-40 border border-white/5 shadow-2xl">
                    <div className="text-center mb-20">
                       <h2 className="text-4xl md:text-6xl font-bold font-futuristic uppercase tracking-tighter text-white mb-6">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                       {[
                         { t: 'Creativity', d: 'Pushing boundaries to create visual excellence.' },
                         { t: 'Transparency', d: 'Honest collaboration and clear communication.' },
                         { t: 'Innovation', d: 'Leveraging AI and modern tech to stay ahead.' },
                         { t: 'Quality', d: 'Systematic refinement of every single deliverable.' },
                         { t: 'Efficiency', d: 'Continuous learning and adapting to digital trends.' },
                         { t: 'Client Success', d: 'Your growth is the ultimate measure of our work.' }
                       ].map(v => (
                         <div key={v.t} className="space-y-4">
                            <h4 className="text-xl font-bold font-futuristic text-white uppercase tracking-tight">{v.t}</h4>
                            <p className="text-white text-sm font-light leading-relaxed">{v.d}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </ScrollReveal>
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="py-24 px-6 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                  <div>
                    <span className="text-purple-500 font-bold uppercase tracking-[0.5em] mb-6 block text-[10px]">Get In Touch</span>
                    <h2 className="text-5xl md:text-8xl font-bold font-futuristic mb-12 uppercase tracking-tighter text-white leading-[0.8]">Let’s Start <br/><span className="text-purple-600">Your Project.</span></h2>
                    <p className="text-white text-2xl mb-16 max-w-lg font-light leading-relaxed">
                      Tell us about your idea and we'll bring it to life with elite design, development, and video production.
                    </p>
                    
                    <div className="space-y-12">
                       <div className="flex items-center gap-8 group cursor-pointer">
                          <div className="w-16 h-16 glass rounded-[24px] flex items-center justify-center text-blue-500 bg-white/5 border border-white/10 shadow-sm group-hover:bg-white group-hover:text-black transition-all">
                             <Icon name="Globe" className="w-7 h-7" />
                          </div>
                          <div>
                             <h5 className="font-bold text-[10px] tracking-[0.5em] uppercase mb-1 text-white">Email Inquiry</h5>
                             <p className="text-white text-xl font-light">hello@visualix.studio</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setFormStatus('sending'); setTimeout(() => setFormStatus('success'), 1500); }} className="glass p-12 md:p-16 rounded-[56px] border border-white/10 space-y-8 relative overflow-hidden shadow-2xl bg-[#0a0a0a]">
                    {formStatus === 'success' ? (
                      <div className="text-center py-24 animate-fade-in">
                         <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-10 mx-auto shadow-2xl">
                            <Icon name="Check" className="w-12 h-12" />
                         </div>
                         <h3 className="text-4xl font-bold font-futuristic mb-4 uppercase tracking-tighter text-white">Transmission Sent</h3>
                         <p className="text-white mb-10 text-lg">Thank you. One of our directors will reach out shortly.</p>
                         <button onClick={() => setFormStatus('idle')} className="px-10 py-4 glass border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">New Brief</button>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-white uppercase tracking-[0.3em] ml-2">Your Name</label>
                             <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:border-purple-500 transition-all text-base text-white placeholder:text-white/40" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-white uppercase tracking-[0.3em] ml-2">Email Address</label>
                             <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:border-purple-500 transition-all text-base text-white placeholder:text-white/40" />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-white uppercase tracking-[0.3em] ml-2">Service Needed</label>
                           <select className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:border-purple-500 transition-all text-base text-white appearance-none">
                              <option className="bg-black">E-commerce website</option>
                              <option className="bg-black">Web Development</option>
                              <option className="bg-black">Video Editing</option>
                              <option className="bg-black">Other / Comprehensive Bundle</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-white uppercase tracking-[0.3em] ml-2">Tell Us Your Idea</label>
                           <textarea required placeholder="Briefly describe your vision and mission..." className="w-full h-44 bg-white/5 border border-white/5 rounded-2xl px-8 py-6 focus:outline-none focus:border-purple-500 transition-all resize-none text-base leading-relaxed text-white placeholder:text-white/40" />
                        </div>
                        <button className="w-full py-6 bg-white text-black rounded-2xl font-bold text-lg tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all transform active:scale-[0.98] uppercase shadow-2xl">
                          {formStatus === 'sending' ? 'Transmitting...' : 'Transmit Mission'}
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 bg-[#030303] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
             <div className="md:col-span-2">
                <div onClick={() => navigate('home')} className="flex items-center gap-3 mb-8 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-2xl">
                    <span className="font-bold text-2xl font-futuristic text-white">V</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold font-futuristic tracking-tighter uppercase leading-none text-white">Visualix</span>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-purple-500 font-bold">Studio</span>
                  </div>
                </div>
                <p className="text-white text-xl max-w-sm mb-12 font-light leading-relaxed">
                  Boutique creative lab engineering high-end design, code, and cinematic video.
                </p>
             </div>
             <div>
                <h5 className="text-[11px] font-bold text-white uppercase tracking-[0.5em] mb-10">Navigation</h5>
                <ul className="space-y-5 text-white font-bold text-xs tracking-[0.2em] uppercase">
                   {navItems.map(item => (
                     <li key={item.id} onClick={() => navigate(item.id)} className="hover:text-purple-400 cursor-pointer transition-all">{item.name}</li>
                   ))}
                </ul>
             </div>
             <div>
                <h5 className="text-[11px] font-bold text-white uppercase tracking-[0.5em] mb-10">Services</h5>
                <ul className="space-y-5 text-white font-bold text-xs tracking-[0.2em] uppercase">
                   <li onClick={() => navigate('services')} className="hover:text-purple-400 cursor-pointer transition-all">E-commerce website</li>
                   <li onClick={() => navigate('services')} className="hover:text-purple-400 cursor-pointer transition-all">Web Development</li>
                   <li onClick={() => navigate('services')} className="hover:text-purple-400 cursor-pointer transition-all">Video Editing</li>
                </ul>
             </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-80">
            <p className="text-[10px] text-white tracking-[0.5em] font-bold uppercase">© 2024 Visualix Studio. Built for Digital Dominance.</p>
            <div className="flex gap-6">
              {['Instagram', 'Twitter', 'Dribbble'].map(s => (
                <a key={s} href="#" className="w-10 h-10 glass border-none rounded-xl flex items-center justify-center text-white hover:text-purple-600 bg-white/5 shadow-2xl transition-all group">
                   <Icon name="Share2" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
