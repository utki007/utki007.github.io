# Utkarsh Narain - Portfolio (Coming Soon)

## 🚧 Website Under Construction 🚧

Hi there! 👋

I'm **Utkarsh Narain**, a passionate **Software Developer** with 5 years of experience in building web applications and software solutions. My personal portfolio is currently under construction, but I'm working hard to bring you something amazing!

### 🔨 What's Coming:
- A showcase of my projects, technologies I work with, and the solutions I've built.
- A deeper look into my development journey and my skills in various programming languages, frameworks, and tools.
- A chance to connect with me for collaborations, opportunities, and open-source contributions.

In the meantime, feel free to check out my [GitHub](https://github.com/utki007) and [LinkedIn](https://www.linkedin.com/in/utkarsh-narain/) profiles.

## 🚀 Technologies I Work With:
- **Languages & Technologies:** Python, Java, SQL, MongoDB, HTML, AngularJS, Power BI, Tableau, Django, Spring.
- **Machine Learning & AI:** Logistic Regression, Neural Networks, Deep Learning, Object Detection, Image Captioning.
- **Tools & Platforms:** Power BI, Excel, Tableau, Git, Docker, Jupyter Notebooks, Google Cloud.

## 📬 Contact Me:
- Email: [utkarshnarain007@gmail.com](mailto:utkarshnarain007@gmail.com)
- GitHub: [https://github.com/utki007](https://github.com/utki007)
- LinkedIn: [https://www.linkedin.com/in/utkarsh-narain/](https://www.linkedin.com/in/utkarsh-narain/)

### 🚧 Stay Tuned for Updates:
I'll be updating this repository and the portfolio site soon! Feel free to star the repository or follow me on my social media for updates.

---

## React portfolio (SPA)

This repo includes a single-page React app (Vite + Tailwind + Framer Motion + Lucide-React) for the portfolio.

### Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

### Build for production
```bash
npm run build
```
Output is in `dist/`.

### Deploy to GitHub Pages (why the page wasn’t loading)
The repo’s `index.html` points at `/src/main.jsx`, which only exists in development. GitHub Pages serves static files, so the live site must serve the **built** app.

1. **Use the included workflow:** In the repo go to **Settings → Pages**. Under “Build and deployment”, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
2. **Permissions:** **Settings → Actions → General** → set “Workflow permissions” to **Read and write permissions** → Save.
3. Push to `main`. The “Deploy to GitHub Actions” workflow will run, build the app, and deploy it. After it finishes, the site at https://utki007.github.io/ should load.

Copy any existing `assets/` (icons, images) into `public/assets/` so they are included in the build.
