import { colors, spacing, typography, shadows, borderRadius, zIndices } from '@/design-system/tokens';

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  zIndices,
} as const;

export type Theme = typeof theme;

// Declarations for styled-components to use our custom theme type
import 'styled-components';

declare module 'styled-components' {
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
