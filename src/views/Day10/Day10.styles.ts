import styled, { keyframes } from 'styled-components';
import { colors, spacing, borderRadius, shadows, typography } from '@/design-system/tokens';

export const SidebarContainer = styled.aside`
  width: 280px;
  background-color: ${colors.surface};
  border-right: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;

  @media (max-width: 768px) {
    width: 0;
    overflow: hidden;
    border-right: none;
  }
`;

export const SidebarHeader = styled.div`
  padding: ${spacing.lg};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: ${colors.primary[600]}1A;
    color: ${colors.primary[300]};
    border: 1px solid ${colors.primary[500]}33;
    padding: ${spacing.xs} ${spacing.md};
    border-radius: ${borderRadius.full};
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.semibold};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${colors.primary[600]}33;
      transform: translateY(-1px);
    }
  }
`;

export const SearchWrapper = styled.div`
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 1px solid ${colors.border};

  /* Override SearchBar internal styles for sidebar compactness */
  form {
    padding: ${spacing.xs} ${spacing.sm};
    border-radius: ${borderRadius.lg};
    border-width: 1px;
  }

  input {
    padding: ${spacing.xs} ${spacing.sm};
    font-size: ${typography.fontSize.sm};
  }

  button {
    width: 32px;
    height: 32px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const ConversationListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.md};

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.border};
    border-radius: 10px;
  }
`;

