# 10-Day Planner React Application Architecture

Based on your requirements, here is a project structure designed to build a **Single Unified Web Application** as you progress through the 10 days. 

This approach uses a single overarching project (e.g., using Vite + React + TypeScript) rather than completely isolated folders for each day. It solves all three of your core requirements:
1. **Showcases Progress:** A master layout (like a sidebar dashboard) links to unique routes for each day's Katas.
2. **Maximum Reusability:** Core components (accessible buttons, hooks) are stored centrally, making them easy to import into later days.
3. **Single Application:** A complete, deployable portfolio piece that a mentor can navigate with one click.

## Proposed Directory Structure

```text
/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── cypress/               # Day 2/5: E2E Tests
├── src/
│   ├── App.tsx            # Main application router connecting all days
│   ├── main.tsx           # Entry point
│   │
│   ├── components/        # REUSABLE COMPONENTS (Built throughout the days)
│   │   ├── Button/        # Day 4: Accessible Button
│   │   ├── Modal/         # Day 4 & 8: Accessible Headless Modal
│   │   └── form/          # Day 4: Accessible Form elements
│   │
│   ├── hooks/             # REUSABLE HOOKS
│   │   └── useLocalStorage.ts # Day 2
│   │
│   ├── layouts/           # SHELL UI
│   │   └── MainLayout.tsx # Has a Sidebar navigation linking to Day 1, Day 2, etc.
│   │
│   ├── lib/               # UTILITIES & CONFIG
│   │   ├── msw/           # Day 2: Mock Service Worker setup
│   │   └── test-utils.tsx # Shared RTL testing utilities
│   │
│   ├── pages/             # DAY-BY-DAY PROGRESS (KATAS)
│   │   ├── Dashboard/     # Landing page (Welcome & Summary)
│   │   ├── Day01/
│   │   │   ├── FizzBuzz.tsx
│   │   │   ├── FizzBuzz.test.tsx
│   │   │   ├── Counter.tsx
│   │   │   └── index.tsx  # Exports everything for the Day 1 route
│   │   ├── Day02/
│   │   │   ├── Weather.tsx
│   │   │   ├── LoginFlow.tsx
│   │   │   └── index.tsx
│   │   ├── Day03/         # Nav & Layout semantic katas
│   │   ├── ...
│   │   └── Day09_10/      # Medical Chat App Assembly (consumes all `components/`)
│   │
│   ├── store/             # Day 7: Zustand stores
│   │   └── useAuthStore.ts
│   │
│   └── styles/            # Day 8: Design Tokens and Global CSS
│       └── index.css
```

---

## How It Solves Your Goals

### 1. Reflect Individual Katas/Tasks Progress
The `src/pages/DayXX` pattern isolates the *scaffolding* of specific katas. When the mentor clicks on "Day 1" in your sidebar, they will see the FizzBuzz and Counter rendering. The file structure groups related tasks per day so reviewers can examine `src/pages/Day01/FizzBuzz.test.tsx` directly.

### 2. Reuse Initial Days' Work
Instead of rewriting a dropdown or an accessible button, you build it *once* in `src/components`. 
*   On **Day 4**, you create an accessible Button component in `src/components/Button`.
*   On **Day 9**, when building the Medical Chat Application, you simply `import { Button } from '@/components/Button'` to use it.
*   The mentor sees that your fundamental accessible building blocks from earlier days dynamically construct the complex application at the end.

### 3. Single React Application
The entire structure runs under a unified router (e.g., React Router).
*   **Navigation:** You can add a `Sidebar` in `src/layouts/MainLayout.tsx` that lists `Day 1`, `Day 2`, up to `Medical Chat Project`. 
*   **Testing:** Jest/Vitest will scan `*.test.tsx` across the whole `src/` folder, meaning running `npm run test --coverage` will validate your whole 10-day journey at once. 
*   **Accessibility (A11y):** Running `Pa11y` or `cypress-axe` can traverse your single site map efficiently.
