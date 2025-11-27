'use client'

import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

interface ComponentOutlineProps {
  components?: any[];
  selectedComponent?: any;
  onComponentSelect?: (component: any) => void;
  onComponentReorder?: (startIndex: number, endIndex: number) => void;
  onComponentDelete?: (componentId: any) => void;
  isVisible?: boolean;
  onToggle?: () => void;
}

const ComponentOutline: React.FC<ComponentOutlineProps> = ({ 
  components = [], 
  selectedComponent, 
  onComponentSelect, 
  onComponentReorder,
  onComponentDelete,
  isVisible,
  onToggle 
}) => {
  const [expandedComponents, setExpandedComponents] = useState(new Set());

  const mockComponents = [
    {
      id: 'comp-1',
      type: 'hero',
      name: 'Hero Section',
      icon: 'Star',
      children: [
        { id: 'comp-1-title', type: 'heading', name: 'Título Principal', icon: 'Heading' },
        { id: 'comp-1-subtitle', type: 'text', name: 'Subtítulo', icon: 'Type' },
        { id: 'comp-1-button', type: 'button', name: 'Botão CTA', icon: 'MousePointer' }
      ]
    },
    {
      id: 'comp-2',
      type: 'features',
      name: 'Seção de Recursos',
      icon: 'CheckCircle',
      children: [
        { id: 'comp-2-title', type: 'heading', name: 'Título dos Recursos', icon: 'Heading' },
        {
          id: 'comp-2-grid',
          type: 'container',
          name: 'Grid de Recursos',
          icon: 'Grid3x3',
          children: [
            { id: 'comp-2-feature-1', type: 'card', name: 'Recurso 1', icon: 'CreditCard' },
            { id: 'comp-2-feature-2', type: 'card', name: 'Recurso 2', icon: 'CreditCard' },
            { id: 'comp-2-feature-3', type: 'card', name: 'Recurso 3', icon: 'CreditCard' }
          ]
        }
      ]
    },
    {
      id: 'comp-3',
      type: 'cta',
      name: 'Call to Action',
      icon: 'Zap',
      children: [
        { id: 'comp-3-title', type: 'heading', name: 'Título CTA', icon: 'Heading' },
        { id: 'comp-3-button', type: 'button', name: 'Botão Principal', icon: 'MousePointer' }
      ]
    }
  ];

  const componentsToRender = components?.length > 0 ? components : mockComponents;

  const toggleExpanded = (componentId: string) => {
    const newExpanded = new Set(expandedComponents);
    if (newExpanded?.has(componentId)) {
      newExpanded?.delete(componentId);
    } else {
      newExpanded?.add(componentId);
    }
    setExpandedComponents(newExpanded);
  };

  const handleDragStart = (e: React.DragEvent, component: any) => {
    e?.dataTransfer?.setData('text/plain', component?.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetComponent: any) => {
    e?.preventDefault();
    const draggedId = e?.dataTransfer?.getData('text/plain');
    
    // Find indices
    const draggedIndex = componentsToRender.findIndex((c: any) => c.id === draggedId);
    const targetIndex = componentsToRender.findIndex((c: any) => c.id === targetComponent?.id);
    
    if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
      onComponentReorder && onComponentReorder(draggedIndex, targetIndex);
    }
  };

  const renderComponent = (component: any, level = 0) => {
    const isSelected = selectedComponent?.id === component?.id;
    const isExpanded = expandedComponents?.has(component?.id);
    const hasChildren = component?.children && component?.children?.length > 0;

    return (
      <div key={component?.id} className="select-none">
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, component)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, component)}
          onClick={() => onComponentSelect?.(component)}
          className={`
            flex items-center space-x-2 px-2 py-2 rounded-md cursor-pointer group
            transition-colors hover:bg-surface-secondary-lighter
            ${isSelected ? 'bg-primary-default/10 text-primary-default border border-primary-default/20' : 'text-secondary-darker'}
          `}
          style={{ paddingLeft: `${8 + level * 16}px` }}
        >
          {/* Expand/Collapse Button */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e?.stopPropagation();
                toggleExpanded(component?.id);
              }}
              className="w-4 h-4 flex items-center justify-center hover:bg-surface-secondary-default rounded transition-colors"
            >
              <Icon 
                name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                size={12} 
              />
            </button>
          ) : (
            <div className="w-4" />
          )}

          {/* Component Icon */}
          <div className={`
            w-6 h-6 rounded flex items-center justify-center flex-shrink-0
            ${isSelected ? 'bg-primary-default text-white' : 'bg-surface-secondary-light'}
          `}>
            <Icon name={component?.icon} size={14} />
          </div>

          {/* Component Name */}
          <span className="flex-1 text-sm font-medium truncate">
            {component?.name}
          </span>

          {/* Component Actions */}
          <div className="opacity-0 group-hover:opacity-100 transition-colors flex space-x-1">
            <button
              onClick={(e) => {
                e?.stopPropagation();
                // Handle visibility toggle
              }}
              className="w-6 h-6 flex items-center justify-center hover:bg-surface-secondary-default rounded transition-colors"
              title="Alternar visibilidade"
            >
              <Icon name="Eye" size={12} />
            </button>
            <button
              onClick={(e) => {
                e?.stopPropagation();
                // Handle lock/unlock
              }}
              className="w-6 h-6 flex items-center justify-center hover:bg-surface-secondary-default rounded transition-colors"
              title="Bloquear/Desbloquear"
            >
              <Icon name="Lock" size={12} />
            </button>
          </div>
        </div>
        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {component?.children?.map((child: any) => renderComponent(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => onToggle && onToggle()}
        className="fixed bottom-6 left-6 w-12 h-12 bg-primary-default text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors z-50 flex items-center justify-center"
        title="Mostrar estrutura de componentes"
      >
        <Icon name="List" size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 w-80 bg-background-light border border-surface-secondary-default rounded-lg shadow-lg z-50 max-h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-surface-secondary-default">
        <div className="flex items-center space-x-2">
          <Icon name="List" size={18} className="text-primary-default" />
          <h3 className="text-sm font-semibold text-secondary-darker">
            Estrutura da Página
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconSize={14}
            title="Expandir todos"
            onClick={() => {
              const allIds = new Set<string>();
              const collectIds = (components: any[]) => {
                components?.forEach((comp: any) => {
                  if (comp?.children && comp?.children?.length > 0) {
                    allIds?.add(comp?.id);
                    collectIds(comp?.children);
                  }
                });
              };
              collectIds(componentsToRender);
              setExpandedComponents(allIds);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCw"
            iconSize={14}
            title="Recolher todos"
            onClick={() => setExpandedComponents(new Set())}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={14}
            title="Fechar"
            onClick={onToggle}
          />
        </div>
      </div>
      {/* Component Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        {componentsToRender?.length > 0 ? (
          <div className="space-y-1">
            {componentsToRender?.map(component => renderComponent(component))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <Icon name="FileX" size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Nenhum componente na página
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{componentsToRender?.length} componentes</span>
          <div className="flex items-center space-x-2">
            <Icon name="Move" size={12} />
            <span>Arraste para reordenar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentOutline;