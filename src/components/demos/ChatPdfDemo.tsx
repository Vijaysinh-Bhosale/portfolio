import { useState } from 'react';
import { FileText, Send, Sparkles, BookOpen, Info, Search } from 'lucide-react';

interface QnAPair {
  id: string;
  question: string;
  answer: string;
  sourcePage: number;
  section: string;
  similarityScore: number;
  retrievedExcerpt: string;
}

const sampleQnAList: QnAPair[] = [
  {
    id: 'q1',
    question: 'What is the required oil viscosity and lubrication interval for the primary gearbox?',
    answer:
      'According to Section 4.3, the primary planetary gearbox requires ISO VG 220 synthetic gear lubricant. Lubricant replacement must be performed every 4,000 operational hours or every 12 months, whichever is reached first.',
    sourcePage: 14,
    section: 'Section 4.3 — Drive Train Lubrication Specifications',
    similarityScore: 0.934,
    retrievedExcerpt:
      '...planets and bearings must be lubricated using ISO VG 220 synthetic oil conforming to DIN 51517-3. Operational duration between complete drain and refills is rated at 4,000 running hours or 12 calendar months under standard thermal envelope (20°C–45°C)...',
  },
  {
    id: 'q2',
    question: 'What immediate actions are mandated during a Stage-2 thermal alert (>85°C)?',
    answer:
      'In the event of a Stage-2 thermal exceedance (>85°C), the PLC initiates an automated load-shedding sequence, throttling motor speed to 600 RPM. Operators must verify coolant line flow rate and must NOT attempt manual reset until temperature falls below 65°C.',
    sourcePage: 28,
    section: 'Section 7.1 — Thermal Overload Protocol',
    similarityScore: 0.918,
    retrievedExcerpt:
      '...when thermocouple T_proc exceeds 85.0°C continuously for >= 15 seconds, Stage-2 trip occurs. Automatic RPM derating to 600 RPM engages. Technicians must inspect auxiliary coolant circuit valve CV-102. Manual interlock override is strictly prohibited until temperature drops <= 65°C...',
  },
  {
    id: 'q3',
    question: 'How is vector indexing configured for tabular data inside the document?',
    answer:
      'Tables are parsed using PyPDF2 with row-level delimiter formatting, converted into semi-structured Markdown strings, and split with a 150-token window overlap to ensure column headers remain bound to numerical entries.',
    sourcePage: 6,
    section: 'Section 2.4 — RAG Parsing Architecture',
    similarityScore: 0.892,
    retrievedExcerpt:
      '...tabular arrays cannot be split naively by character count. Tables are linearized into markdown format with explicit column keys preserved across chunk splits with an overlap factor of 150 tokens...',
  },
];

export const ChatPdfDemo = () => {
  const [activeQnA, setActiveQnA] = useState<QnAPair>(sampleQnAList[0]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSelectQuestion = (q: QnAPair) => {
    if (q.id === activeQnA.id) return;
    setIsProcessing(true);
    setTimeout(() => {
      setActiveQnA(q);
      setIsProcessing(false);
    }, 280);
  };

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-xl p-4 sm:p-6 text-slate-200">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-violet-950/80 text-violet-400 border border-violet-800/40">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            LangChain + FAISS + Gemini RAG
          </span>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Index: 48 Chunks (Cosine Distance)
          </span>
        </div>
        <div className="flex items-center text-xs text-slate-400 gap-1 bg-dark-850 px-2.5 py-1 rounded-md border border-slate-800">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Interactive sample document demo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Document Context & Sample Prompt Selector */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Document File Card */}
          <div className="bg-dark-950/80 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-200 truncate max-w-[180px] sm:max-w-[220px]">
                  Turbine_Operating_Manual_Rev4.pdf
                </p>
                <p className="text-[11px] text-slate-500 font-mono">34 Pages • 18,420 Words • Indexed</p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40">
              Vectorized
            </span>
          </div>

          {/* Sample Prompts */}
          <div className="bg-dark-950/70 p-4 rounded-lg border border-slate-800/80 flex-1">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
              Click a sample query to test retrieval:
            </label>
            <div className="space-y-2">
              {sampleQnAList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectQuestion(item)}
                  className={`w-full text-left p-2.5 rounded-md text-xs transition-all border ${
                    activeQnA.id === item.id
                      ? 'bg-violet-950/30 text-violet-200 border-violet-500/50 shadow-sm'
                      : 'bg-dark-850 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Search className="w-3.5 h-3.5 mt-0.5 text-violet-400 flex-shrink-0" />
                    <span className="line-clamp-2">{item.question}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: RAG Generation & Grounded Context Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Answer Box */}
          <div className="bg-dark-950/80 p-4 rounded-lg border border-slate-800 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-violet-400 flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Grounded Response
                </span>
                <span className="text-[10px] font-mono text-slate-500">Gemini 1.5 Flash</span>
              </div>

              {isProcessing ? (
                <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400 font-mono text-xs">
                  <div className="w-5 h-5 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                  <span>Searching FAISS vector space & synthesizing...</span>
                </div>
              ) : (
                <div className="text-sm text-slate-200 leading-relaxed space-y-2">
                  <p>{activeQnA.answer}</p>
                </div>
              )}
            </div>

            {/* Simulated input bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
              <input
                type="text"
                disabled
                value={activeQnA.question}
                className="flex-1 bg-dark-900 border border-slate-800 text-xs px-3 py-2 rounded-md text-slate-400 font-mono cursor-not-allowed"
              />
              <button
                disabled
                className="p-2 rounded-md bg-violet-600/30 text-violet-300 border border-violet-500/30 cursor-not-allowed"
                aria-label="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Source Attribution Drawer */}
          <div className="bg-dark-950/60 p-3.5 rounded-lg border border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-2 font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                Retrieved Context Source
              </span>
              <span className="text-cyan-400 font-semibold">
                FAISS Cosine Similarity: {(activeQnA.similarityScore * 100).toFixed(1)}%
              </span>
            </div>

            <div className="p-2.5 rounded bg-dark-900 border border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span className="text-slate-300">{activeQnA.section}</span>
                <span className="bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded text-[10px]">
                  Page {activeQnA.sourcePage}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic font-serif leading-relaxed line-clamp-3">
                "{activeQnA.retrievedExcerpt}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
