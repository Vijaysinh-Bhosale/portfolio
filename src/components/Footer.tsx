import { profileData } from '../data/profile';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const currentYear = new Date().getFullYear();

export const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 border-t border-slate-850 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
              VB.
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight">
                {profileData.brandTitle}
              </span>
              <p className="text-xs text-slate-500 font-mono">
                {profileData.name} • {profileData.location}
              </p>
            </div>
          </div>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-4">
            {profileData.contact.github && !profileData.contact.github.includes('[ADD_') && (
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-900 hover:bg-dark-850 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {profileData.contact.linkedin && !profileData.contact.linkedin.includes('[ADD_') && (
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-900 hover:bg-dark-850 text-slate-400 hover:text-sky-400 border border-slate-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-dark-900 hover:bg-dark-850 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Legal & Tech attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {currentYear} Vijay Bhosale. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
