import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming',
    description: 'Core languages for algorithm design, data structures, and pipeline scripting.',
    skills: [
      { name: 'Python', description: 'Primary language for data manipulation, ML workflows, and backend logic', highlight: true },
      { name: 'SQL', description: 'Complex querying, joins, aggregations, schema design, and indexing', highlight: true },
    ],
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    description: 'Transforming unstructured and tabular data into actionable statistical patterns.',
    skills: [
      { name: 'Pandas', description: 'Data wrangling, indexing, merging, and reshaping large tabular datasets', highlight: true },
      { name: 'NumPy', description: 'Vectorized mathematical operations, multi-dimensional array processing' },
      { name: 'Data Cleaning', description: 'Handling missing values, outlier detection, data normalization' },
      { name: 'Exploratory Data Analysis', description: 'Univariate, bivariate analysis, correlation matrices, distribution profiling' },
      { name: 'Data Visualization', description: 'Matplotlib, Seaborn, interactive charting and dashboard reporting' },
    ],
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Supervised and unsupervised statistical learning models for predictive intelligence.',
    skills: [
      { name: 'Scikit-learn', description: 'Pipelines, model selection, cross-validation, and metrics', highlight: true },
      { name: 'Regression & Classification', description: 'Linear models, tree ensembles (Random Forest, Gradient Boosting)' },
      { name: 'Feature Engineering', description: 'Encoding, scaling, selection, interaction terms, domain transformations' },
      { name: 'Model Evaluation', description: 'Precision, recall, F1-score, ROC-AUC, confusion matrices, cross-validation' },
      { name: 'Time-Series Forecasting', description: 'Trend decomposition, seasonality analysis, moving averages' },
      { name: 'LSTM', description: 'Long Short-Term Memory networks for sequential and temporal pricing data' },
    ],
  },
  {
    id: 'generative-ai',
    name: 'Generative AI',
    description: 'Modern LLM orchestrations, semantic vector search, and Retrieval-Augmented Generation.',
    skills: [
      { name: 'LangChain', description: 'Prompt templating, chains, document loaders, and retrieval pipelines', highlight: true },
      { name: 'Retrieval-Augmented Generation', description: 'Grounded document question-answering with citation and context lookup', highlight: true },
      { name: 'FAISS', description: 'Facebook AI Similarity Search for dense vector indexing and cosine matching' },
      { name: 'Google Gemini API', description: 'Multimodal and text LLM inference, structured output parsing' },
    ],
  },
  {
    id: 'backend-systems',
    name: 'Backend & Data Systems',
    description: 'Constructing robust API endpoints, interactive portals, and relational database layers.',
    skills: [
      { name: 'FastAPI', description: 'Asynchronous REST APIs, Pydantic data schemas, automated OpenAPI documentation', highlight: true },
      { name: 'Flask', description: 'Lightweight WSGI routing and microservice integration' },
      { name: 'Streamlit', description: 'Rapid prototyping and interactive analytics dashboard construction', highlight: true },
      { name: 'PostgreSQL', description: 'Relational data persistence, relational integrity, relational queries' },
      { name: 'MySQL', description: 'Relational database administration and relational querying' },
      { name: 'REST APIs', description: 'Stateless HTTP design, request validation, structured JSON serialization' },
    ],
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    description: 'Productivity and version control environments for reliable collaborative engineering.',
    skills: [
      { name: 'Git', description: 'Distributed version control, branching strategies, commit history integrity' },
      { name: 'GitHub', description: 'Repository management, collaboration, issue tracking, CI integration' },
      { name: 'Jupyter Notebook', description: 'Interactive exploratory analysis, prototyping, and notebook reporting' },
      { name: 'VS Code', description: 'Primary IDE for Python, TypeScript, and full-stack development' },
    ],
  },
];