export const ConversationItem = styled.div<{ $isActive?: boolean }>`
  width: 100%;
  text-align: left;
  padding: ${spacing.md};
  background-color: ${(props) => (props.$isActive ? colors.surfaceLight : 'transparent')};
  border: none;
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  margin-bottom: ${spacing.xs};
  color: ${(props) => (props.$isActive ? colors.text : colors.textSecondary)};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  position: relative;

  &:hover {
    background-color: ${colors.surfaceLight};
    color: ${colors.text};
  }

  ${(props) => props.$isActive && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 3px;
      background-color: ${colors.primary[500]};
      border-radius: 0 4px 4px 0;
    }
  `}

  &:hover {
    padding-right: 40px;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: ${spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  color: ${colors.textMuted};
  border: none;
  padding: ${spacing.xs};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &:hover {
    color: ${colors.error};
    background-color: ${colors.error}1A;
  }

  ${ConversationItem}:hover & {
    opacity: 1;
  }
`;

export const ConversationTitle = styled.span`
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ConversationSubtitle = styled.span`
  font-size: ${typography.fontSize.xs};
  color: ${colors.textMuted};
  display: block;
`;

export const SettingsPanel = styled.div`
  padding: ${spacing.lg};
  border-top: 1px solid ${colors.border};
  background-color: ${colors.surface};
`;

export const ChatMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  position: relative;
  height: 100%;
  overflow: hidden;
`;

export const ChatHeader = styled.header`
  padding: ${spacing.md} ${spacing.xl};
  border-bottom: 1px solid ${colors.border};
  background-color: rgba(2, 6, 23, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MessageListContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  
  /* Remove scrollbar from container as Virtuoso handles it */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ErrorText = styled.span`
  color: ${colors.error};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

export const MessageWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: ${spacing.lg};
  padding: 0 ${spacing.xl};
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

export const MessageBubble = styled.div<{ $isUser: boolean; $isError?: boolean }>`
  max-width: 80%;
  padding: ${spacing.md} ${spacing.lg};
  border-radius: 1.25rem;
  background: ${(props) =>
    props.$isError 
      ? `linear-gradient(135deg, ${colors.error}15, ${colors.error}25)` 
      : props.$isUser 
        ? `linear-gradient(135deg, ${colors.primary[600]}, ${colors.primary[700]})` 
        : colors.surfaceLight};
  color: ${(props) => (props.$isUser ? colors.white : colors.text)};
  border: ${(props) => (props.$isError ? `1px solid ${colors.error}4D` : 'none')};
  box-shadow: ${shadows.md};
  line-height: ${typography.lineHeight.relaxed};
  position: relative;

  /* Border radius logic for sleek look */
  ${(props) => props.$isUser ? `
    border-bottom-right-radius: 0.25rem;
  ` : `
    border-bottom-left-radius: 0.25rem;
  `}
`;

export const MessageMeta = styled.div`
  font-size: ${typography.fontSize.xs};
  color: ${colors.textMuted};
  margin-top: ${spacing.xs};
  display: flex;
  gap: ${spacing.sm};
  align-items: center;
  padding: 0 ${spacing.xs};
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${colors.error};
  font-size: ${typography.fontSize.xs};
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-weight: ${typography.fontWeight.medium};

  &:hover {
    color: ${colors.error};
    opacity: 0.8;
  }
`;

export const InputAreaContainer = styled.div`
  padding: ${spacing.lg} ${spacing.xl};
  background-color: ${colors.background};
  border-top: 1px solid ${colors.border};
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;

export const InputWrapper = styled.div<{ $hasError?: boolean }>`
  display: flex;
  align-items: flex-end;
  background-color: ${colors.surface};
  border-radius: 1.5rem;
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${(props) => (props.$hasError ? colors.error : colors.border)};
  box-shadow: ${shadows.lg};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus-within {
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 2px ${colors.primary[500]}33, ${shadows.xl};
    background-color: ${colors.surfaceLight};
  }
`;

export const StyledTextarea = styled.textarea`
  flex: 1;
  border: none;
  background: transparent;
  padding: ${spacing.sm};
  resize: none;
  max-height: 200px;
  color: ${colors.text};
  font-family: inherit;
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.normal};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${colors.textMuted};
  }
`;

export const SendButton = styled.button`
  background-color: ${colors.primary[600]};
  color: ${colors.white};
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${colors.primary[500]};
    transform: scale(1.05);
    box-shadow: 0 4px 12px ${colors.primary[600]}66;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background-color: ${colors.neutral[700]};
    color: ${colors.neutral[500]};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: translateY(0);
  } 
  40% { 
    transform: translateY(-6px);
  }
`;

export const TypingDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${colors.primary[400]};
  animation: ${bounce} 1.4s infinite ease-in-out both;
  margin-right: 4px;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
  &:nth-child(3) {
    margin-right: 0;
  }
`;

export const TypingIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${spacing.sm} ${spacing.xl};
  color: ${colors.textSecondary};
  font-size: ${typography.fontSize.sm};
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;

export const ScrollNudge = styled.button<{ $visible: boolean }>`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%) translateY(${(props) => (props.$visible ? '0' : '20px')});
  background-color: ${colors.white};
  color: ${colors.primary[600]};
  border: 2px solid ${colors.primary[500]};
  border-radius: ${borderRadius.full};
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
  opacity: ${(props) => (props.$visible ? '1' : '0')};
  pointer-events: ${(props) => (props.$visible ? 'all' : 'none')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 20;

  &:hover {
    background-color: ${colors.primary[50]};
    transform: translateX(-50%) translateY(-2px);
    border-color: ${colors.primary[400]};
    box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: translateX(-50%) scale(0.95);
  }


  svg {
    width: 24px;
    height: 24px;
  }
`;

export const TemplateSelectorContainer = styled.div`
  display: flex;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  overflow-x: auto;
  background: rgba(2, 6, 23, 0.4);
  border-bottom: 1px solid ${colors.border};
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.border};
    border-radius: 10px;
  }
`;

export const TemplateCard = styled.button<{ $isActive: boolean }>`
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  padding: ${spacing.md};
  background: ${(props) => (props.$isActive ? `${colors.primary[600]}33` : colors.surface)};
  border: 1px solid ${(props) => (props.$isActive ? colors.primary[500] : colors.border)};
  border-radius: ${borderRadius.xl};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  color: ${colors.text};

  &:hover {
    background: ${(props) => (props.$isActive ? `${colors.primary[600]}44` : colors.surfaceLight)};
    transform: translateY(-2px);
    border-color: ${(props) => (props.$isActive ? colors.primary[400] : `${colors.primary[500]}66`)};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TemplateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize.sm};
`;

export const TemplateIcon = styled.span`
  font-size: 1.5rem;
`;

export const TemplateDescription = styled.p`
  font-size: ${typography.fontSize.xs};
  color: ${colors.textMuted};
  line-height: 1.4;
`;

export const InputErrorText = styled.span`
  font-size: 11px;
  color: ${colors.error};
`;

export const TokenInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${spacing.xs};
  width: 100%;
  min-height: 16.5px;
`;

export const CostBadge = styled.span`
  font-size: 0.65rem;
  padding: 2px 6px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: ${borderRadius.sm};
  color: ${colors.primary[400]};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: 0.025em;
  text-transform: uppercase;
  margin-left: ${spacing.xs};
`;

export const SourcesPanel = styled.div`
  margin-top: ${spacing.sm};
  max-width: 80%;
`;

export const SourcesToggle = styled.button`
  background: none;
  border: none;
  color: ${colors.textMuted};
  font-size: ${typography.fontSize.xs};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.textSecondary};
  }
`;

export const SourcesList = styled.ol`
  list-style: none;
  padding: 0;
  margin: ${spacing.xs} 0 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  border-left: 2px solid ${colors.border};
  padding-left: ${spacing.md};
`;

export const SourceItem = styled.li`
  font-size: ${typography.fontSize.xs};
  line-height: 1.5;
`;

export const SourceLink = styled.a`
  color: ${colors.primary[400]};
  text-decoration: none;
  font-weight: ${typography.fontWeight.semibold};

  &:hover {
    text-decoration: underline;
    color: ${colors.primary[300]};
  }
`;

export const SourceMeta = styled.span`
  color: ${colors.textMuted};
`;
