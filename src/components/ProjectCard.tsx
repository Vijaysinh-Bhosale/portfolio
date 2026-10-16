import type { Project } from '../types';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard = ({ project, onOpenDetails }: ProjectCardProps) => {
  const isFeatured = project.featured;

  return (
    <article
      className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isFeatured
          ? 'lg:col-span-2 bg-gradient-to-b from-dark-900 via-dark-900 to-dark-950 border-cyan-500/30 hover:border-cyan-500/60 shadow-lg shadow-cyan-950/20'
          : 'bg-dark-900/90 border-slate-800/90 hover:border-slate-700 hover:bg-dark-850/80'
      }`}
    >
      {/* Decorative ambient corner glow for featured project */}
      {isFeatured && (
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Card Content Area */}
      <div className="p-6 sm:p-8">
        {/* Top meta strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide border ${
                isFeatured
                  ? 'bg-cyan-950/70 text-cyan-300 border-cyan-800/50'
                  : 'bg-dark-800 text-slate-300 border-slate-700/60'
              }`}
            >
              {project.category}
            </span>
            {isFeatured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">
                <Sparkles className="w-3 h-3" />
                Featured Focus
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-slate-500">ID: {project.id}</span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm font-mono text-cyan-400/90 mt-1 mb-4">{project.tagline}</p>

        {/* Problem & Solution */}
        <div className="space-y-3 mb-6">
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-dark-950/60 p-3.5 rounded-lg border border-slate-800/80">
            <span className="font-mono text-slate-400 font-semibold uppercase text-[11px] block mb-1">
              Problem
            </span>
            {project.problem}
          </div>
          <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            <span className="font-mono text-slate-500 font-semibold uppercase text-[11px] block mb-1">
              Solution
            </span>
            {project.solution}
          </div>
        </div>

        {/* Technical Highlights / Contributions */}
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
            Technical Architecture Contributions
          </span>
          <ul className="space-y-1.5">
            {project.contributions.slice(0, isFeatured ? 4 : 3).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                <span className="line-clamp-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-dark-950 text-slate-400 border border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 sm:px-8 py-4 bg-dark-950/70 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {project.githubUrl && !project.githubUrl.includes('[ADD_') ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
          ) : (
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-slate-600" />
              <span>Repo: Configurable</span>
            </span>
          )}

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live App</span>
            </a>
          )}
        </div>

        <button
          onClick={() => onOpenDetails(project)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            isFeatured
              ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-dark-800 hover:bg-dark-700 text-slate-200 border border-slate-700/80'
          }`}
        >
          <span>View Case Study & Demo</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
