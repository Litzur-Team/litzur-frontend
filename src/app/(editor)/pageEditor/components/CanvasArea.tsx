'use client'

import React, { useState, useRef } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

interface CanvasAreaProps {
  components?: any[];
  selectedComponent?: any;
  onComponentSelect?: (component: any) => void;
  onComponentDrop?: (component: any, index: number) => void;
  onComponentDelete?: (id: string) => void;
  onComponentUpdate?: (id: string, updates: any) => void;
  viewMode?: 'desktop' | 'tablet' | 'mobile';
  onViewModeChange?: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ 
  components = [],
  selectedComponent, 
  onComponentSelect, 
  onComponentDrop,
  onComponentDelete,
  onComponentUpdate,
  viewMode = 'desktop',
  onViewModeChange 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragOverZone, setDragOverZone] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);
  const canvasRef = useRef<HTMLDivElement>(null);

  const viewModes: Array<{ id: 'desktop' | 'tablet' | 'mobile'; icon: string; label: string; width: string }> = [
    { id: 'desktop', icon: 'Monitor', label: 'Desktop', width: '100%' },
    { id: 'tablet', icon: 'Tablet', label: 'Tablet', width: '768px' },
    { id: 'mobile', icon: 'Smartphone', label: 'Mobile', width: '375px' }
  ];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, zoneIndex?: number) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
    
    if (zoneIndex !== undefined) {
      setDragOverZone(zoneIndex);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!canvasRef?.current?.contains(e?.relatedTarget as Node)) {
      setIsDragOver(false);
      setDragOverZone(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex?: number) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragOver(false);
    
    const finalDropIndex = dropIndex !== undefined ? dropIndex : dragOverZone;
    setDragOverZone(null);

    try {
      const componentData = JSON.parse(e?.dataTransfer?.getData('application/json'));
      onComponentDrop && onComponentDrop(componentData, finalDropIndex ?? 0);
    } catch (error) {
      console.error('Erro ao processar componente:', error);
    }
  };

  const renderComponentContent = (component: any) => {
    const commonClasses = `${component?.styles?.background || 'bg-white'} ${component?.styles?.padding || 'py-8'} ${component?.styles?.textColor || 'text-foreground'}`;
    
    switch (component?.type) {
      case 'heading':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4">
              <h2 className={`${component?.styles?.fontSize || 'text-3xl'} ${component?.styles?.fontWeight || 'font-bold'}`}>
                {component?.content?.text || 'Novo Título'}
              </h2>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4">
              <p className="text-base leading-relaxed">
                {component?.content?.content || 'Adicione seu texto aqui...'}
              </p>
            </div>
          </div>
        );
      
      case 'button':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4 text-center">
              <button className={`${component?.styles?.padding || 'px-6 py-3'} ${component?.styles?.background || 'bg-primary'} ${component?.styles?.textColor || 'text-white'} ${component?.styles?.borderRadius || 'rounded-lg'} font-semibold hover:opacity-90 transition-smooth`}>
                {component?.content?.text || 'Clique Aqui'}
              </button>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4">
              <div className="text-center">
                <img 
                  src={component?.content?.src || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'}
                  alt={component?.content?.alt || 'Imagem'}
                  className="max-w-full h-auto rounded-lg shadow-soft-sm mx-auto"
                />
                {component?.content?.caption && (
                  <p className="text-sm text-muted-foreground mt-2">{component?.content?.caption}</p>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'section':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4">
              <h3 className="text-2xl font-semibold mb-4">{component?.content?.title || 'Nova Seção'}</h3>
              <div>{component?.content?.content || 'Conteúdo da seção...'}</div>
            </div>
          </div>
        );
      
      case 'container':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4">
              <div className="p-8 border-2 border-dashed border-border rounded-lg text-center">
                <p className="text-muted-foreground">{component?.content?.content || 'Container vazio - adicione conteúdo aqui'}</p>
              </div>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className={commonClasses} style={{
            backgroundImage: component?.content?.backgroundImage ? `url(${component?.content?.backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <div className="container mx-auto px-4 text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {component?.content?.title || 'Título Principal'}
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {component?.content?.subtitle || 'Subtítulo descritivo'}
              </p>
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-smooth">
                {component?.content?.buttonText || 'Call to Action'}
              </button>
            </div>
          </div>
        );
        
      case 'features':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                {component?.content?.title || 'Nossos Recursos'}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {component?.content?.features?.map((feature: any, idx: number) => (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={feature?.icon || 'Star'} size={24} color="white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature?.title || `Recurso ${idx + 1}`}</h3>
                    <p className="text-muted-foreground">{feature?.description || 'Descrição do recurso'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4">
              <div className={`max-w-sm mx-auto ${component?.styles?.border || 'border border-border'} ${component?.styles?.borderRadius || 'rounded-lg'} overflow-hidden shadow-soft-sm`}>
                {component?.content?.image && (
                  <img 
                    src={component?.content?.image}
                    alt={component?.content?.title || 'Card'}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{component?.content?.title || 'Título do Card'}</h3>
                  <p className="text-muted-foreground">{component?.content?.content || 'Conteúdo do card...'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <blockquote className="text-xl italic mb-6">
                  "{component?.content?.quote || 'Esta é uma citação de depoimento incrível!'}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  {component?.content?.avatar && (
                    <img 
                      src={component?.content?.avatar}
                      alt={component?.content?.author}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-semibold">{component?.content?.author || 'Nome do Cliente'}</div>
                    {component?.content?.company && (
                      <div className="text-sm text-muted-foreground">{component?.content?.company}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-4">
                {component?.content?.title || 'Pronto para começar?'}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {component?.content?.subtitle || 'Entre em contato conosco hoje mesmo'}
              </p>
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-smooth">
                {component?.content?.buttonText || 'Começar Agora'}
              </button>
            </div>
          </div>
        );

      case 'newsletter':
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                {component?.content?.title || 'Inscreva-se na Newsletter'}
              </h2>
              <p className="text-lg mb-8 opacity-90">
                {component?.content?.subtitle || 'Receba as últimas novidades'}
              </p>
              <div className="max-w-md mx-auto flex space-x-2">
                <input 
                  type="email"
                  placeholder={component?.content?.placeholder || 'Seu email...'}
                  className="flex-1 px-4 py-3 rounded-lg text-foreground"
                />
                <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-smooth">
                  {component?.content?.buttonText || 'Inscrever'}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={commonClasses}>
            <div className="container mx-auto px-4">
              <div className="p-8 border-2 border-dashed border-border rounded-lg text-center">
                <Icon name="Box" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{component?.name || 'Componente'}</h3>
                <p className="text-muted-foreground">Tipo: {component?.type}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderComponent = (component: any, index: number) => {
    const isSelected = selectedComponent?.id === component?.id;
    
    return (
      <React.Fragment key={component?.id}>
        {/* Drop Zone Above Component */}
        <div
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          className={`
            relative transition-all duration-200
            ${isDragOver && dragOverZone === index 
              ? 'h-20 bg-primary-default/20 border-2 border-dashed border-primary-default' 
              : 'h-2 hover:h-16 hover:bg-primary-light/10 hover:border hover:border-dashed hover:border-primary-light'
            }
          `}
        >
          {isDragOver && dragOverZone === index && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary-default text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Icon name="Plus" size={12} />
                <span>Soltar aqui</span>
              </div>
            </div>
          )}
        </div>

        {/* Component */}
        <div
          onClick={() => onComponentSelect && onComponentSelect(component)}
          className={`
            relative group cursor-pointer transition-colors
            ${isSelected ? 'ring-2 ring-primary-default ring-offset-2' : 'hover:ring-1 hover:ring-surface-secondary-default'}
          `}
        >
          {/* Component Content */}
          {renderComponentContent(component)}

          {/* Selection Overlay */}
          {isSelected && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-8 left-0 bg-primary-default text-white px-2 py-1 rounded text-xs font-medium">
                {component?.name}
              </div>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  // Create duplicate
                  const duplicatedComponent = {
                    ...component,
                    id: `comp-${Date.now()}`,
                    name: `${component?.name} (Cópia)`
                  };
                  onComponentDrop && onComponentDrop(duplicatedComponent, index + 1);
                }}
                className="w-8 h-8 bg-background-light border border-surface-secondary-default rounded-md flex items-center justify-center hover:bg-surface-secondary-lighter transition-colors"
                title="Duplicar"
              >
                <Icon name="Copy" size={14} />
              </button>
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  onComponentDelete && onComponentDelete(component?.id);
                }}
                className="w-8 h-8 bg-background-light border border-surface-secondary-default rounded-md flex items-center justify-center hover:bg-danger-lighter hover:text-danger-default transition-colors"
                title="Excluir"
              >
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const currentViewMode = viewModes?.find(mode => mode?.id === viewMode) || viewModes?.[0];

  return (
    <div className="flex-1 bg-surface-secondary-lighter flex flex-col">
      {/* Canvas Toolbar */}
      <div className="bg-background-light border-b border-surface-secondary-default px-4 py-3">
        <div className="flex items-center justify-between">
          {/* View Mode Selector */}
          <div className="flex items-center bg-surface-secondary-light rounded-lg p-1">
            {viewModes?.map((mode) => (
              <button
                key={mode?.id}
                onClick={() => onViewModeChange && onViewModeChange(mode?.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                  transition-colors
                  ${viewMode === mode?.id 
                    ? 'bg-background-light text-secondary-darker shadow-sm' 
                    : 'text-secondary-default hover:text-secondary-darker'
                  }
                `}
                title={mode?.label}
              >
                <Icon name={mode?.icon} size={16} />
                <span className="hidden sm:inline">{mode?.label}</span>
              </button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.max(25, zoom - 25))}
              disabled={zoom <= 25}
              iconName="ZoomOut"
              iconSize={16}
            />
            <span className="text-sm font-medium min-w-16 text-center">
              {zoom}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              disabled={zoom >= 200}
              iconName="ZoomIn"
              iconSize={16}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(100)}
              iconName="Maximize"
              iconSize={16}
              title="Ajustar à tela"
            />
          </div>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-center">
          <div
            className="bg-background-light shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={{
              width: currentViewMode?.width,
              maxWidth: '100%',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Canvas Content */}
            <div
              ref={canvasRef}
              className="min-h-screen relative"
            >
              {/* Components */}
              {components?.length > 0 ? (
                <>
                  {components?.map((component, index) => renderComponent(component, index))}
                  
                  {/* Drop Zone After Last Component */}
                  <div
                    onDragOver={(e) => handleDragOver(e, components?.length)}
                    onDrop={(e) => handleDrop(e, components?.length)}
                    onDragLeave={handleDragLeave}
                    className={`
                      relative transition-all duration-200
                      ${isDragOver && dragOverZone === components?.length 
                        ? 'h-20 bg-primary-default/20 border-2 border-dashed border-primary-default' 
                        : 'h-2 hover:h-16 hover:bg-primary-light/10 hover:border hover:border-dashed hover:border-primary-light'
                      }
                    `}
                  >
                    {isDragOver && dragOverZone === components?.length && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary-default text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Icon name="Plus" size={12} />
                          <span>Soltar aqui</span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div 
                  onDragOver={(e) => handleDragOver(e, 0)}
                  onDrop={(e) => handleDrop(e, 0)}
                  onDragLeave={handleDragLeave}
                  className={`
                    flex items-center justify-center h-full min-h-96
                    ${isDragOver ? 'bg-primary-lighter/20 border-2 border-dashed border-primary-default' : ''}
                  `}
                >
                  <div className="text-center">
                    <div className="w-24 h-24 bg-surface-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Plus" size={32} className="text-secondary-default" />
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-darker mb-2">
                      Canvas Vazio
                    </h3>
                    <p className="text-secondary-default max-w-sm">
                      Arraste componentes da biblioteca à esquerda para começar a construir sua página
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasArea;