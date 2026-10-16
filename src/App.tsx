import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeNoticeModal } from './components/ResumeNoticeModal';

export function App() {
  const [resumeNoticeOpen, setResumeNoticeOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Navigation */}
      <Navbar onOpenResumeNotice={() => setResumeNoticeOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenResumeNotice={() => setResumeNoticeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Configuration Modal */}
      <ResumeNoticeModal
        isOpen={resumeNoticeOpen}
        onClose={() => setResumeNoticeOpen(false)}
      />
    </div>
  );
}

export default App;
