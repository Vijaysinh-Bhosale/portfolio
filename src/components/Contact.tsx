import { useState } from 'react';
import { profileData } from '../data/profile';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedStatus, setSubmittedStatus] = useState<{
    success: boolean;
    message: string;
    draftMailto?: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please include a message or inquiry.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmittedStatus(null);

    setTimeout(() => {
      setIsSubmitting(false);

      const targetEmail =
        profileData.contact.email.includes('[ADD_')
          ? 'vijaybhosale.engineering@example.com'
          : profileData.contact.email;

      const subjectLine = encodeURIComponent(
        formData.subject.trim() || `Portfolio Inquiry from ${formData.name}`
      );
      const bodyContent = encodeURIComponent(
        `Hi Vijay,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
      );
      const mailtoUrl = `mailto:${targetEmail}?subject=${subjectLine}&body=${bodyContent}`;

      setSubmittedStatus({
        success: true,
        message:
          'Validation complete! To ensure absolute delivery without intermediary server dependencies, your message is formatted and ready to transmit directly via your mail client.',
        draftMailto: mailtoUrl,
      });
    }, 450);
  };

  const handleCopyDraft = () => {
    const text = `Subject: ${formData.subject || 'Portfolio Inquiry'}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative bg-dark-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Direct Contact Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-dark-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>05 // GET IN TOUCH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Have a problem worth solving?
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              I'm interested in entry-level opportunities, technical collaborations, and projects that turn data into useful solutions.
            </p>

            {/* Direct Channels */}
            <div className="space-y-3 pt-2">
              {/* Email */}
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-dark-850 text-cyan-400 border border-slate-700/60">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase block">Email</span>
                    {profileData.contact.email.includes('[ADD_') ? (
                      <span className="text-xs font-mono text-slate-400">
                        {profileData.contact.email} (Configurable)
                      </span>
                    ) : (
                      <a
                        href={`mailto:${profileData.contact.email}`}
                        className="text-sm font-mono text-white hover:text-cyan-300 transition-colors"
                      >
                        {profileData.contact.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* GitHub */}
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-dark-850 text-slate-300 border border-slate-700/60">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase block">GitHub</span>
                    {profileData.contact.github.includes('[ADD_') ? (
                      <span className="text-xs font-mono text-slate-400">
                        {profileData.contact.github} (Configurable)
                      </span>
                    ) : (
                      <a
                        href={profileData.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-white hover:text-cyan-300 transition-colors"
                      >
                        github.com/vijaybhosale
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-dark-850 text-sky-400 border border-slate-700/60">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase block">LinkedIn</span>
                    {profileData.contact.linkedin.includes('[ADD_') ? (
                      <span className="text-xs font-mono text-slate-400">
                        {profileData.contact.linkedin} (Configurable)
                      </span>
                    ) : (
                      <a
                        href={profileData.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-white hover:text-cyan-300 transition-colors"
                      >
                        linkedin.com/in/vijay-bhosale
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Form with Honest Feedback */}
          <div className="lg:col-span-7 bg-dark-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill in your details below. No spam, no marketing newsletters.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aditi Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-dark-950 border text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-colors ${
                      errors.name
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aditi@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-dark-950 border text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-colors ${
                      errors.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                  Subject / Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Data Science Opportunity / Technical Discussion"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your team, problem statement, or opportunity..."
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-dark-950 border text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-colors resize-y ${
                    errors.message
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-semibold bg-cyan-500 hover:bg-cyan-400 text-dark-950 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message Draft</span>
                  </>
                )}
              </button>
            </form>

            {/* Honest Feedback Result Banner */}
            {submittedStatus && (
              <div className="mt-5 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-3 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {submittedStatus.message}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {submittedStatus.draftMailto && (
                    <a
                      href={submittedStatus.draftMailto}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold bg-cyan-500 text-dark-950 hover:bg-cyan-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch in Default Mail App</span>
                    </a>
                  )}

                  <button
                    onClick={handleCopyDraft}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-dark-950 hover:bg-dark-850 text-slate-300 border border-slate-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Message to Clipboard</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
