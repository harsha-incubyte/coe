# Day 08: Component Architecture & Design Systems Foundations

This plan outlines how we will integrate Day 08 concepts into our existing application architecture. The goal is to establish a scalable foundation for a design system that can be reused across the `coe` project, and demonstrate these concepts via a showcase route (`/day08`).

## Proposed Features & Integration Strategy

### 1. Atomic Design Structure
Instead of coupling UI elements to specific feature folders, we will introduce a formalized design system directory independent of specific routes.
*   **Directory Structure**: Create `src/design-system/` to house standard UI components.
*   **Categorization**:
    *   `tokens/`: Core visual primitives (colors, typography scales, spacing).
    *   `atoms/`: Low-level base components (e.g., `Button`, `Heading`, `Input`).
    *   `molecules/`: UI combinations (e.g., `FormGroup`, `DropdownMenu`).
    *   `organisms/`: Complex functioning blocks (e.g., `ModalDialog`, `TaskCard`).

### 2. Design Tokens and Theming (Styled-components)
We need a single source of truth for visual decisions.
*   We will adopt **`styled-components`** to implement our design system. This allows us to write native CSS syntax while wrapping styles tightly within React component boundaries.
*   We will create a central `ThemeProvider` carrying a strict TS-typed `theme` object containing our design tokens (colors, typography scales, spacing).
*   Global styles (CSS reset, base font configurations) will be managed via `createGlobalStyle`.

### 3. Headless Component Architecture (Custom Implementation)
Headless architecture separates behavioral logic (state, keyboard navigation, ARIA) from visual rendering.
*   We will build custom Headless hooks (`useDropdown`, `useModal`) from scratch to fully own the logic.
*   The implementation will manually handle accessibility requirements, including focus-trapping, `Escape` key handling, forced "click-outside" closures, and proper ARIA role announcements.
*   This approach ensures our `design-system` components only handle styles and accept the decoupled headless state logic.

### 4. Component Documentation (Storybook)
*   We will install the official Storybook library (`npx storybook@latest init`) to systematically catalog our `atoms` and `molecules`.
*   Stories will serve as living documentation alongside our code.
*   **Integration Strategy**: To embed Storybook into our application UI (e.g., in `/day08`), we will use an `<iframe>` approach. In development, the iFrame will point to the local Storybook dev server. For production builds, we will output the static Storybook build into our application's `public/` directory so it serves alongside the app natively.

### 5. Accessibility (WCAG AA)
*   We will leverage our existing accessibility test tools (`jest-axe`, `cypress-axe`, `pa11y-ci`) to enforce WCAG AA standards.
*   All new design system components will have accompanying `.test.tsx` files validating their accessibility.

### 6. Day 08 Route Demonstration (`/day08`)
The Day 08 route will act as an interactive style guide within the application.
*   It will present the foundational design tokens (color palettes, font scales).
*   It will showcase live implementations of the Atomic components.
*   It will demonstrate the Headless `Dropdown` and `Modal` integrated into a practical layout.
*   It will provide a reference to the standalone Storybook instance.

---

## User Review Required
Before we finalize this plan and begin execution, please provide your preference on the following implementation details:

> [!NOTE]
> **A. CSS-in-JS Approach (RESOLVED)**
> We will use `styled-components`. It allows maintaining native CSS mental models without an extra translation layer while leveraging a centralized JS-based theme object.

> [!NOTE]
> **B. Headless UI Approach (RESOLVED)**
> We will implement the Headless logic entirely from scratch. This guarantees full code ownership and provides a deep understanding of underlying component accessibility behaviors.

> [!NOTE]
> **C. Storybook Integration (RESOLVED)**
> We will install the full Storybook library. To integrate it directly into the application, we will embed the Storybook UI using an `<iframe>` on the `/day08` route, ensuring it feels like a cohesive part of the project.
