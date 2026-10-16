import { useState, useEffect } from 'react';
import { X, FileText, CheckCircle2, Copy } from 'lucide-react';
import { profileData } from '../data/profile';

interface ResumeNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeNoticeModal = ({ isOpen, onClose }: ResumeNoticeModalProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyInstruction = () => {
    navigator.clipboard.writeText(
      "// In src/data/profile.ts:\ncontact: {\n  resumeUrl: '/resume-vijay-bhosale.pdf',\n  ...\n}"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-dark-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
            <FileText className="w-4 h-4" />
            <span>RESUME STATUS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-dark-900 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h3 id="resume-modal-title" className="text-base font-bold text-white mb-2">
            Resume Configuration Notice
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The resume file path is currently designated with placeholder{' '}
            <code className="text-cyan-300 font-mono bg-dark-900 px-1.5 py-0.5 rounded border border-slate-800">
              {profileData.contact.resumeUrl}
            </code>{' '}
            to respect technical authenticity without dummy files.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800/80 space-y-2 text-xs font-mono text-slate-400">
          <p className="text-slate-300 font-medium">To activate your live resume:</p>
          <ol className="list-decimal list-inside space-y-1 text-slate-400">
            <li>Place your PDF inside the <code className="text-cyan-300">/public/</code> directory.</li>
            <li>Update <code className="text-cyan-300">contact.resumeUrl</code> in <code className="text-cyan-300">src/data/profile.ts</code>.</li>
          </ol>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={handleCopyInstruction}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-dark-900 hover:bg-dark-850 border border-slate-800 transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied snippet</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy config tip</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
