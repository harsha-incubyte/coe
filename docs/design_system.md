# Design System & Theming Playbook

The application utilizes a strict **Atomic Design Methodology** integrated with `styled-components`. All styling should derive from the central theme to guarantee visual consistency and WCAG AA accessibility contrast.

## The Theme Provider

The theme is globally injected via the `<ThemeProvider>` in the layout layer. This provides all styled-components with access to the `theme` prop.

### Accessing Theme Tokens

Never hardcode colors or pixel values. Always use the theme:

```tsx
import styled from 'styled-components';

export const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
```

## Atomic Design Hierarchy

### 1. Atoms (`src/design-system/atoms/`)
The absolute foundational building blocks. They cannot be broken down further.
- **Examples:** `Button`, `Input`, `Heading`, `Checkbox`, `Text`.
- **Rule:** Atoms should have NO domain logic. They are purely presentational.

### 2. Molecules (`src/design-system/molecules/`)
Groups of atoms bonded together to form a relatively simple, functional unit.
- **Examples:** `SearchBar` (Input + Button), `Toast` (Text + Icon + Button), `Tabs`.
- **Rule:** Molecules should handle basic UI state (like dropdown visibility) but should rarely fetch their own data.

### 3. Organisms (`src/design-system/organisms/`)
Complex UI components that form distinct sections of an interface.
- **Examples:** `Wizard`, `Header`, `TaskBoard`.
- **Rule:** Organisms can be connected to the global state or pass domain data down to molecules.

## Best Practices
- **Avoid ad-hoc CSS:** If you find yourself writing custom CSS properties, check if there is an existing Atomic component or Theme token that solves the problem.
- **Storybook First:** When building a new Atom or Molecule, document it in Storybook (`npm run storybook`) and test it in isolation before integrating it into a Page.
- **Polymorphism:** Use the `as` prop provided by styled-components to change the underlying HTML element while keeping the styling (e.g., rendering a `<Button>` as an `<a>` tag for accessibility).
