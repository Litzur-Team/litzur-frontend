'use client'

import React, { useState, useEffect } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

interface EditorToolbarProps {
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onPreview?: () => void;
  onPublish?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  isSaving?: boolean;
  isPublishing?: boolean;
  hasUnsavedChanges?: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ 
  onUndo,
  onRedo,
  onSave,
  onPreview,
  onPublish,
  canUndo = false,
  canRedo = false,
  isSaving = false,
  isPublishing = false,
  hasUnsavedChanges = false
}) => {
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  const keyboardShortcuts = [
    { key: 'Ctrl + Z', action: 'Desfazer' },
    { key: 'Ctrl + Y', action: 'Refazer' },
    { key: 'Ctrl + S', action: 'Salvar' },
    { key: 'Ctrl + P', action: 'Visualizar' },
    { key: 'Delete', action: 'Excluir componente selecionado' },
    { key: 'Ctrl + D', action: 'Duplicar componente' },
    { key: 'Ctrl + C', action: 'Copiar componente' },
    { key: 'Ctrl + V', action: 'Colar componente' },
    { key: '↑ ↓ ← →', action: 'Mover componente selecionado' },
    { key: 'Tab', action: 'Selecionar próximo componente' },
    { key: 'Shift + Tab', action: 'Selecionar componente anterior' }
  ];

  const handleKeyboardShortcut = (e: KeyboardEvent) => {
    if (e?.ctrlKey || e?.metaKey) {
      switch (e?.key?.toLowerCase()) {
        case 'z':
          e?.preventDefault();
          if (e?.shiftKey) {
            onRedo && onRedo();
          } else {
            onUndo && onUndo();
          }
          break;
        case 'y':
          e?.preventDefault();
          onRedo && onRedo();
          break;
        case 's':
          e?.preventDefault();
          onSave && onSave();
          break;
        case 'p':
          e?.preventDefault();
          onPreview && onPreview();
          break;
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => document.removeEventListener('keydown', handleKeyboardShortcut);
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-6 z-40">
      <div className="bg-background-light border border-surface-secondary-default rounded-lg shadow-lg px-4 py-3">
        <div className="flex items-center space-x-2">
          {/* Undo/Redo */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onUndo}
              disabled={!canUndo}
              iconName="Undo"
              iconSize={16}
              title="Desfazer (Ctrl+Z)"
              className="hover:bg-surface-secondary-lighter"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onRedo}
              disabled={!canRedo}
              iconName="Redo"
              iconSize={16}
              title="Refazer (Ctrl+Y)"
              className="hover:bg-surface-secondary-lighter"
            />
          </div>

          <div className="w-px h-6 bg-surface-secondary-default" />

          {/* Canvas Actions */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="ZoomIn"
              iconSize={16}
              title="Aumentar zoom"
              onClick={() => {
                // Handle zoom in
                window.dispatchEvent(new CustomEvent('canvasZoom', { detail: 'in' }));
              }}
              className="hover:bg-surface-secondary-lighter"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="ZoomOut"
              iconSize={16}
              title="Diminuir zoom"
              onClick={() => {
                // Handle zoom out
                window.dispatchEvent(new CustomEvent('canvasZoom', { detail: 'out' }));
              }}
              className="hover:bg-surface-secondary-lighter"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Maximize"
              iconSize={16}
              title="Ajustar à tela"
              onClick={() => {
                // Handle fit to screen
                window.dispatchEvent(new CustomEvent('canvasZoom', { detail: 'fit' }));
              }}
              className="hover:bg-surface-secondary-lighter"
            />
          </div>

          <div className="w-px h-6 bg-surface-secondary-default" />

          {/* Page Actions */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onPreview}
              iconName="Eye"
              iconSize={16}
              title="Pré-visualizar página"
              className="hover:bg-surface-secondary-lighter hover:text-primary-default"
            >
              <span className="ml-1 hidden sm:inline">Pré-visualizar</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSave}
              loading={isSaving}
              iconName="Save"
              iconSize={16}
              iconPosition="left"
              title="Salvar alterações (Ctrl+S)"
              className="bg-primary-default hover:bg-primary-dark text-white"
            >
              {hasUnsavedChanges && (
                <div className="w-2 h-2 bg-warning-default rounded-full -ml-1 mr-2" />
              )}
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onPublish}
              loading={isPublishing}
              iconName="Upload"
              iconSize={16}
              iconPosition="left"
              title="Publicar página"
              className="bg-success-default hover:bg-success-dark text-white"
            >
              {isPublishing ? 'Publicando...' : 'Publicar'}
            </Button>
          </div>

          <div className="w-px h-6 bg-surface-secondary-default" />

          {/* Help & Shortcuts */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
              iconName="Keyboard"
              iconSize={16}
              title="Atalhos do teclado"
              className="hover:bg-surface-secondary-lighter"
            />

            {showKeyboardShortcuts && (
              <>
                <div 
                  className="fixed inset-0 z-dropdown" 
                  onClick={() => setShowKeyboardShortcuts(false)}
                />
                <div className="absolute bottom-full mb-2 right-0 w-80 bg-background-light border border-surface-secondary-default rounded-lg shadow-lg z-dropdown">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-secondary-darker">
                        Atalhos do Teclado
                      </h3>
                      <button
                        onClick={() => setShowKeyboardShortcuts(false)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-surface-secondary-lighter rounded transition-colors"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {keyboardShortcuts?.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between py-1">
                          <span className="text-xs text-secondary-default">
                            {shortcut?.action}
                          </span>
                          <kbd className="px-2 py-1 bg-surface-secondary-light rounded text-xs font-mono">
                            {shortcut?.key}
                          </kbd>
                        </div>
                      ))}
                    </div>
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