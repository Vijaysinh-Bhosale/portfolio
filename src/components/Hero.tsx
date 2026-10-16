import type React from 'react';
import { profileData } from '../data/profile';
import { HeroNetworkCanvas } from './HeroNetworkCanvas';
import { HeroTerminal } from './HeroTerminal';
import { ArrowDown, ArrowRight, FileText, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenResumeNotice: () => void;
}

export const Hero = ({ onOpenResumeNotice }: HeroProps) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      !profileData.contact.resumeUrl ||
      profileData.contact.resumeUrl.includes('[ADD_')
    ) {
      onOpenResumeNotice();
    } else {
      window.open(profileData.contact.resumeUrl, '_blank');
    }
  };

  return (
    <header
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"
    >
      {/* Background Interactive Network Grid */}
      <HeroNetworkCanvas />

      {/* Subtle radial ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900/90 border border-emerald-500/30 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">{profileData.availability}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                {profileData.location}
              </span>
            </div>

            {/* Main Headline & Identity */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Engineering <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  Intelligence
                </span>{' '}
                from Data.
              </h1>
              <p className="text-sm sm:text-base font-mono text-cyan-300/90">
                {profileData.name} — {profileData.professionalTitle}
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Computer Engineering graduate exploring machine learning, data systems, and intelligent applications — one real-world problem at a time.
            </p>

            {/* Compact Technology Badges */}
            <div className="pt-1">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-2 font-medium">
                Core Specialization
              </span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {['Python', 'SQL', 'Machine Learning', 'Generative AI'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-mono bg-dark-850/90 text-slate-300 border border-slate-700/80 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Primary CTA */}
              <button
                onClick={() => handleScrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-dark-950 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={handleResumeClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-dark-900 hover:bg-dark-850 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              {/* Text link */}
              <button
                onClick={() => handleScrollTo('contact')}
                className="text-sm font-medium text-slate-400 hover:text-cyan-300 transition-colors ml-2 underline underline-offset-4 decoration-slate-700 hover:decoration-cyan-400"
              >
                Let's Connect →
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Terminal Panel */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroTerminal />
          </div>
        </div>

        {/* Restrained Scroll Cue */}
        <div className="mt-14 flex flex-col items-center justify-center text-slate-500 gap-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500">
            Scroll to inspect
          </span>
          <button
            onClick={() => handleScrollTo('about')}
            className="p-1 rounded-full text-slate-500 hover:text-cyan-400 transition-colors animate-bounce"
            aria-label="Scroll down to About section"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
