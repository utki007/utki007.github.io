# Utkarsh Narain — Portfolio

Personal portfolio website showcasing experience, projects, education, certifications, and skills. Built with React, Vite, Tailwind CSS, and Framer Motion.

**Live site:** [https://utki007.github.io/](https://utki007.github.io/)

---

## What's on the site

### Navigation

Use the top navbar (or hamburger menu on mobile) to move between:

| Page | Description |
|------|-------------|
| **Home** | Hero intro, tagline, and "View my experience" CTA |
| **Experience** | Work history (Northwestern, Virtusa roles, Capita, Digilytics, internships) with company logos, roles, bullets |
| **Projects** | Portfolio projects with View Demo / GitHub links. Includes NAT Discord bot and Eye for the Blind |
| **Education** | Degrees from Northwestern, IIIT, VIT with GPA, coursework, and projects |
| **Skills** | Technical skills grouped by category (or by source: work, education, certifications, projects). Expandable skill cards |
| **Certifications** | Power BI, Generative AI, Oracle Java, ML courses |
| **Contact** | Email, LinkedIn, GitHub with copy-to-clipboard |

### Project demos

- **NAT (Discord Bot)** — [/#/projects/discord-bot](https://utki007.github.io/#/projects/discord-bot): Feature overview, tech stack, links to docs and source (ace repo)
- **Eye for the Blind** — [/#/projects/eye-for-the-blind](https://utki007.github.io/#/projects/eye-for-the-blind): Sample images with text-to-speech "Listen to description"

### Contact & resume

- **Footer** (on every page): Email, LinkedIn, GitHub; **View resume** (opens PDF); **Download** (resume PDF)
- **Contact page**: Same links plus copy-to-clipboard for email

### URLs

The site uses hash routing: `https://utki007.github.io/#/` for home, `/#/projects`, `/#/experience`, etc.

---

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **React Router** (HashRouter) — Client-side routing (GitHub Pages compatible)
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **Lucide React** — Icons

---

## Project Structure

```
├── public/               # Static assets (logos, resume, icons)
│   └── logos/            # Company/institution logos
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── HighlightedText.jsx
│   │   ├── WorkExperienceSection.jsx
│   │   ├── EducationSection.jsx
│   │   ├── CertificationsSection.jsx
│   │   ├── TechnicalSkillsSection.jsx
│   │   └── PersonalProjectSection.jsx
│   ├── pages/            # Route-level page components
│   ├── data/
│   │   └── index.js      # Centralized data (experience, education, projects, certifications)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/workflows/
│   └── deploy.yml        # GitHub Actions deploy to Pages
└── vite.config.js
```

---

## Development

### Prerequisites

- Node.js 18+
- npm

### Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for production

```bash
npm run build
```

Output is in `dist/`.

### Preview production build

```bash
npm run preview
```

---

## Deployment (GitHub Pages)

The site deploys to GitHub Pages automatically via GitHub Actions when pushing to `main`.

### Setup (one-time)

1. **Settings → Pages** → Set **Source** to **GitHub Actions** (not "Deploy from a branch").
2. **Settings → Actions → General** → Set **Workflow permissions** to **Read and write permissions** → Save.

### Deploy

```bash
git add .
git commit -m "Your message"
git push origin main
```

The workflow runs on each push to `main`. After it completes (~2–3 min), the site is live at [https://utki007.github.io/](https://utki007.github.io/).

### Troubleshooting: blank page

If the site loads but shows a blank page:

1. **Check Pages source** — Go to repo **Settings → Pages**. Under "Build and deployment", **Source** must be **GitHub Actions** (not "Deploy from a branch").
2. **Check workflow** — Open the **Actions** tab and confirm the last "Deploy to GitHub Pages" run succeeded.
3. **Workflow permissions** — **Settings → Actions → General** → "Workflow permissions" → **Read and write permissions** → Save.

---

## Data

All content is centralized in `src/data/index.js`:

- **EXPERIENCE** — Work history with company, role, period, skills, bullets
- **EDUCATION** — Schools, degrees, GPA, coursework, projects
- **PROJECTS** — Portfolio projects with links, demos, skills
- **CERTIFICATIONS** — Certifications with skills for the Skills section

Skills displayed on the Skills page are derived from experience, education, projects, and certifications.

---

## License

Private. All rights reserved.
