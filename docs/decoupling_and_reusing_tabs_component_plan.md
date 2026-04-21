# Implementation Plan - Decoupling and Reusing Tabs Component

The goal is to extract the functional logic of the `Tabs` component from `Day06` into a reusable component, similar to how the `Wizard` component was decoupled. This improves modularity and allows the `Tabs` functionality to be used across the application (e.g., in the `Weather` component).

## User Review Required

> [!IMPORTANT]
> I am proposing to move the **core functional logic** of the Tabs (state management, keyboard navigation, ARIA attributes) to `src/components/Tabs`. 
> You specifically mentioned `src/pages/Day02/Weather/components` in your request. I plan to use the generic component there to implement a tabbed interface for the Weather page (e.g., "Current" vs "Forecast"), which fulfills the "core functionality" extraction while keeping domain context in the respective pages.

## Proposed Changes

### Generic Components

#### [NEW] [Tabs/index.ts](file:///Users/boorlaharshavardhana/Work/coe/src/components/Tabs/index.ts)
#### [NEW] [Tabs/Tabs.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/components/Tabs/Tabs.tsx)
#### [NEW] [Tabs/TabsList.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/components/Tabs/TabsList.tsx)
#### [NEW] [Tabs/Tab.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/components/Tabs/Tab.tsx)
#### [NEW] [Tabs/TabPanel.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/components/Tabs/TabPanel.tsx)
#### [NEW] [Tabs/TabsContext.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/components/Tabs/TabsContext.tsx)

*   This will contain the core engine (Compound Component pattern) currently in `Day06`.
*   It will be style-agnostic (providing base classes like `tabs-root`, `tabs-list`, etc. that can be styled via CSS variables or themed).

---

### Day 06 Refactor (Business Context)

#### [MODIFY] [Dashboard.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/Dashboard/Dashboard.tsx)
*   Update imports to use the generic Tabs from `@/components/Tabs`.
*   Maintain the current `Dashboard.css` styles which target the tabs.

#### [DELETE] [Day06/components/Tabs/](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day06/components/Tabs/)
*   Remove the local implementation once genericized.

---

### Day 02 Weather Refactor (Reusable Application)

#### [NEW] [WeatherTabs.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day02/Weather/components/WeatherTabs.tsx)
*   A domain-specific wrapper around `GenericTabs` for the Weather dashboard.
*   Will offer "Current Weather" and "Weekly Forecast" (mocked) views.

#### [MODIFY] [Weather.tsx](file:///Users/boorlaharshavardhana/Work/coe/src/pages/Day02/Weather/Weather.tsx)
*   Integrate `WeatherTabs` to organize the weather data display.

## Open Questions

> [!WARNING]
> You asked to extract the reusable version into `src/pages/Day02/Weather/components`. Usually, generic components live in `src/components`. 
> **Should the core generic logic live in `src/components/Tabs` (shared project-wide) or strictly within `src/pages/Day02/Weather/components/Tabs`?**
> (My recommendation is `src/components/Tabs` to match the Wizard pattern).

## Verification Plan

### Automated Tests
- Run `npm run test` to ensure existing `Tabs.test.tsx` (moved to generic folder) still passes.
- Create a new test `src/pages/Day02/Weather/Weather.test.tsx` (or update existing) to verify tab switching in Weather page.

### Manual Verification
- Verify keyboard navigation (arrows/Home/End) works on both Day02 and Day06.
- Verify ARIA labels and roles are correctly applied to the new generic version.
