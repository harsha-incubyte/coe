# Implementation Plan: Day 06 Advanced React Patterns

This plan details the implementation of Day 06 KATAs, combining them into a cohesive Dashboard that showcases the compound tab pattern, split-context performance patterns, authentication HOCs, and React lazy loading—while reusing the Day 02 Login Form.

## User Review Required

> [!IMPORTANT]
> The `LoginForm` from Day 02 currently has a hardcoded redirect to `/day-02/weather`. To reuse it effectively, we will modify it to accept an optional `redirectPath` prop (defaulting to `/day-02/weather` to preserve Day 02 behavior). The HOC `withAuth` will use it with `redirectPath="/day-06"`.
> 
> The KATA requires a mock heavy component. We will introduce an artificial delay (or a loop) inside `RealTimeDataChart` to simulate heaviness.

## Proposed Changes

### 1. Refactor Day 02 LoginForm

Update the `LoginForm` to allow configurable redirection so it can function as the Day 06 fallback UI without pulling the user back into Day 02 routes.

#### [MODIFY] [LoginForm.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day02/LoginForm/LoginForm.tsx)
- Add `redirectPath?: string` to `LoginFormProps`.
- Update `useEffect` and successful login handlers to navigate to `redirectPath || '/day-02/weather'`.

---

### 2. Kata 4: Performance Boundaries & Code Splitting

Create a computationally heavy component that simulates rendering a large quantity of data, and prepare a Spinner for the Suspense fallback.

#### [NEW] [RealTimeDataChart.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/RealTimeDataChart/RealTimeDataChart.tsx)
- Use `React.memo` for the export.
- Introduce an artificial block (e.g., intensive loop) or a delayed mocked API fetch to simulate heavy rendering.
- Render dummy data rows or SVG-based charts.

#### [NEW] [Spinner.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/components/Spinner/Spinner.tsx)
- A simple reusable CSS-based spinner for `Suspense` fallback.

---

### 3. Kata 2: The Multi-Step Configuration Wizard

Implement a split-context architecture to ensure that the layout or static parts of the wizard do not re-render when the state updates.

#### [NEW] [WizardContext.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/Wizard/WizardContext.tsx)
- Define `WizardStateContext` and `WizardDispatchContext`.
- Create a `wizardReducer` holding state for `step`, `deviceId`, and `networkConfig`.
- Implement `useWizardState` and `useWizardDispatch` hooks with boundary error checking.

#### [NEW] [Wizard.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/Wizard/Wizard.tsx)
- The main wizard component that provides the split contexts.
- Include a step indicator and render different step forms based on the current state.
- Include a specific `NextStepButton` component that consumes *only* `WizardDispatchContext` and logs 'Button rendered' to the console to prove it avoids re-renders.

---

### 4. Kata 1: The Compound Tabs Component

Build a reusable, flexible Compound Tabs component using Context for state management. This avoids the "God Component" pattern and ensures flexibility.

#### [NEW] [TabsContext.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/Tabs/TabsContext.tsx)
- Context to hold `activeTab` string and `setActiveTab` function.

#### [NEW] [Tabs.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/Tabs/Tabs.tsx)
- The main `Tabs` provider. Export `Tabs` and attach child components (e.g., `Tabs.List`, `Tabs.Tab`).

#### [NEW] [TabsList.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/Tabs/TabsList.tsx)
- Renders `role="tablist"` and uses keyboard arrows (Left/Right) for accessibility to move focus and activate tabs.

#### [NEW] [Tab.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/Tabs/Tab.tsx)
- Button component with active styling reading from `TabsContext`. `role="tab"`.

#### [NEW] [TabsPanels.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/Tabs/TabsPanels.tsx) & [TabsPanel.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/Tabs/TabsPanel.tsx)
- Containers for conditionally rendering active content natively based on context.

---

### 5. Kata 3: The withAuth Higher-Order Component

Create an HOC that protects the entire Day 06 Dashboard view.

#### [NEW] [withAuth.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/components/withAuth/withAuth.tsx)
- Creates `withAuth(WrappedComponent)`.
- Checks if a `token` exists in `localStorage` (mocking our auth state matching Day 02 behavior).
- If authenticated, returns `<WrappedComponent {...props} />`.
- If unauthenticated, returns the `LoginForm` (acting as KATA 3's fallback/LoginPrompt) with a `redirectPath="/day-06"`.

---

### 6. Assembly: Day 06 Dashboard

Integrate all the KATA components into the Day 06 routes layout.

#### [NEW] [Dashboard.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/Dashboard/Dashboard.tsx)
- The core view, composed entirely within `<Tabs>`.
- Tab 1 ("Device Setup"): Renders the `Wizard` component from Kata 2.
- Tab 2 ("Real-Time Telemetry"): Renders the `RealTimeDataChart` wrapped inside `React.lazy` and `<Suspense fallback={<Spinner />}>`.

#### [NEW] [index.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/index.tsx)
- Default export that applies `withAuth(Dashboard)`.

#### [MODIFY] [App.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/App.tsx) & [Navbar.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/components/Navbar/Navbar.tsx)
- Add the `Day06` routing and link entry. Ensure modern top-level imports.

## Open Questions

- We're utilizing `localStorage.getItem('token')` as the mock auth state for `withAuth` rather than a hard-coded `const isAuthenticated = false` to keep navigation clean and leverage the Day 02 login capabilities natively. Is this acceptable for resolving KATA 3?

## Verification Plan

### Automated Tests
- Type checking (`npx tsc --noEmit`) to ensure compound components and proper contexts are exported and consumed properly.
- Run UI visually in local setup (`npm run dev`).

### Manual Verification
- **KATA 1:** Render the dashboard and verify keyboard accessibility between tabs. Check `role` attributes and aria accessibility.
- **KATA 2:** Complete the multi-step configuration wizard. Open DevTools console and observe that "Button rendered" is NOT triggered on every form keystroke, proving split-context efficiency.
- **KATA 3:** Clear `localStorage`. Access `/day-06` and observe redirection/rendering to the Login Form. Perform login and observe redirection back to the Dashboard.
- **KATA 4:** Switch to the "Real-Time Telemetry" tab. Observe the suspense Spinner loading before showing the mock heavy component. Inspect network payload capabilities if lazy loading operates separately.
