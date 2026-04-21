# Day 04 Completion Plan: ARIA Patterns & Accessible Components

This plan outlines the steps to complete the Day 04 KATA by moving from local, isolated exercises to building a reusable, accessible component library that will anchor the final project.

## User Review Required

> [!IMPORTANT]
> This plan involves moving files (Decoupling) to align with the `ARCHITECTURE.md` vision. This ensures that the components built today are easily available for the Day 09/10 Medical Chat App.

> [!TIP]
> We will prioritize **Aesthetics** during this phase, ensuring that these reusable "atoms" (Buttons, Inputs) look premium and feel modern.

## Phase 1: Decoupling & Relocation
Moving existing proof-of-concept code into the global component architecture.

### [Component] Reusable Modal

#### [MODIFY] [AccessibleModal.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day04/AccessibleModal/AccessibleModal.tsx) -> [NEW] [Modal.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/components/Modal/Modal.tsx)
- Move existing logic to `src/components/Modal`.
- Enhance with `framer-motion` for professional entrance/exit animations.
- Ensure the focus trap remains robust during animations.

---

## Phase 2: Building the Accessible Atomic Library
Creating the fundamental building blocks of the application.

### [NEW] [Button Component](file:///Users/boorlaharshavardhana/Work/coe/src/components/Button/Button.tsx)
- Implement a polymorphic `Button` component.
- **A11y Features**: Correct ARIA roles, `aria-busy` for loading states, and high-contrast focus indicators.
- **Design**: Premium gradients, micro-interactions (scale on hover), and varied variants (primary, secondary, ghost).

### [NEW] [Form Elements](file:///Users/boorlaharshavardhana/Work/coe/src/components/form/Input.tsx)
- Create a reusable `Input` + `Label` + `ErrorMessage` group.
- **A11y Features**: Automatic `id` generation, `aria-invalid`, and `aria-describedby` linkage.

---

## Phase 3: Global ARIA Live System (Toast Hub)
Moving beyond basic live regions to a professional status announcement system.

### [NEW] [useToast Hook](file:///Users/boorlaharshavardhana/Work/coe/src/hooks/useToast.ts)
- A simple hook to trigger messages: `showToast("Profile Updated", "success")`.

### [NEW] [ToastContainer](file:///Users/boorlaharshavardhana/Work/coe/src/components/Toast/ToastContainer.tsx)
- A global container using `aria-live="polite"`.
- It will render multiple toasts and ensure they are read out by screen readers without stealing focus.

---

## Phase 4: UI/UX Refinement (Day 04 Page)
- Refactor `src/pages/Day04/index.tsx` to use the new atomic components.
- Apply a "Premium Dashboard" look:
    - Use Inter/Outfit fonts.
    - Implement a "Live Region Playground" where users can compare **Polite** vs **Assertive** behaviors.
    - Glassmorphism effects for the modal and toast containers.

---

## Verification Plan

### Automated Tests
- **Vitest**: Run `npm run test -- src/components` to verify shared logic.
- **Cypress**: Create `cypress/e2e/day04.cy.ts` to verify:
    - Focus trap wrapping in the Modal.
    - Focus restoration on close.
    - ARIA Live region content updates.

### Manual Verification
- Visual audit for "Wow" factor and premium aesthetics.
- Keyboard navigation check: Ensure it's possible to navigate the entire Day 04 page without a mouse.
