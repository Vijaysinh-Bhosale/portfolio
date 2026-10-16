import { useEffect } from 'react';
import type { Project } from '../types';
import {
  X,
  ExternalLink,
  Layers,
  Database,
  Cpu,
  AlertCircle,
  CheckCircle2,
  GitBranch,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { Crop2MarketDemo } from './demos/Crop2MarketDemo';
import { PredictiveMaintenanceDemo } from './demos/PredictiveMaintenanceDemo';
import { ChatPdfDemo } from './demos/ChatPdfDemo';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderDemo = () => {
    switch (project.demoType) {
      case 'crop2market':
        return <Crop2MarketDemo />;
      case 'predictive-maintenance':
        return <PredictiveMaintenanceDemo />;
      case 'chat-pdf':
        return <ChatPdfDemo />;
      default:
        return null;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-dark-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-dark-900/90 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-500">Case Study Dossier</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Title & Tagline */}
          <div>
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-cyan-300 font-mono mt-1">{project.tagline}</p>
          </div>

          {/* Interactive Demo Preview Section */}
          <section aria-labelledby="live-interactive-demo">
            <div className="flex items-center justify-between mb-3">
              <h3 id="live-interactive-demo" className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Live Interactive Architecture Preview
              </h3>
            </div>
            {renderDemo()}
          </section>

          {/* Problem & Solution Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-900/90 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <AlertCircle className="w-4 h-4" />
                Problem Statement
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{project.problem}</p>
            </div>

            <div className="bg-dark-900/90 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <CheckCircle2 className="w-4 h-4" />
                Engineering Solution
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{project.solution}</p>
            </div>
          </section>

          {/* System Architecture Pipeline (SVG / Structured Steps) */}
          <section className="bg-dark-900/90 p-6 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold mb-4">
              <GitBranch className="w-4 h-4" />
              End-to-End System Architecture
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {project.architecture.overview}
            </p>

            {/* Architecture Steps Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
              {project.architecture.flowSteps.map((step, idx) => (
                <div
                  key={step.step}
                  className="bg-dark-950 p-4 rounded-lg border border-slate-800 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        STAGE {step.step}
                      </span>
                      {idx < project.architecture.flowSteps.length - 1 && (
                        <span className="hidden lg:inline text-slate-600 text-xs font-mono">→</span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Deep Technical Approaches: Data Processing & Model Methodology */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-900/70 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <Database className="w-4 h-4" />
                Data Ingestion & Feature Engineering
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.architecture.dataProcessing}
              </p>
            </div>

            <div className="bg-dark-900/70 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-violet-400 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                <Cpu className="w-4 h-4" />
                Model & Retrieval Methodology
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.architecture.modelMethodology}
              </p>
            </div>
          </section>

          {/* Technology Choices & Engineering Rationale */}
          <section className="bg-dark-900/70 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-xs uppercase tracking-wider font-semibold mb-4">
              <Layers className="w-4 h-4 text-cyan-400" />
              Technology Choices & Design Decisions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.architecture.techChoices.map((choice) => (
                <div key={choice.technology} className="bg-dark-950/80 p-3.5 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-mono font-bold text-cyan-300 mb-1">{choice.technology}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{choice.rationale}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Evaluation & Limitations */}
          <section className="bg-dark-900/70 p-5 rounded-xl border border-slate-800">
            <div className="text-slate-400 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
              Evaluation Metrics & Realistic Operational Boundaries
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.architecture.evaluationAndLimitations}
            </p>
          </section>

          {/* Key Contributions List */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Key Technical Contributions
            </h4>
            <ul className="space-y-2">
              {project.contributions.map((contribution, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span>{contribution}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technologies Stack Tags */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
              Tools & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-dark-850 text-slate-300 border border-slate-700/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-slate-800 bg-dark-900/90 sticky bottom-0 z-20">
          <div className="text-xs text-slate-500 font-mono">
            {project.githubUrl.includes('[ADD_') ? (
              <span>Code repository link configured upon publication</span>
            ) : (
              <span>Verified codebase repository</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && !project.githubUrl.includes('[ADD_') ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-dark-800 hover:bg-dark-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Source Code
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono text-slate-400 bg-dark-850 border border-slate-800">
                <GithubIcon className="w-3.5 h-3.5" />
                Repo: Configurable
              </span>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Deployment
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
