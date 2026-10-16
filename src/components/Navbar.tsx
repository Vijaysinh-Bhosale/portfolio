import { useState, useEffect } from 'react';
import type React from 'react';
import { profileData } from '../data/profile';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenResumeNotice: () => void;
}

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar = ({ onOpenResumeNotice }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['hero', ...navItems.map((item) => item.id)];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (!profileData.contact.resumeUrl || profileData.contact.resumeUrl.includes('[ADD_')) {
      onOpenResumeNotice();
    } else {
      window.open(profileData.contact.resumeUrl, '_blank');
    }
  };

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="group flex items-center gap-2 focus:outline-none"
            aria-label="Scroll to top of Vijay Bhosale portfolio"
          >
            <div className="w-9 h-9 rounded-lg bg-dark-900 border border-slate-800 group-hover:border-cyan-500/60 flex items-center justify-center transition-colors">
              <span className="font-mono font-bold text-sm text-cyan-400 group-hover:text-cyan-300">
                VB.
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Vijay Bhosale
              </span>
              <span className="text-[10px] block font-mono text-slate-500 leading-none">
                Data & ML
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-dark-900/80 border border-slate-800/80 rounded-full px-3 py-1.5 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 shadow-sm border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: Resume & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResumeClick}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono bg-dark-900 hover:bg-dark-850 text-slate-300 border border-slate-700/80 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-900 text-slate-400 hover:text-white border border-slate-800 md:hidden focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-dark-950 border border-slate-800 rounded-2xl shadow-xl space-y-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-dark-900 text-slate-300 hover:bg-dark-850'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={handleResumeClick}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg text-xs font-mono font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800/50"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Download / Inspect Resume PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
