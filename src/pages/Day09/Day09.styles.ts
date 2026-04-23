import styled, { keyframes } from 'styled-components';
import { colors, spacing, borderRadius, shadows, typography } from '@/design-system/tokens';

export const PageContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px); /* Assuming nav bar is 64px */
  background-color: ${colors.background};
  color: ${colors.text};
`;

export const SidebarContainer = styled.aside`
  width: 300px;
  background-color: ${colors.surface};
  border-right: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: 0;
    overflow: hidden;
  }
`;

export const SidebarHeader = styled.div`
  padding: ${spacing.md};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ConversationListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.sm};
`;

export const ConversationItem = styled.button<{ $isActive?: boolean }>`
  width: 100%;
  text-align: left;
  padding: ${spacing.md};
  background-color: ${(props) => (props.$isActive ? colors.surfaceLight : 'transparent')};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  margin-bottom: ${spacing.xs};
  color: ${(props) => (props.$isActive ? colors.primary[400] : colors.textSecondary)};
  font-weight: ${(props) => (props.$isActive ? typography.fontWeight.medium : typography.fontWeight.normal)};
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${colors.surfaceLight};
    color: ${colors.text};
  }
`;

export const SettingsPanel = styled.div`
  padding: ${spacing.md};
  border-top: 1px solid ${colors.border};
  background-color: ${colors.surface};
`;

export const ChatMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  position: relative;
`;

export const ChatHeader = styled.header`
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 1px solid ${colors.border};
  background-color: rgba(2, 6, 23, 0.8); /* match background */
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MessageListContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const MessageWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: ${spacing.md};
  padding: 0 ${spacing.lg};
  width: 100%;
`;

export const MessageBubble = styled.div<{ $isUser: boolean; $isError?: boolean }>`
  max-width: 70%;
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${borderRadius.lg};
  background-color: ${(props) =>
    props.$isError ? colors.error + '20' : props.$isUser ? colors.primary[600] : colors.surfaceLight};
  color: ${(props) => (props.$isUser ? colors.white : colors.text)};
  border: ${(props) => (props.$isError ? `1px solid ${colors.error}` : 'none')};
  box-shadow: ${shadows.sm};
  line-height: ${typography.lineHeight.relaxed};
  position: relative;

  /* Border radius logic for speech bubble effect */
  border-bottom-right-radius: ${(props) => (props.$isUser ? '0' : borderRadius.lg)};
  border-bottom-left-radius: ${(props) => (!props.$isUser ? '0' : borderRadius.lg)};
`;

export const MessageMeta = styled.div`
  font-size: ${typography.fontSize.xs};
  color: ${colors.textSecondary};
  margin-top: ${spacing.xs};
  display: flex;
  gap: ${spacing.sm};
  align-items: center;
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${colors.error};
  font-size: ${typography.fontSize.xs};
  cursor: pointer;
  text-decoration: underline;
  padding: 0;

  &:hover {
    color: ${colors.error}; /* no errorHover in tokens */
  }
`;

export const InputAreaContainer = styled.div`
  padding: ${spacing.md} ${spacing.lg};
  background-color: ${colors.background};
  border-top: 1px solid ${colors.border};
`;

export const InputWrapper = styled.div<{ $hasError?: boolean }>`
  display: flex;
  align-items: flex-end;
  background-color: ${colors.surface};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.xs} ${spacing.sm};
  border: 1px solid ${(props) => (props.$hasError ? colors.error : colors.border)};
  box-shadow: ${shadows.sm};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 2px ${colors.primary[300]};
  }
`;

export const StyledTextarea = styled.textarea`
  flex: 1;
  border: none;
  background: transparent;
  padding: ${spacing.sm} ${spacing.md};
  resize: none;
  max-height: 150px;
  color: ${colors.text};
  font-family: inherit;
  font-size: ${typography.fontSize.base || '1rem'};
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
  border-radius: ${borderRadius.md};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: ${spacing.sm};
  margin-bottom: ${spacing.xs};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.primary[700]};
  }

  &:disabled {
    background-color: ${colors.neutral[600]};
    cursor: not-allowed;
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
  background-color: ${colors.textSecondary};
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
  padding: ${spacing.md} ${spacing.lg};
  color: ${colors.textSecondary};
  font-size: ${typography.fontSize.sm};
`;
