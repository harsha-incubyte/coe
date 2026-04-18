## 1. Planning and Implementation
Every task must start with an **Implementation Plan** artifact that includes:
- **Proposed Changes:** A clear description of the files to be created or modified.
- **Committing Strategy:** A predefined sequence of incremental commits following the TDD markers (🔴, 🟢, ♻️, ⚙️).
- **User Review Required:** Any open questions or domain preferences to be confirmed before work begins.

## 2. Test-Driven Development (TDD)
We follow the **Red-Green-Refactor** cycle strictly for every feature and bug fix.

- **RED (🔴):** Never write implementation code before a failing test exists. This ensures we are testing the right thing and that our requirements are clear.
- **GREEN (🟢):** Write the simplest code possible to make the test pass. Avoid "guessing" future requirements.
- **REFACTOR (♻️):** Once green, refactor the code for readability, performance, and architecture. The tests must remain green.

## 2. Commit Message Conventions
Every commit must use the appropriate TDD marker:
- 🔴 `test: ...` for a new failing test.
- 🟢 `feat: ...` or `fix: ...` for making a test pass.
- ♻️ `refactor: ...` for clean up.
- 🎨 `style: ...` for aesthetic changes/improvements.
- ⚙️ `chore: ...` for config or infrastructure changes.

## 3. Component Architecture
- Prioritize **Decoupled Logic**: Extract complex state or logic into custom hooks (`useWizard`, `useTabs`, etc.).
- Maintain **WCAG AA Accessibility**: All components must pass `jest-axe` audits and be keyboard navigable.

## 4. State Management
- Use **Zustand** for global client-side state (UI, Auth).
- Use **React Query** for all server-side state (Data fetching, Caching, Mutations).
- Prefer **Optimistic Updates** for a premium user experience.
