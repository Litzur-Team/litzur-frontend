'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';
import { User } from '../../types';

interface UserAccountMenuProps {
  user?: User | null;
}

const UserAccountMenu: React.FC<UserAccountMenuProps> = ({ user = null }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  // Mock user data - replace with actual user context/state
  const defaultUser: User = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/images/avatar-placeholder.png',
    role: 'Designer'
  };

  useEffect(() => {
    setUserInfo(user || defaultUser);
  }, [user]);

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem('authToken');
    router?.push('/user-authentication');
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    router?.push('/profile');
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    // Navigate to account settings
    router?.push('/account-settings');
    setIsOpen(false);
  };

  const menuItems = [
    {
      label: 'Profile',
      icon: 'User',
      onClick: handleProfileClick
    },
    {
      label: 'Account Settings',
      icon: 'Settings',
      onClick: handleSettingsClick
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      onClick: () => {
        window.open('/help', '_blank');
        setIsOpen(false);
      }
    },
    {
      type: 'divider'
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      onClick: handleLogout,
      variant: 'destructive'
    }
  ];

  if (!userInfo) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => router?.push('/user-authentication')}
        iconName="User"
        iconPosition="left"
        iconSize={16}
      >Sign In
              </Button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={userInfo?.avatar || '/assets/images/avatar-placeholder.png'}
            alt={userInfo?.name || 'User'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden lg:block text-left">
          <div className="text-sm font-medium text-foreground">{userInfo?.name}</div>
          <div className="text-xs text-muted-foreground">{userInfo?.role}</div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`hidden lg:block text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-dropdown" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-soft-lg z-dropdown">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={userInfo?.avatar || '/assets/images/avatar-placeholder.png'}
                    alt={userInfo?.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-popover-foreground truncate">
                    {userInfo?.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {userInfo?.email}
                  </div>
                  <div className="text-xs text-accent font-medium">
                    {userInfo?.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems?.map((item, index) => {
                if (item?.type === 'divider') {
                  return <div key={index} className="border-t border-border my-2" />;
                }

                return (
                  <button
                    key={index}
                    onClick={item?.onClick}
                    className={`
                      w-full flex items-center px-4 py-2 text-sm transition-smooth
                      ${item?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-popover-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon name={item?.icon || 'Circle'} size={16} className="mr-3 flex-shrink-0" />
                    <span>{item?.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAccountMenu;