'use client'

import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

interface EditorToolbarProps {
  onComponentLibraryToggle?: () => void;
  onPageSettings?: () => void;
  onPreview?: () => void;
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  isSaving?: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ 
  onComponentLibraryToggle, 
  onPageSettings, 
  onPreview, 
  onSave,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  isSaving = false 
}) => {
  const [viewMode, setViewMode] = useState('desktop');
  const [showMoreActions, setShowMoreActions] = useState(false);

  const viewModes = [
    { id: 'desktop', icon: 'Monitor', label: 'Desktop' },
    { id: 'tablet', icon: 'Tablet', label: 'Tablet' },
    { id: 'mobile', icon: 'Smartphone', label: 'Mobile' }
  ];

  const handleViewModeChange = (mode: string) => {
    setViewMode(mode);
    // Emit view mode change event
    window.dispatchEvent(new CustomEvent('viewModeChange', { detail: mode }));
  };

  return (
    <div className="bg-card border-b border-border shadow-soft-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Primary Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onComponentLibraryToggle}
            iconName="Package"
            iconPosition="left"
            iconSize={16}
          >
            Components
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            iconName="Undo"
            iconSize={16}
            title="Undo (Ctrl+Z)"
          >
            <span className="sr-only">Undo</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            iconName="Redo"
            iconSize={16}
            title="Redo (Ctrl+Y)"
          >
            <span className="sr-only">Redo</span>
          </Button>
        </div>

        {/* Center Section - View Mode Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          {viewModes?.map((mode) => (
            <button
              key={mode?.id}
              onClick={() => handleViewModeChange(mode?.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                transition-smooth
                ${viewMode === mode?.id 
                  ? 'bg-background text-foreground shadow-soft-sm' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
              title={mode?.label}
            >
              <Icon name={mode?.icon} size={16} />
              <span className="hidden sm:inline">{mode?.label}</span>
            </button>
          ))}
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPageSettings}
            iconName="Settings"
            iconSize={16}
            title="Page Settings"
          >
            <span className="sr-only">Settings</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
          >
            Preview
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={onSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save
          </Button>

          {/* More Actions Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreActions(!showMoreActions)}
              iconName="MoreVertical"
              iconSize={16}
              title="More actions"
            >
              <span className="sr-only">More actions</span>
            </Button>

            {showMoreActions && (
              <>
                <div 
                  className="fixed inset-0 z-dropdown" 
                  onClick={() => setShowMoreActions(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-soft-md z-dropdown">
                  <div className="py-2">
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      onClick={() => {
                        // Handle duplicate page
                        setShowMoreActions(false);
                      }}
                    >
                      <Icon name="Copy" size={16} className="mr-3" />
                      Duplicate Page
                    </button>
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      onClick={() => {
                        // Handle export
                        setShowMoreActions(false);
                      }}
                    >
                      <Icon name="Download" size={16} className="mr-3" />
                      Export Page
                    </button>
                    <div className="border-t border-border my-2" />
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
                      onClick={() => {
                        // Handle delete
                        setShowMoreActions(false);
                      }}
                    >
                      <Icon name="Trash2" size={16} className="mr-3" />
                      Delete Page
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;