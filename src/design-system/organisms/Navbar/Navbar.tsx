import React from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useToast } from '@/hooks/useToast';
import logo from '@/assets/logo-incubyte.png';
import { queryClient } from '@/lib/queryClient';
import { fetchTasks, tasksQueryKey } from '@/hooks/queries/useTasks';
import { Dropdown } from '@/design-system/molecules';
import { theme } from '@/design-system/theme';

const Header = styled.header`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
Header.defaultProps = { theme };

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;
LogoSection.defaultProps = { theme };

const LogoImage = styled.img`
  height: 32px;
  width: auto;
  object-fit: contain;
`;

const LogoText = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.025em;
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
`;
LogoText.defaultProps = { theme };

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: ${({ theme }) => theme.spacing.md};
  margin: 0;
  padding: 0;
  align-items: center;
`;
NavLinks.defaultProps = { theme };

const StyledNavLink = styled(Link)<{ $active?: boolean }>`
  text-decoration: none;
  color: ${({ theme, $active }) => $active ? theme.colors.primary[300] : theme.colors.textSecondary};
  background: ${({ theme, $active }) => $active ? theme.colors.primary[50] + '1A' : 'transparent'};
  font-weight: ${({ theme, $active }) => $active ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;
StyledNavLink.defaultProps = { theme };

const NavbarActions = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const UserProfileBtn = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }

  &[aria-expanded="true"] {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;
UserProfileBtn.defaultProps = { theme };

const AvatarPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.accent[700]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: white;
`;
AvatarPlaceholder.defaultProps = { theme };

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
UserInfo.defaultProps = { theme };

const UserName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const UserEmail = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoginBtn = styled(Link)`
  text-decoration: none;
  color: white;
  background: ${({ theme }) => theme.colors.primary[600]};
  padding: 0.5rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[700]};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary[600] + '4D'}; // 30% opacity
  }
`;
LoginBtn.defaultProps = { theme };

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;
  const { showToast } = useToast();

  const handleLogout = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    await signOut({ redirect: false });
    showToast('You have been logged out successfully.', 'info');
    router.push('/login');
  };

  const prefetchTasks = () => {
    queryClient.prefetchQuery({
      queryKey: tasksQueryKey,
      queryFn: fetchTasks,
    });
  };

  const navItems = [
    { to: '/day-01', label: 'Day 01' },
    { to: '/day-02', label: 'Day 02' },
    { to: '/day-03', label: 'Day 03' },
    { to: '/day-04', label: 'Day 04' },
    { to: '/day-05', label: 'Day 05' },
    { to: '/day-06', label: 'Day 06' },
    { to: '/day-07', label: 'Day 07', onMouseEnter: prefetchTasks },
    { to: '/day-08', label: 'Day 08' },
    { to: '/day-09', label: 'Day 09' },
    { to: '/day-10', label: 'Day 10' },
  ];

  return (
    <Header>
      <Nav aria-label="Main Navigation">
        <LogoSection>
          <LogoImage src={logo.src} alt="Incubyte Logo" />
          <LogoText>COE</LogoText>
        </LogoSection>
        <NavLinks>
          {navItems.map((item) => (
            <li key={item.to}>
              <StyledNavLink 
                href={item.to}
                onMouseEnter={item.onMouseEnter}
                $active={pathname === item.to}
              >
                {item.label}
              </StyledNavLink>
            </li>
          ))}
        </NavLinks>
        <NavbarActions>
          {isAuthenticated ? (
            <Dropdown
              menuId="user-menu"
              trigger={({ isOpen, onToggle }) => (
                <UserProfileBtn 
                  id="user-profile-btn"
                  className="user-profile-btn"
                  onClick={onToggle}
                  aria-expanded={isOpen}
                  aria-controls="user-menu"
                  aria-label="User Profile"
                >
                  <AvatarPlaceholder>
                    {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarPlaceholder>
                </UserProfileBtn>
              )}
              items={[
                { label: 'Profile', onClick: () => router.push('#profile') },
                { label: 'Settings', onClick: () => router.push('#settings') },
                { label: 'Logout', onClick: (e?: React.MouseEvent) => handleLogout(e), variant: 'danger' },
              ]}
            >
              <div role="menuitem" tabIndex={-1} aria-disabled="true">
                <UserInfo role="none">
                  <UserName>{user?.name}</UserName>
                  <UserEmail>{user?.email}</UserEmail>
                </UserInfo>
              </div>
            </Dropdown>
          ) : (
            <LoginBtn href="/login">Login</LoginBtn>
          )}
        </NavbarActions>
      </Nav>
    </Header>
  );
};

Navbar.displayName = 'Navbar';
