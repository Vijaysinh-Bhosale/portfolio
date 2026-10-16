# VIJAY.B — Data, Intelligence & Engineering

> **"Engineering Intelligence from Data."**  
> Personal developer portfolio of **Vijay Bhosale** — Computer Engineering Graduate (DBATU '26) | Aspiring Data Scientist & ML Engineer.

---

## 🌟 Overview & Creative Design Concept

This portfolio was designed and engineered from the ground up to reflect technical credibility, analytical depth, and software engineering discipline.

- **Palette**: Dark, high-contrast charcoal (`#07090e`), crisp off-white typography, and electric cyan/blue data accents.
- **Hero Network Canvas**: High-performance HTML5 Canvas rendering connected neural/data graph nodes responding gently to pointer displacement with full `prefers-reduced-motion` compliance.
- **Authentic Hero Terminal**: Real Python code snippets showcasing time-series optimization, Random Forest with SHAP local explainability, and LangChain RAG pipelines.
- **Interactive Case Studies**: Built-in interactive demonstrations for all featured projects with responsive Recharts data visualizations.
- **Zero Fabrication**: Clear demarcation between verified academic credentials (DBATU, 7.24 CGPA) and configurable placeholders (`[ADD_...]`) for contact URLs and resumes.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Core Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) with custom dark tokens |
| **Data Visualization** | [Recharts](https://recharts.org/) (Interactive price charts, telemetry graphs & SHAP attributions) |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom SVG Monograms |
| **Typography** | Inter & JetBrains Mono (Google Fonts) |
| **Linter** | [Oxlint](https://oxc.rs/) |

---

## 📂 Project Architecture

```text
c:\Users\LENOVO\Desktop\Vijay_Portfolio_g\
├── public/
│   ├── favicon.svg          # Custom 'VB.' monogram SVG icon
│   ├── robots.txt           # SEO indexing rules
│   └── _redirects           # SPA routing fallback for Netlify & Cloudflare
├── src/
│   ├── components/
│   │   ├── demos/
│   │   │   ├── Crop2MarketDemo.tsx          # Interactive commodity forecasting & mandi ranking
│   │   │   ├── PredictiveMaintenanceDemo.tsx # Real-time sensor telemetry & SHAP attribution
│   │   │   └── ChatPdfDemo.tsx              # Vector similarity & grounded RAG inspector
│   │   ├── Navbar.tsx                       # Sticky navigation with active spy & mobile menu
│   │   ├── Hero.tsx                         # Primary headline, CTAs, & coordinate system
│   │   ├── HeroNetworkCanvas.tsx            # Lightweight interactive data-network canvas
│   │   ├── HeroTerminal.tsx                 # Authentic Python pipeline code tabs
│   │   ├── About.tsx                        # Engineering mindset & 3 guiding principles
│   │   ├── Skills.tsx                       # Interactive category tabs & skill breakdown
│   │   ├── Projects.tsx                     # Selected work grid with featured emphasis
│   │   ├── ProjectCard.tsx                  # Modular project card with tags & actions
│   │   ├── ProjectModal.tsx                 # Full-screen case study dossier & architecture flow
│   │   ├── Education.tsx                    # DBATU academic foundation & milestone policy
│   │   ├── Contact.tsx                      # Validated form with mail client draft generator
│   │   ├── Footer.tsx                       # Wordmark, copyright, and back-to-top
│   │   ├── ResumeNoticeModal.tsx            # Transparent configuration guide for resume PDF
│   │   └── Icons.tsx                        # Custom SVG icons (GitHub, LinkedIn)
│   ├── data/
│   │   ├── profile.ts                       # Central personal details, links, and principles
│   │   ├── skills.ts                        # Editable skill categories and competencies
│   │   └── projects.ts                      # Case study datasets, architectures, and flows
│   ├── types/
│   │   └── index.ts                         # Strict TypeScript domain interfaces
│   ├── utils/
│   │   └── cn.ts                            # Tailwind class merge helper
│   ├── App.tsx                              # Application root orchestrator
│   ├── main.tsx                             # React 19 entry point
│   └── index.css                            # Tailwind directives & accessibility rules
├── .env.example                             # Environment variable template
├── vercel.json                              # Vercel SPA rewrite configuration
├── tailwind.config.js                       # Tailwind design system configuration
└── vite.config.ts                           # Vite configuration with chunk splitting
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v18+` (Tested on `v24.13.1`)
- npm `v9+` (Tested on `11.8.0`)

### Installation & Execution

1. **Clone or navigate into the repository**:
   ```bash
   cd c:\Users\LENOVO\Desktop\Vijay_Portfolio_g
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Run the production build & verify chunks**:
   ```bash
   npm run build
   ```

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

6. **Run linter**:
   ```bash
   npm run lint
   ```

---

## ⚙️ Customization & Updating Profile Information

All content is structured within central, typed data configuration files. No need to rewrite JSX components to modify your information!

### 1. Personal & Contact Information (`src/data/profile.ts`)
Replace placeholders with your live links:
```typescript
contact: {
  email: 'vijaybhosale@example.com',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-profile',
  resumeUrl: '/resume-vijay-bhosale.pdf', // Place PDF in public/ folder
}
```

### 2. Linking Your Resume PDF
1. Save your resume as `resume.pdf` inside `public/`.
2. In `src/data/profile.ts`, set:
   ```typescript
   resumeUrl: '/resume.pdf'
   ```
When configured, clicking **"Download Resume"** or **"Resume"** directly opens your document.

### 3. Adding or Updating Technical Skills (`src/data/skills.ts`)
Add items to the category array:
```typescript
{ name: 'PyTorch', description: 'Deep learning neural models', highlight: true }
```

### 4. Adding or Updating Projects (`src/data/projects.ts`)
Each project record supports detailed system architecture steps, technology trade-offs, and live demo toggles.

---

## 🌐 Deployment Instructions

This project compiles to pure, optimized static assets (`HTML`, `CSS`, `JS`) in `dist/`, making it instantly deployable to any modern edge hosting service.

### Option A: Deploy to Vercel (Recommended)
1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio release"
   git remote add origin https://github.com/<your-username>/vijay-portfolio.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **"Deploy"**. The included `vercel.json` guarantees automatic SPA routing.

### Option B: Deploy to Netlify
1. Log into [Netlify](https://www.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
2. Select your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. The included `public/_redirects` ensures seamless client-side routing.

### Option C: Deploy to Cloudflare Pages
1. In the Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages**.
2. Connect your Git repository.
3. Select framework preset **Vite**.
4. Output directory: `dist`.
5. Deploy site.

---

## ♿ Accessibility, SEO & Performance

- **Lighthouse Performance**: Optimized chunking with vendor splitting (`vendor-react`, `vendor-charts`, `vendor-icons`).
- **Semantic HTML**: `<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` with explicit `aria-label` and `role` tags.
- **Keyboard Navigation**: Interactive modal and dialogs close on `Escape` key and maintain appropriate focus ring indicators (`focus-visible`).
- **Motion Sensitivity**: Full CSS `@media (prefers-reduced-motion: reduce)` support disables canvas velocity and smooth scrolling for users with vestibular sensitivity.
- **Zero Hallucination Policy**: Contact messages generate verifiable email drafts via standard `mailto:` protocol without fake "server success" messages.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
