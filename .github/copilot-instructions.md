# GitHub Copilot Instructions

## Project Overview

**AWS Certified Cloud Practitioner Exam Prep App** is a modern interactive web application that helps users practice for the AWS Certified Cloud Practitioner certification exam. It features domain-specific practice tests, full 90-minute exam simulations with immediate feedback, performance analytics, and an interactive concept map for studying AWS topics.

The app supports:
- 4 domain mastery tests (30 questions each)
- Full exam simulation (65 questions in 90 minutes)
- Score tracking and performance analysis
- Dark/light theme support
- Responsive mobile-first design

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19.2 with Vite 7.2 (ESM modules) |
| **Styling** | Tailwind CSS 4.1 with PostCSS 8.5 |
| **Icons** | Lucide React 0.562 |
| **Build Tool** | Vite with React plugin |
| **Linting** | ESLint 9.39 with React hooks/refresh plugins |
| **Deployment** | Docker (multi-stage build), docker-compose |
| **Node.js** | 18+ LTS required |

## Project Structure

```
src/
├── App.jsx              # Main app component with quiz logic
├── App.css              # Base styles (mostly Tailwind overrides)
├── main.jsx             # React entry point with ThemeProvider
├── index.css            # Global styles (importing Tailwind directives)
├── components/
│   ├── Menu.jsx         # Main menu with tabs (tests, concept map, info)
│   ├── Header.jsx       # Top navigation and timer
│   ├── QuestionPanel.jsx # Question display and answer selection
│   ├── Sidebar.jsx      # Progress/results sidebar
│   ├── Result.jsx       # Score summary and domain breakdown
│   ├── ConceptMap.jsx   # Embedded concept map viewer
│   └── Footer.jsx       # Footer with links
├── context/
│   └── ThemeContext.jsx # Dark/light theme state management
├── data/
│   └── questions.js     # Question bank (3457 lines, 300+ questions, 4 domains)
└── utils/
    └── helpers.js       # formatTime(), shuffle(), calculateScore()
```

## Key Implementation Details

### Quiz State Management
- Questions are shuffled using Fisher-Yates algorithm
- Multiple-choice options are re-shuffled per question for randomization
- User answers stored as arrays of indices (supports multi-select)
- Score calculation: 100 + (correctCount / 50) × 900 (AWS format, max 1000)
- 90-minute timer (5400 seconds) with countdown

### Question Data Structure
```javascript
{
  id: number,
  domain: 1-4,
  text: string,
  options: string[],
  correct: number[],      // Array of correct option indices
  type: "single" | "multiple",
  explanation: string
}
```

### Theme System
- Theme state persisted to localStorage
- CSS class `dark` added to document root when dark mode enabled
- Tailwind dark mode utilities available via `dark:` prefix

### Build Configuration
- **Base path:** `/projects/aws-cloud-practitioner-exam-prep-app/` (Vite config)
- **Output:** `dist/` folder
- **Dev server:** http://localhost:5173
- **Production:** HTTP server required for SPA routing

## Coding Guidelines

### React & JSX
- Use functional components and hooks
- Import `useContext` for theme, `useState`/`useEffect` for state
- Variable names like `isDarkMode`, `toggleTheme` (not single letters)
- Rules of hooks: dependencies must be correct, no conditionals

### Styling
- **Use Tailwind CSS first** - avoid inline styles
- Custom brand color: `brand-orange: #f97316`
- Dark mode: prefix Tailwind classes with `dark:`
- Font: Inter from Google Fonts (already linked in index.html)

### Linting Rules
- ESLint configured with React hooks and React Refresh plugins
- Unused variables rule: `varsIgnorePattern: '^[A-Z_]'` (constants ok)
- Target: ES2020 with JSX support
- Run `npm run lint` before committing

### File Naming
- Components: PascalCase (e.g., `QuestionPanel.jsx`)
- Utilities/helpers: camelCase (e.g., `helpers.js`)
- CSS: use Tailwind; rarely create new CSS files

## Development Workflow

### Setup
```bash
npm install          # Install all dependencies
npm run dev         # Start Vite dev server (http://localhost:5173)
npm run build       # Build for production
npm run lint        # Check code quality
npm run preview     # Preview production build locally
```

### Docker
```bash
docker-compose up   # Build and run the app (port 5173)
docker-compose down # Stop containers
```

### Important Notes
- **dev command:** Uses Vite dev server with hot module reload - use this for development
- **build command:** Creates optimized production build in `dist/`
- **No backend:** This is a front-end only app with static question data in `questions.js`
- **localStorage:** Used for theme preference and test performance history
- **No API calls:** All data is client-side

## Common Tasks

### Adding Questions
1. Edit `src/data/questions.js`
2. Add object to appropriate domain array with correct structure
3. Test by running `npm run lint` (should pass)
4. Verify in `QUESTION_BANK` export and domain counts

### Styling Changes
1. Use Tailwind utilities in JSX className attributes
2. For dark mode: add `dark:` prefix (e.g., `bg-white dark:bg-slate-900`)
3. If custom CSS needed, add to `src/App.css`
4. Test both light and dark modes

### Component Updates
1. Check component props usage in parent (e.g., Menu passes `startQuiz` to App)
2. Update dependent components if changing prop contracts
3. Test localStorage interactions if modifying quiz state
4. Run `npm run lint` after changes

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Dev server won't start | Kill existing process on port 5173; check Node.js 18+; run `npm install` |
| Lint errors | Run `npm run lint` to see full list; most React/hooks issues need specific fixes |
| Docker build fails | Run `npm ci` instead of `npm install` for clean install; check Node version in Dockerfile |
| Dark mode not persisting | Check localStorage in DevTools; ensure ThemeProvider wraps entire app |
| Styles look broken | Verify Tailwind CSS directive in `index.css`; check `tailwind.config.js` content paths |

## Standards & Patterns

- **No console.log in production code** - remove before committing
- **Comments:** Use for complex logic; avoid obvious comments
- **Commits:** Push to git; app has git history
- **Performance:** Question bank is large (3457 lines); keep component rendering efficient
- **Accessibility:** Maintain semantic HTML; icon buttons need aria-labels when no text
- **Mobile:** Design is mobile-first; test responsive breakpoints (md:)

## Additional Resources

- [AWS Certified Cloud Practitioner Study Guide](https://aws.amazon.com/certification/certified-cloud-practitioner/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [React 19 Docs](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated:** January 2026  
**App Version:** 0.0.0 (development)
