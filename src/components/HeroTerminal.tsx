import { useState } from 'react';
import { Terminal, Copy, Check, Code2 } from 'lucide-react';

interface CodeSnippet {
  id: string;
  filename: string;
  badge: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  {
    id: 'pipeline',
    filename: 'crop_optimizer.py',
    badge: 'LSTM Time-Series',
    code: `# Crop2Market Price Estimation & Optimization
import numpy as np
from sklearn.preprocessing import MinMaxScaler

def evaluate_net_market_yield(prices, dist_km, freight_rate, yield_qtl):
    """
    Ranks destination mandis factoring in transit overhead
    """
    projected_prices = lstm_model.predict(prices[-30:])
    gross_return = projected_prices[-1] * yield_qtl
    freight_cost = dist_km * freight_rate
    net_realized_profit = gross_return - freight_cost
    return round(float(net_realized_profit), 2)`,
  },
  {
    id: 'diagnostic',
    filename: 'telemetry_shap.py',
    badge: 'RandomForest + SHAP',
    code: `# Manufacturing Telemetry Anomaly Inference
import shap
from fastapi import FastAPI

@app.post("/api/v1/predict-anomaly")
async def inspect_telemetry(reading: SensorPayload):
    features = transform_sensor_stream(reading)
    prob_failure = rf_classifier.predict_proba(features)[0][1]
    
    # SHAP local feature attribution
    shap_values = explainer.shap_values(features)
    top_driver = features.columns[np.argmax(shap_values[1])]
    
    return {"risk_pct": prob_failure * 100, "root_cause": top_driver}`,
  },
  {
    id: 'rag',
    filename: 'rag_retrieval.py',
    badge: 'LangChain + FAISS',
    code: `# Grounded Context Retrieval Pipeline
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI

def answer_document_query(query: str, vector_store: FAISS):
    retriever = vector_store.as_retriever(search_kwargs={"k": 4})
    context_chunks = retriever.get_relevant_documents(query)
    
    prompt = STRICT_CONTEXT_PROMPT.format(
        context="\\n---\\n".join([c.page_content for c in context_chunks]),
        question=query
    )
    return llm.invoke(prompt)`,
  },
];

export const HeroTerminal = () => {
  const [activeTab, setActiveTab] = useState<string>('pipeline');
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = snippets.find((s) => s.id === activeTab) || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0 rounded-xl overflow-hidden border border-slate-800 bg-dark-900/90 shadow-2xl backdrop-blur-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-dark-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-500 font-mono text-[11px] ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            python3 • env: datascience
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
            {currentSnippet.badge}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            title="Copy code snippet"
            aria-label="Copy code snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Tabs */}
      <div className="flex bg-dark-950/70 border-b border-slate-800 px-2 pt-1 gap-1 overflow-x-auto">
        {snippets.map((snippet) => (
          <button
            key={snippet.id}
            onClick={() => setActiveTab(snippet.id)}
            className={`px-3 py-1.5 text-xs font-mono rounded-t-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === snippet.id
                ? 'bg-dark-900 text-cyan-300 border-t border-x border-slate-800 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3 h-3 text-slate-500" />
            <span>{snippet.filename}</span>
          </button>
        ))}
      </div>

      {/* Code Body */}
      <div className="p-4 sm:p-5 overflow-x-auto text-[11.5px] sm:text-xs font-mono leading-relaxed text-slate-300 bg-dark-900/60 selection:bg-cyan-500/30">
        <pre className="overflow-x-auto whitespace-pre font-mono">
          <code>{currentSnippet.code}</code>
        </pre>
      </div>

      {/* Terminal Footer Status */}
      <div className="px-4 py-2 bg-dark-950/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Status: Verified Modular Pipelines</span>
        </div>
        <span className="text-slate-400">DBATU '26</span>
      </div>
    </div>
  );
};
