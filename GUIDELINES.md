# Project Guidelines & Discipline

## 1. Test-Driven Development (TDD)
We follow the **Red-Green-Refactor** cycle strictly for every feature and bug fix.

- **RED (🔴):** Never write implementation code before a failing test exists. This ensures we are testing the right thing and that our requirements are clear.
- **GREEN (🟢):** Write the simplest code possible to make the test pass. Avoid "guessing" future requirements.
- **REFACTOR (♻️):** Once green, refactor the code for readability, performance, and architecture. The tests must remain green.

## 2. Commit Message Conventions
Every commit must use the appropriate TDD marker:
- 🔴 `test: ...` for a new failing test.
- 🟢 `feat: ...` or `fix: ...` for making a test pass.
- ♻️ `refactor: ...` for clean up.
- ⚙️ `chore: ...` for config or infrastructure changes.

## 3. Component Architecture
- Prioritize **Decoupled Logic**: Extract complex state or logic into custom hooks (`useWizard`, `useTabs`, etc.).
- Maintain **WCAG AA Accessibility**: All components must pass `jest-axe` audits and be keyboard navigable.

## 4. State Management
- Use **Zustand** for global client-side state (UI, Auth).
- Use **React Query** for all server-side state (Data fetching, Caching, Mutations).
- Prefer **Optimistic Updates** for a premium user experience.
