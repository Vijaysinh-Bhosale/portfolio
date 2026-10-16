import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'crop2market',
    title: 'Crop2Market: Automated Market Strategy Advisor',
    tagline: 'Price Forecasting & Net Revenue Optimization for Agricultural Markets',
    problem:
      'Farmers frequently face fragmented pricing data across regional agricultural produce market committees (APMCs) and lack practical calculation tools to factor in haulage and distance-based transportation costs before choosing where to sell.',
    solution:
      'An end-to-end analytical application designed to evaluate commodity price patterns, forecast 7-day price trajectories using sequential models, and rank destination markets based on net projected revenue after deducting simulated transportation and logistics costs.',
    featured: true,
    category: 'Machine Learning',
    technologies: [
      'Python',
      'Pandas',
      'Scikit-learn',
      'LSTM',
      'Streamlit',
      'Flask',
      'Geographic Distance APIs',
    ],
    contributions: [
      'Engineered price sequence datasets with lag features, rolling standard deviations, and seasonal indices across APMC markets.',
      'Trained an experimental Long Short-Term Memory (LSTM) network to predict 7-day commodity price trends.',
      'Implemented net-revenue scoring: (Predicted Market Price × Crop Yield) - (Per-km Transit Rate × Haul Distance).',
      'Constructed an interactive Streamlit advisory dashboard allowing farmers to input crop, quantity, and origin hub.',
    ],
    githubUrl: 'https://github.com/Vijaysinh-Bhosale/Crop2Market_lstm',
    liveDemoUrl: undefined,
    demoType: 'crop2market',
    architecture: {
      overview:
        'Crop2Market combines historical commodity price time-series with a transportation-cost matrix. Historical modal prices are ingested, preprocessed, and fed through an LSTM model to project short-term pricing. A ranking heuristic compares regional markets against freight costs to surface the optimal net-profit destination.',
      dataProcessing:
        'Daily commodity arrivals and modal prices undergo cleaning: handling missing recording days via forward-fill, normalizing price scales with MinMaxScaler, and extracting temporal features (day of week, seasonality cycles).',
      modelMethodology:
        'A multi-layer LSTM neural architecture was prototyped to capture non-linear temporal dependencies across historical price sequences. Predictions are constrained with confidence intervals to avoid overconfident advice in volatile trading windows.',
      techChoices: [
        {
          technology: 'LSTM (Sequential Neural Network)',
          rationale: 'Effective at learning temporal trends and cyclical patterns in commodity price histories over standard regression.',
        },
        {
          technology: 'Streamlit & Flask',
          rationale: 'Provided a quick, reactive UI for farmers to toggle input quantities and review ranked market tables.',
        },
        {
          technology: 'Pandas & NumPy',
          rationale: 'Vectorized distance and cost-breakdown calculations across dozens of candidate markets simultaneously.',
        },
      ],
      evaluationAndLimitations:
        'Current models were tested against historical test intervals using Mean Absolute Percentage Error (MAPE). Limitations include external market shocks (unseasonal weather, export-import policy changes) not fully represented in price-only sequences. Illustrative data is used in portfolio demonstrations.',
      flowSteps: [
        {
          step: '01',
          title: 'User Input & Origin Selection',
          description: 'Farmer specifies crop type, harvest volume (quintals), and harvest location coordinates.',
        },
        {
          step: '02',
          title: 'Historical Ingestion & Forecast',
          description: 'Pipeline retrieves past 90-day prices across regional markets and computes 7-day price trends.',
        },
        {
          step: '03',
          title: 'Haulage & Logistics Calculation',
          description: 'Distances to available APMCs are computed with transport cost estimations per quintal-kilometer.',
        },
        {
          step: '04',
          title: 'Ranking & Recommendation',
          description: 'Outputs ranked APMC leaderboard sorted by Net Realized Profit with breakdown visualizers.',
        },
      ],
    },
  },
  {
    id: 'predictive-maintenance',
    title: 'Manufacturing Equipment Predictive Maintenance System',
    tagline: 'Sensor-Driven Anomaly Detection & Failure Classification with SHAP Explainability',
    problem:
      'Unplanned equipment breakdowns in industrial manufacturing lines cause severe operational downtime, unscheduled maintenance costs, and safety risks that conventional fixed-schedule maintenance fails to prevent.',
    solution:
      'A machine learning predictive framework that ingests continuous telemetry (temperature, rotational speed, torque, tool wear) to predict imminent machine failure modes and explain the contributing sensor factors using SHAP values.',
    featured: false,
    category: 'Predictive Analytics',
    technologies: [
      'Python',
      'Scikit-learn',
      'Random Forest',
      'Pandas',
      'NumPy',
      'FastAPI',
      'PostgreSQL',
      'Streamlit',
      'SHAP',
    ],
    contributions: [
      'Engineered rolling statistical aggregates (moving averages, peak vibrations, thermal gradients) from raw multi-sensor telemetry.',
      'Trained and validated Random Forest and Gradient Boosted classifiers to identify multiple failure modes (Heat Dissipation, Power Failure, Tool Wear Failure).',
      'Integrated SHAP (SHapley Additive exPlanations) to provide transparent feature-attribution for plant floor technicians.',
      'Developed a RESTful inference service using FastAPI and Pydantic schemas with an interactive monitoring UI.',
    ],
    githubUrl: 'https://github.com/Vijaysinh-Bhosale/Manufacturing-Equipment-Predictive-Maintenance',
    liveDemoUrl: undefined,
    demoType: 'predictive-maintenance',
    architecture: {
      overview:
        'A microservice architecture where simulated or stream-collected sensor signals are validated through Pydantic models, processed with feature transformations, evaluated by a trained Scikit-learn Random Forest model, and unpacked into local explainability charts via SHAP.',
      dataProcessing:
        'Sensor signals are cleaned, checked for physical boundary limits, scaled using RobustScaler to manage extreme sensor spikes, and augmented with engineered interaction features such as mechanical power output (Torque × Rotational Speed).',
      modelMethodology:
        'Ensemble Random Forest classifier trained on class-imbalanced failure events using SMOTE and class-weight balancing. Evaluation prioritized Recall to minimize costly false-negative machine breakdowns.',
      techChoices: [
        {
          technology: 'Random Forest Classifier',
          rationale: 'Robust to outliers, captures non-linear feature interactions without extensive hyperparameter sensitivity, and enables tree-based SHAP explainability.',
        },
        {
          technology: 'FastAPI & Pydantic',
          rationale: 'Strict payload validation and sub-millisecond inference endpoint latency suitable for edge telemetry gateways.',
        },
        {
          technology: 'SHAP (SHapley Additive exPlanations)',
          rationale: 'Translates black-box ML predictions into human-auditable root cause diagnostics for maintenance engineers.',
        },
      ],
      evaluationAndLimitations:
        'Evaluated on precision-recall trade-offs. The model demonstrates high recall on tool wear and thermal failures, while rapid power anomalies require sub-second sensor frequencies. Portfolio dashboard presents illustrative telemetry.',
      flowSteps: [
        {
          step: '01',
          title: 'Sensor Telemetry Ingestion',
          description: 'Streaming air temperature, process temperature, RPM, torque, and accumulated wear time.',
        },
        {
          step: '02',
          title: 'Validation & Feature Engine',
          description: 'Pydantic checks schema integrity; features compute power draw and temperature differential.',
        },
        {
          step: '03',
          title: 'Classification & Probability',
          description: 'Model calculates failure likelihood and identifies specific failure classification categories.',
        },
        {
          step: '04',
          title: 'SHAP Diagnostic Attribution',
          description: 'Calculates directional contribution of each sensor parameter toward the failure warning.',
        },
      ],
    },
  },
  {
    id: 'chat-pdf',
    title: 'Chat With PDF: RAG-Powered AI Document Assistant',
    tagline: 'Semantic Document Querying with Dense Vector Retrieval & Grounded LLM Responses',
    problem:
      'Extracting precise factual answers, contractual clauses, or technical parameters from dense multi-page PDF documents requires tedious manual search and often results in missed details.',
    solution:
      'A Retrieval-Augmented Generation (RAG) assistant that extracts and chunks PDF contents, embeds them into a FAISS vector index, performs similarity search on user prompts, and generates grounded answers with exact source citations via the Google Gemini API.',
    featured: false,
    category: 'Generative AI',
    technologies: [
      'Python',
      'LangChain',
      'Google Gemini API',
      'FAISS',
      'PyPDF2',
      'Streamlit',
      'Sentence Transformers',
    ],
    contributions: [
      'Implemented recursive character text splitting with tuned chunk sizes and chunk overlaps to preserve semantic continuity across headers and tables.',
      'Built a local in-memory FAISS vector store for sub-second dense vector indexing and cosine distance similarity matching.',
      'Constructed constrained prompt templates that restrict the LLM to context-only extraction to eliminate hallucinations.',
      'Designed an interactive Streamlit UI with PDF viewer, contextual citation badges, and chat conversation history.',
    ],
    githubUrl: 'https://github.com/Vijaysinh-Bhosale/RAG-based-Chat-with-PDF',
    liveDemoUrl: undefined,
    demoType: 'chat-pdf',
    architecture: {
      overview:
        'A modern RAG architecture. When a PDF is loaded, PyPDF2 extracts text, LangChain partitions text into semantic chunks, an embedding model vectorizes the chunks, and FAISS stores them. Upon asking a question, FAISS queries top-k nearest chunks and supplies them to the Google Gemini model along with system constraints.',
      dataProcessing:
        'Raw text parsed from PDF pages is normalized (whitespace consolidation, header-footer removal). LangChain RecursiveCharacterTextSplitter generates overlapping chunks (chunk_size=1000, overlap=150) preserving semantic context.',
      modelMethodology:
        'Dense semantic vector retrieval paired with Google Gemini 1.5 Flash/Pro. Prompt instructions strictly condition the model to state if an answer cannot be determined from the provided excerpt.',
      techChoices: [
        {
          technology: 'FAISS (Facebook AI Similarity Search)',
          rationale: 'High-speed, memory-efficient vector indexing without requiring an external hosted vector database.',
        },
        {
          technology: 'Google Gemini API',
          rationale: 'Long context capability, strong reasoning capabilities, and economical token throughput.',
        },
        {
          technology: 'LangChain Orchestration',
          rationale: 'Modular pipeline for chain-of-thought, document loading, and conversational memory abstraction.',
        },
      ],
      evaluationAndLimitations:
        'Retrieval quality depends heavily on PDF text extraction fidelity (scanned non-OCR PDFs need prior OCR processing). Demo displays an authentic document Q&A interaction with clear demo labeling.',
      flowSteps: [
        {
          step: '01',
          title: 'Document Upload & Extraction',
          description: 'PDF is uploaded and raw text blocks are extracted page by page.',
        },
        {
          step: '02',
          title: 'Semantic Chunking & Embedding',
          description: 'Document is segmented into overlapping chunks and converted to dense vector embeddings.',
        },
        {
          step: '03',
          title: 'Vector Indexing (FAISS)',
          description: 'Chunks are indexed in a high-speed similarity matrix for nearest-neighbor search.',
        },
        {
          step: '04',
          title: 'Contextual Generation & Citation',
          description: 'Relevant chunks are passed to Gemini with a grounded prompt to return answers with source references.',
        },
      ],
    },
  },
];
