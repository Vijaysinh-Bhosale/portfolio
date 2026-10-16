import { useState } from 'react';
import { projectsData } from '../data/projects';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Layers, Sparkles } from 'lucide-react';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 sm:py-28 relative bg-dark-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-dark-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>03 // SELECTED WORK & CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selected Work
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Real-world engineering projects combining time-series forecasting, industrial anomaly detection, and retrieval-augmented generation. Click any case study to explore its interactive architecture and design decisions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3.5 py-2 rounded-lg self-start md:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Previews Available</span>
          </div>
        </div>

        {/* Varied Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
