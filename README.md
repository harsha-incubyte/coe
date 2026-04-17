# Centre of Excellence - Incubyte Katas

This project is a collection of React + TypeScript Katas, developed following strict **Test-Driven Development (TDD)** principles. Each day represents a new challenge and a step forward in mastering modern web development.

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize Mock Service Worker (MSW):
   ```bash
   npx msw init public/ --save
   ```

### Running the Project
- **Development Server**: `npm run dev`
- **Run Tests**: `npm run test`
- **Linting**: `npm run lint`
- **Accessibility Audit**: `npm run test:a11y:ci`
- **Full Quality Check**: `npm run test:all` (Lints + Unit Tests + E2E + Pa11y)

## 🛠 Project Architecture

The application is designed to showcase daily progress. Each "Day" is isolated within its own directory under `src/pages/`, containing its components, styles, and tests.

### Directory Structure
```text
src/
├── components/     # Shared UI components (Atomic + Patterns like Wizard)
├── hooks/          # Domain-agnostic utility hooks (Wizard, LocalStorage)
├── layouts/        # Page layouts (e.g., MainLayout with Navbar)
├── lib/            # External library configurations (MSW, etc.)
├── pages/          # Daily Kata challenges (Day01 - Day07)
├── setupTests.ts   # Vitest setup
└── main.tsx        # Application entry point with MSW init
```

## 🧪 Testing Strategy (TDD)

We follow a strict **Red-Green-Refactor** cycle using standardized commit markers (🔴, 🟢, ♻️, ⚙️). Our testing stack includes:

- **Unit Testing (Vitest + React Testing Library)**: For isolated component logic and DOM state verification.
- **End-to-End Testing (Cypress)**: For verifying critical user journeys (e.g., Auth flow, Weather search).
- **API Mocking (Mock Service Worker)**: To intercept and mock network requests in both unit and E2E environments.
- **Automated Accessibility Auditing**:
  - **`jest-axe`**: Integrated into component unit tests to catch structural A11y issues early.
  - **`cypress-axe`**: Dynamic E2E auditing to catch regressions during interaction (e.g., expanded dropdowns).
  - **`Pa11y`**: Global, URL-based accessibility auditing against WCAG 2.1 AA standards, integrated into the CI pipeline.
- **Manual Sanity Checks**: Verification of WCAG AA Contrast (4.5:1 ratio) and Mobile Touch Targets (min 44x44px hit area).

## 🤖 Continuous Integration (GitHub Actions)

This project uses GitHub Actions to ensure code quality on every push and pull request. The workflow includes:
- **Build**: Verifies that the application compiles correctly.
- **Lint**: Ensures code follows ESLint standards.
- **Test**: Runs all unit tests with Vitest.
- **E2E**: Executes Cypress end-to-end tests.
- **A11y**: Performs a full site accessibility audit using Pa11y.

## 📅 Daily Progress

### Day 01: The Basics
- **FizzBuzz**: Implementation of the classic logic kata.
- **Counter**: A simple state management component.
- *Focus*: Vitest setup and `@testing-library/react` basics.

### Day 02: Forms & Weather Dashboard
- **Login Form**: A validated form with MSW integration and auto-redirect logic.
- **Weather Dashboard**: A premium interface featuring debounced search (300ms) and local storage persistence.
- *Focus*: Custom hooks, MSW API simulation, and Cypress E2E testing.

### Day 03: Semantic Audit & Accessibility
- **Semantic Refactor**: Replaced generic "div soup" with semantic HTML5 elements.
- **A11y Enhancements**: Implemented "Skip to Content" links and fully keyboard-accessible search bars (WCAG AA).
- *Focus*: Focus management, ARIA patterns, and semantic document structure.

### Day 04: ARIA Patterns & Reusable Components
- **Accessible Modal**: A decoupled, headless modal with focus trapping, focus restoration, and Escape key handling.
- **ARIA Live Regions**: Implementation of a global announcement hub to compare `polite` vs `assertive` live intensities.
- **Polymorphic Components**: Building reusable, type-safe atomic components (Button, Input).
- *Focus*: Focus trapping, focus restoration, ARIA dialog patterns, and live region announcements.

### Day 05: Automation & UI Sanity
- **Automated A11y**: Integration of `jest-axe` for unit tests and `cypress-axe` for dynamic E2E flow verification.
- **Touch Targets**: Standardized all interactive elements (buttons, links, triggers) to a minimum **44x44px** hit area.
- **Contrast Polish**: Optimized color contrast for all critical UI elements (errors, primary actions) to ensure passing WCAG 4.5:1 ratio on dark backgrounds.
- *Focus*: Automated accessibility auditing, mobile ergonomics, and WCAG compliance.

### Day 06: Performance & Headless Architecture
- **Multi-Step Configuration Wizard**: A complex, high-performance dashboard view for device onboarding.
- **Split Context Pattern**: Implementation of a performance-first state management pattern, decoupling "Navigation State" from "Domain Data" to eliminate redundant re-rendering of control buttons.
- **Headless Component Logic**: Refactored core navigation into generic, domain-agnostic hooks (`useStepNavigation`) and components, allowing the Wizard logic to be reused across different domains.
- **Auth Protection (HOC)**: Created a reusable `withAuth` Higher-Order Component to standardize route protection and dynamic redirection logic across the app.
- *Focus*: Performance optimization (Split Context), Headless Architecture, and Higher-Order Components.

### Day 07: State Management & Data Fetching
- **Zustand Store**: Centralized client-side state management for authentication with persistent storage (replacing manual `localStorage` hooks).
- **React Query Integration**: Robust server state management with automatic caching, background refetching, and standardized loading/error handling.
- **Optimistic Task Board**: Implementation of a task management system featuring optimistic UI updates for real-time responsiveness and error recovery.
- *Focus*: Decoupling client vs. server state, cache synchronization, and advanced TDD patterns for asynchronous data.

## 📝 TODOs

- [ ] **Internationalization (i18n)**: Implement support for multiple languages using a framework like `react-i18next`. Ensure all static text, date formats, and accessibility labels are localized.
- [ ] **Shared Theme System**: Standardize all color tokens and spacing into a centralized CSS variable system to remove ad-hoc styling.

---
*Created with ❤️ by Harsha at Incubyte*
