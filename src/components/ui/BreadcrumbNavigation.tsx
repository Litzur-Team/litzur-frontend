'use client'

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '../AppIcon';
import { BreadcrumbItem } from '../../types';

interface BreadcrumbNavigationProps {
  customBreadcrumbs?: BreadcrumbItem[] | null;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ customBreadcrumbs = null }) => {
  const router = useRouter();
  const pathname = usePathname();

  const routeMap: Record<string, { label: string; icon: string }> = {
    '/page-management-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/canvas-editor': { label: 'Canvas Editor', icon: 'PaintBucket' },
    '/template-gallery': { label: 'Templates', icon: 'Layout' },
    '/component-library-manager': { label: 'Components', icon: 'Package' },
    '/page-settings-configuration': { label: 'Settings', icon: 'Settings' },
    '/user-authentication': { label: 'Authentication', icon: 'Lock' }
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = pathname?.split('/')?.filter(Boolean) || [];
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/', icon: 'Home' }];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];
      
      if (routeInfo) {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      } else {
        // Handle dynamic routes or unknown paths
        const formattedLabel = segment?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');
        
        breadcrumbs?.push({
          label: formattedLabel,
          path: currentPath,
          icon: 'ChevronRight',
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path: string) => {
    if (path !== pathname) {
      router?.push(path);
    }
  };

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground/60" 
              />
            )}
            
            {crumb?.isLast ? (
              <span className="flex items-center space-x-2 text-foreground font-medium">
                <Icon name={crumb?.icon || 'ChevronRight'} size={16} />
                <span className="hidden sm:inline">{crumb?.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(crumb?.path)}
                className="flex items-center space-x-2 hover:text-foreground transition-smooth"
              >
                <Icon name={crumb?.icon || 'ChevronRight'} size={16} />
                <span className="hidden sm:inline">{crumb?.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;