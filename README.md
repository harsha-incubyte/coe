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

## 🛠 Project Architecture

The application is designed to showcase daily progress. Each "Day" is isolated within its own directory under `src/pages/`, containing its components, styles, and tests.

### Directory Structure
```text
src/
├── components/     # Shared UI components
├── layouts/        # Page layouts (e.g., MainLayout with Navbar)
├── lib/            # External library configurations (MSW, etc.)
├── pages/          # Daily Kata challenges
│   ├── Day01/      # FizzBuzz & Counter
│   └── Day02/      # LoginForm & Weather Widget
├── setupTests.ts   # Vitest setup
└── main.tsx        # Application entry point with MSW init
```

## 🧪 Testing Strategy (TDD)

We follow the **Red-Green-Refactor** cycle:
1. 🔴 **Red**: Write a failing test that defines the desired behavior.
2. 🟢 **Green**: Write the minimum code necessary to pass the test.
3. ♻️ **Refactor**: Improve the code while ensuring tests stay green.

### Mock Service Worker (MSW)
To simulate real API interactions without a backend, we use MSW.
- **Handlers**: Located in `src/lib/msw/handlers.ts`
- **Browser Usage**: The worker is initialized in `main.tsx` during development.
- **Credentials for Day 02 Login**:
  - Email: `harsha@incubyte.co`
  - Password: `password123`

## 📅 Daily Progress

### Day 01: The Basics
- **FizzBuzz**: Implementation of the classic logic kata.
- **Counter**: A simple state management component.
- *Focus*: Vitest setup and `@testing-library/react` basics.

### Day 02: Forms & Weather Dashboard
- **Login Form**: A validated form with MSW integration and auto-redirect logic.
- **Weather Dashboard**: A premium, data-rich weather interface featuring:
  - Real-time location search with debouncing (300ms).
  - Persistence of "Recent Searches" using local storage.
- **Custom Hooks**: Implementation of `useLocalStorage` for state persistence across sessions.
- **E2E Testing**: End-to-end verification of the full user journey using Cypress.
- *Focus*: Custom hooks, debounced interactions, state persistence, MSW API simulation, and Cypress E2E testing.

---
*Created with ❤️ by Harsha at Incubyte*
