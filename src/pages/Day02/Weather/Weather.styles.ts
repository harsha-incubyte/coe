import styled, { css } from 'styled-components';
import { theme } from '@/design-system/theme';

export const DashboardContainer = styled.div`
  max-width: 600px;
  margin: ${({ theme }) => theme.spacing['3xl']} auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const SearchSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SuggestionsList = styled.ul.attrs({ className: 'suggestions-list' })`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  list-style: none;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
`;

interface SuggestionItemProps {
  $isActive?: boolean;
}

export const SuggestionItem = styled.li.attrs<SuggestionItemProps>(props => ({
  className: props.$isActive ? 'active' : ''
}))<SuggestionItemProps>`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: background 0.2s;
  background: ${({ $isActive, theme }) => 
    $isActive ? `${theme.colors.primary[500]}1a` : 'transparent'};

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary[500]}0d`};
  }
`;

export const SuggestionName = styled.span.attrs({ className: 'suggestion-name' })`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

export const SuggestionMeta = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

export const WeatherOverlayData = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme }) => theme.shadows.md};
`;

export const DataHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const CityInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CityName = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  letter-spacing: -0.05em;
`;

export const CityMeta = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
`;

export const TimePill = styled.div`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background: ${({ theme }) => `${theme.colors.surfaceLight}80`};
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const DataFooter = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const TempDisplay = styled.div`
  display: flex;
  align-items: baseline;
`;

export const TempValue = styled.span`
  font-size: 6rem;
  font-weight: 950;
  line-height: 1;
`;

export const TempUnit = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  margin-left: ${({ theme }) => theme.spacing.xs};
  opacity: 0.7;
`;

const statusBase = css`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const StatusOverlay = styled.div`
  ${statusBase}
  background: ${({ theme }) => `${theme.colors.info}1a`};
  color: ${({ theme }) => theme.colors.info};
`;

export const ErrorOverlay = styled.div`
  ${statusBase}
  background: ${({ theme }) => `${theme.colors.error}1a`};
  color: ${({ theme }) => theme.colors.error};
`;

DashboardContainer.defaultProps = { theme };
SearchSection.defaultProps = { theme };
SearchContainer.defaultProps = { theme };
SuggestionsList.defaultProps = { theme };
SuggestionItem.defaultProps = { theme };
SuggestionName.defaultProps = { theme };
SuggestionMeta.defaultProps = { theme };
WeatherOverlayData.defaultProps = { theme };
DataHeader.defaultProps = { theme };
CityInfo.defaultProps = { theme };
CityName.defaultProps = { theme };
CityMeta.defaultProps = { theme };
TimePill.defaultProps = { theme };
DataFooter.defaultProps = { theme };
TempDisplay.defaultProps = { theme };
TempValue.defaultProps = { theme };
TempUnit.defaultProps = { theme };
StatusOverlay.defaultProps = { theme };
ErrorOverlay.defaultProps = { theme };
