'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '../AppIcon';
import Button from './Button';

interface MainSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ collapsed = false, onToggle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/page-management-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Manage pages and projects'
    },
    {
      label: 'Canvas Editor',
      path: '/canvas-editor',
      icon: 'PaintBucket',
      tooltip: 'Create and edit pages'
    },
    {
      label: 'Templates',
      path: '/template-gallery',
      icon: 'Layout',
      tooltip: 'Browse page templates'
    },
    {
      label: 'Components',
      path: '/component-library-manager',
      icon: 'Package',
      tooltip: 'Manage component library'
    },
    {
      label: 'Settings',
      path: '/page-settings-configuration',
      icon: 'Settings',
      tooltip: 'Configure page settings'
    }
  ];

  useEffect(() => {
    setActiveRoute(pathname || '');
  }, [pathname]);

  const handleNavigation = (path: string) => {
    router?.push(path);
    setIsMobileOpen(false);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-dropdown lg:hidden"
        onClick={toggleMobile}
        iconName="Menu"
        iconSize={24}
      >
        <span className="sr-only">Toggle navigation</span>
      </Button>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-sidebar lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-sidebar
          transition-all duration-panel ease-smooth shadow-soft-md
          ${collapsed ? 'w-16' : 'w-70'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center h-16 px-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Layers" size={20} color="white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">Canvas</span>
                <span className="text-xs text-muted-foreground -mt-1">Page Builder</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigationItems?.map((item) => {
              const isActive = activeRoute === item?.path;
              return (
                <li key={item?.path}>
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      w-full flex items-center px-3 py-3 rounded-lg text-left
                      transition-smooth group relative
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-soft-sm' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                      ${collapsed ? 'justify-center' : 'justify-start space-x-3'}
                    `}
                    title={collapsed ? item?.tooltip : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : ''}`}
                    />
                    {!collapsed && (
                      <span className="font-medium text-sm">{item?.label}</span>
                    )}
                    
                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-soft-md opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-dropdown">
                        {item?.tooltip}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="hidden lg:block p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full justify-center"
            iconName={collapsed ? "ChevronRight" : "ChevronLeft"}
            iconSize={16}
          >
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default MainSidebar;