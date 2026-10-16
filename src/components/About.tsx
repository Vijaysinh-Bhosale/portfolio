import { profileData } from '../data/profile';
import { Compass } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-20 sm:py-28 relative bg-dark-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-dark-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>01 // PERSPECTIVE & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A little about how I think.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {profileData.shortIntro}
          </p>
        </div>

        {/* Narrative & Engineering Mindset Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Main Bio / Focus areas */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              My path in Computer Engineering at{' '}
              <span className="text-white font-medium">
                Dr. Babasaheb Ambedkar Technological University (DBATU)
              </span>{' '}
              has been shaped by a desire to bridge rigorous data analytics with functional software systems. I find genuine excitement in uncovering anomalies within raw datasets and converting those findings into reliable, user-centered applications.
            </p>
            <p>
              Rather than treating machine learning as an isolated theoretical discipline, I view it as an integral component of software engineering. Whether predicting agricultural mandi revenues, classifying industrial machinery breakdowns, or querying documents via dense vector spaces, my focus remains centered on practical usability, clear validation, and measurable utility.
            </p>

            {/* Target roles list */}
            <div className="pt-4 bg-dark-900/60 p-5 rounded-xl border border-slate-800/90">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                Target Roles & Collaborative Interests
              </span>
              <div className="flex flex-wrap gap-2">
                {profileData.targetRoles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 text-xs font-mono rounded bg-dark-950 text-slate-300 border border-slate-700/60"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics / Academic Credential Callout */}
          <div className="lg:col-span-5 bg-dark-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Academic Profile
              </span>
              <span className="text-xs font-mono text-slate-500">2022 – 2026</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-slate-500 block uppercase">Degree & Major</span>
                <span className="text-sm font-semibold text-white">
                  {profileData.education.degree}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  {profileData.education.institution}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-lg bg-dark-950 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-500 block">Current CGPA</span>
                  <span className="text-lg font-bold font-mono text-cyan-400">
                    {profileData.education.cgpa}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-dark-950 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-500 block">Graduation</span>
                  <span className="text-lg font-bold font-mono text-slate-200">2026</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 block uppercase mb-1.5">
                  Core Foundations
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.education.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-dark-950 text-slate-400 border border-slate-800"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Visual Principles */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Three Guiding Principles
            </span>
            <div className="h-px bg-slate-800 flex-1 ml-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileData.principles.map((principle) => (
              <div
                key={principle.number}
                className="group p-6 rounded-xl bg-dark-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-dark-900 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold font-mono text-cyan-400/80 group-hover:text-cyan-300">
                    {principle.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400/30 group-hover:bg-cyan-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
