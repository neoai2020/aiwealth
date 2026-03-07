# AI WEALTH OS 🤖

AI Wealth OS is a futuristic, high-performance dashboard designed to automate and manage affiliate marketing bridges. It features a premium "dark mode" aesthetic with neon accents, real-time analytics, and automated traffic generation tools.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [Supabase](https://supabase.com/)
- **Deployment:** GitHub Pages (Static Export)

## 📂 Project Structure

The project follows a feature-based architecture within the `components` directory:

```
ai-wealth/
├── app/                  # Next.js App Router pages
│   ├── (dashboard)/      # Protected dashboard routes (layout with sidebar)
│   └── api/              # API routes (for traffic/comment generation)
├── components/
│   ├── analytics/        # Charting and stats components
│   ├── bridges/          # Bridge management cards and lists
│   ├── dashboard/        # Main command center widgets
│   ├── layout/           # Sidebar, TopBar, Global Layout components
│   ├── sync/             # "Neural Sync" wizard components
│   └── ui/               # Reusable UI atoms (Buttons, GlassPanels, etc.)
└── lib/
    ├── supabase.ts       # Supabase client configuration
    └── utils.ts          # Helper functions (clsx, etc.)
```

## 🛠️ Key Features

1.  **Command Center:** Central hub for tracking earnings, traffic, and system status.
2.  **Neural Sync Wizard:** A step-by-step wizard to configure new affiliate assets.
3.  **Bridge Analytics:** Interactive SVG charts and real-time metrics for each asset.
    - *Note:* Analytics use query parameters (`?id=xyz`) to support static export.
4.  **Traffic Hub:** Automated tool to find niche blogs and generate AI comments for outreach.
    - Connected to Supabase `bridges` table.

## ⚡ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ai-wealth.git
    cd ai-wealth
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file with your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🚀 Deployment

This project is configured for static export to **GitHub Pages**.

To deploy updates:
```bash
npm run deploy
```
This command runs `next build` (outputting to `out/`) and pushes the directory to the `gh-pages` branch.

## 📝 Developer Notes

- **Static Export:** The project uses `output: export` in `next.config.ts`. Avoid using dynamic routes like `[id].tsx` without `generateStaticParams`. Use query parameters instead.
- **Tailwind v4:** We are using the latest Tailwind version. No `tailwind.config.js` is needed; configuration is in `global.css`.
