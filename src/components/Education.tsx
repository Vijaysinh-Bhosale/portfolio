import { profileData } from '../data/profile';
import { GraduationCap, Calendar, Award, MapPin, BookOpen, Clock } from 'lucide-react';

export const Education = () => {
  return (
    <section id="journey" className="py-20 sm:py-28 relative bg-dark-900 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-dark-950 border border-slate-800 text-xs font-mono text-cyan-400 mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>04 // ACADEMIC FOUNDATION & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Milestones
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Verified academic credentials at DBATU and honest verification records for extracurricular & project milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: DBATU Degree Timeline Card */}
          <div className="lg:col-span-7 bg-dark-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                Undergraduate Degree
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                <Calendar className="w-3 h-3" />
                2022 – 2026
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {profileData.education.degree}
              </h3>
              <p className="text-base text-cyan-300 font-mono mt-1">
                {profileData.education.institution}
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {profileData.education.location}
              </p>
            </div>

            {/* Score Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800/90 flex flex-col justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Cumulative Grade (CGPA)</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold font-mono text-cyan-400">
                    {profileData.education.cgpa}
                  </span>
                  <span className="text-xs font-mono text-slate-500">/ 10.0 scale</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800/90 flex flex-col justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Current Academic Status</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-base font-semibold text-slate-200">Final Year (Senior)</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 mt-1">Completion: 2026</span>
              </div>
            </div>

            {/* Core Coursework List */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Key Computer Engineering Disciplines
              </span>
              <div className="flex flex-wrap gap-2">
                {profileData.education.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-dark-900 text-slate-300 border border-slate-800"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Verified Milestones & Transparent Policy */}
          <div className="lg:col-span-5 space-y-6">
            {/* Transparent Policy Card */}
            <div className="bg-dark-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                <Award className="w-4 h-4 text-cyan-400" />
                Milestone Verification Policy
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In strict adherence to technical honesty and recruiter transparency, awards, hackathon rankings, and sports selections (e.g. cricket representations) are listed only with verifiable institutional proof.
              </p>

              {/* Verified Entries / Configurable slots */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/40 flex-shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">B.Tech Engineering Capstone</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Crop2Market: Automated Market Strategy Advisor selected for departmental presentation and evaluation.
                    </p>
                    <span className="text-[10px] font-mono text-cyan-400/80 mt-1 inline-block">
                      DBATU Departmental Review • 2025–2026
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-start gap-3 opacity-80">
                  <div className="p-2 rounded-lg bg-dark-850 text-slate-400 border border-slate-700/60 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-300">
                      Hackathons & Sports Representation
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Hackathon submissions and university/district cricket selections will be updated with certificate credentials.
                    </p>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 inline-block">
                      Status: Configurable in profile.ts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
