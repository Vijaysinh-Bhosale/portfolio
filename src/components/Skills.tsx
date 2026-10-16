import { useState } from 'react';
import { skillCategories } from '../data/skills';
import { Wrench, Code, Database, Brain, Sparkles, Server, Terminal, Filter } from 'lucide-react';

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Capabilities' },
    ...skillCategories.map((c) => ({ id: c.id, name: c.name })),
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return <Code className="w-4 h-4 text-cyan-400" />;
      case 'data-analytics':
        return <Database className="w-4 h-4 text-sky-400" />;
      case 'machine-learning':
        return <Brain className="w-4 h-4 text-indigo-400" />;
      case 'generative-ai':
        return <Sparkles className="w-4 h-4 text-violet-400" />;
      case 'backend-systems':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'developer-tools':
        return <Terminal className="w-4 h-4 text-slate-400" />;
      default:
        return <Wrench className="w-4 h-4 text-cyan-400" />;
    }
  };

  const displayedCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="py-20 sm:py-28 relative bg-dark-900 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-dark-950 border border-slate-800 text-xs font-mono text-cyan-400 mb-4">
              <Wrench className="w-3.5 h-3.5" />
              <span>02 // CAPABILITIES & STACK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              My Technical Toolkit
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              A structured overview of languages, analytical libraries, machine learning architectures, and data engineering systems that I apply in my work.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 bg-dark-950 px-3.5 py-2 rounded-lg border border-slate-800 self-start md:self-auto">
            Configurable data driven • Zero artificial skill bars
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" role="tablist">
          <Filter className="w-4 h-4 text-slate-500 flex-shrink-0 mr-1" />
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              className="bg-dark-950 border border-slate-800/90 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/70">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-dark-900 border border-slate-800">
                      {getCategoryIcon(category.id)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide">
                        {category.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">
                        {category.skills.length} competencies
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Skills list */}
                <div className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`p-2.5 rounded-lg border transition-colors ${
                        skill.highlight
                          ? 'bg-dark-900/90 border-cyan-900/40 hover:border-cyan-500/40'
                          : 'bg-dark-900/40 border-slate-800/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-medium font-mono ${
                            skill.highlight ? 'text-cyan-300 font-semibold' : 'text-slate-200'
                          }`}
                        >
                          {skill.name}
                        </span>
                        {skill.highlight && (
                          <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950 px-1.5 py-0.2 rounded">
                            Core
                          </span>
                        )}
                      </div>
                      {skill.description && (
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
