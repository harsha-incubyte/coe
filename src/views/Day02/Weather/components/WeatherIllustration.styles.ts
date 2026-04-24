import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export const WeatherCanvas = styled.div<{ $skyColor: string }>`
  width: 100%;
  height: 450px;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  position: relative;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  transition: background 1s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $skyColor }) => $skyColor};
`;

export const IllustrationContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const SunLayer = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

export const CloudsLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const CanvasContentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing.xl} ${theme.spacing.lg}`};
  background: linear-gradient(
    to top, 
    ${({ theme }) => theme.colors.surface} 0%, 
    ${({ theme }) => `${theme.colors.surface}66`} 60%, 
    transparent 100%
  );
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

WeatherCanvas.defaultProps = { theme };
CanvasContentOverlay.defaultProps = { theme };
