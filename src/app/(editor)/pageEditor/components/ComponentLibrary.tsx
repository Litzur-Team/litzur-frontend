'use client'

import React, { useState, useMemo } from 'react';
import Icon from '../../../../components/AppIcon';
import Input from '../../../../components/ui/Input';

interface ComponentLibraryProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  onDragStart?: (component: any) => void;
}

const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ isCollapsed, onToggle, onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('primitives');

  const componentCategories = {
    primitives: {
      label: 'Primitivos',
      icon: 'Square',
      components: [
        {
          id: 'section',
          name: 'Seção',
          description: 'Container principal para organizar conteúdo',
          icon: 'Layout',
          category: 'primitives'
        },
        {
          id: 'container',
          name: 'Container',
          description: 'Wrapper responsivo com largura máxima',
          icon: 'Box',
          category: 'primitives'
        },
        {
          id: 'heading',
          name: 'Título',
          description: 'Elementos de cabeçalho H1-H6',
          icon: 'Heading',
          category: 'primitives'
        },
        {
          id: 'text',
          name: 'Texto',
          description: 'Parágrafo de texto simples',
          icon: 'Type',
          category: 'primitives'
        },
        {
          id: 'image',
          name: 'Imagem',
          description: 'Elemento de imagem responsiva',
          icon: 'Image',
          category: 'primitives'
        },
        {
          id: 'button',
          name: 'Botão',
          description: 'Botão interativo com estilos',
          icon: 'MousePointer',
          category: 'primitives'
        }
      ]
    },
    complex: {
      label: 'Complexos',
      icon: 'Layers',
      components: [
        {
          id: 'slider',
          name: 'Slider',
          description: 'Carrossel de imagens ou conteúdo',
          icon: 'ChevronRight',
          category: 'complex'
        },
        {
          id: 'form',
          name: 'Formulário',
          description: 'Formulário com campos de entrada',
          icon: 'FileText',
          category: 'complex'
        },
        {
          id: 'tabs',
          name: 'Abas',
          description: 'Interface com abas navegáveis',
          icon: 'Tabs',
          category: 'complex'
        },
        {
          id: 'accordion',
          name: 'Acordeão',
          description: 'Conteúdo expansível em seções',
          icon: 'ChevronDown',
          category: 'complex'
        },
        {
          id: 'modal',
          name: 'Modal',
          description: 'Janela sobreposta para conteúdo',
          icon: 'Square',
          category: 'complex'
        },
        {
          id: 'card',
          name: 'Card',
          description: 'Container de conteúdo com bordas',
          icon: 'CreditCard',
          category: 'complex'
        }
      ]
    },
    marketing: {
      label: 'Marketing',
      icon: 'TrendingUp',
      components: [
        {
          id: 'hero',
          name: 'Hero Section',
          description: 'Seção principal de destaque',
          icon: 'Star',
          category: 'marketing'
        },
        {
          id: 'testimonial',
          name: 'Depoimento',
          description: 'Seção de depoimentos de clientes',
          icon: 'MessageSquare',
          category: 'marketing'
        },
        {
          id: 'pricing',
          name: 'Preços',
          description: 'Tabela de preços e planos',
          icon: 'DollarSign',
          category: 'marketing'
        },
        {
          id: 'cta',
          name: 'Call to Action',
          description: 'Seção de chamada para ação',
          icon: 'Zap',
          category: 'marketing'
        },
        {
          id: 'features',
          name: 'Recursos',
          description: 'Lista de recursos e benefícios',
          icon: 'CheckCircle',
          category: 'marketing'
        },
        {
          id: 'newsletter',
          name: 'Newsletter',
          description: 'Formulário de inscrição',
          icon: 'Mail',
          category: 'marketing'
        }
      ]
    }
  };

  const filteredComponents = useMemo(() => {
    const allComponents = Object.values(componentCategories)?.flatMap(cat => cat?.components);
    if (!searchTerm) return allComponents;
    
    return allComponents?.filter(component =>
      component?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      component?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }, [searchTerm]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, component: any) => {
    e?.dataTransfer?.setData('application/json', JSON.stringify(component));
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart && onDragStart(component);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, component: any) => {
    if (e?.key === 'Enter' || e?.key === ' ') {
      e?.preventDefault();
      // Simulate drag start for keyboard users
      onDragStart && onDragStart(component);
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-background-light border-r border-surface-secondary-default shadow-sm h-full flex flex-col">
        <div className="p-4 border-b border-surface-secondary-default">
          <button
            onClick={() => onToggle && onToggle()}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-secondary-lighter transition-colors"
            title="Expandir biblioteca de componentes"
          >
            <Icon name="Package" size={20} />
          </button>
        </div>
        <div className="flex-1 p-2 space-y-2">
          {Object.entries(componentCategories)?.map(([key, category]) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                onToggle && onToggle();
              }}
              className="w-full h-10 flex items-center justify-center rounded-lg hover:bg-surface-secondary-lighter transition-colors"
              title={category?.label}
            >
              <Icon name={category?.icon} size={18} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-background-light border-r border-surface-secondary-default shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-surface-secondary-default">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-darker">Componentes</h2>
          <button
            onClick={() => onToggle && onToggle()}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-secondary-lighter transition-colors"
            title="Recolher biblioteca"
          >
            <Icon name="PanelLeftClose" size={18} />
          </button>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Buscar componentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="mb-4"
        />

        {/* Category Tabs */}
        <div className="flex space-x-1 bg-surface-secondary-light rounded-lg p-1 overflow-x-scroll">
          {Object.entries(componentCategories)?.map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`
                flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                transition-colors
                ${activeCategory === key 
                  ? 'bg-background-light text-secondary-darker shadow-sm' 
                  : 'text-secondary-default hover:text-secondary-darker'
                }
              `}
            >
              <Icon name={category?.icon} size={16} />
              <span className="hidden lg:inline">{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-4">
        {searchTerm ? (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-secondary-default mb-3">
              Resultados da busca ({filteredComponents?.length})
            </h3>
            {filteredComponents?.map((component) => (
              <div
                key={component?.id}
                draggable
                onDragStart={(e) => handleDragStart(e, component)}
                onKeyDown={(e) => handleKeyDown(e, component)}
                tabIndex={0}
                role="button"
                aria-label={`Arrastar ${component?.name}`}
                className="group p-3 bg-background-light border border-surface-secondary-default rounded-lg cursor-grab hover:shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-default"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-surface-secondary-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-default group-hover:text-white transition-colors">
                    <Icon name={component?.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-secondary-darker group-hover:text-primary-default transition-colors">
                      {component?.name}
                    </h4>
                    <p className="text-xs text-secondary-default mt-1 line-clamp-2">
                      {component?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(componentCategories)?.map(([key, category]) => (
              <div key={key} className={activeCategory === key ? 'block' : 'hidden'}>
                <h3 className="text-sm font-medium text-secondary-default mb-3 flex items-center space-x-2">
                  <Icon name={category?.icon} size={16} />
                  <span>{category?.label}</span>
                </h3>
                <div className="space-y-2">
                  {category?.components?.map((component) => (
                    <div
                      key={component?.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, component)}
                      onKeyDown={(e) => handleKeyDown(e, component)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Arrastar ${component?.name}`}
                      className="group p-3 bg-background-light border border-surface-secondary-default rounded-lg cursor-grab hover:shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-default"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-surface-secondary-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-default group-hover:text-white transition-colors">
                          <Icon name={component?.icon} size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-secondary-darker group-hover:text-primary-default transition-colors">
                            {component?.name}
                          </h4>
                          <p className="text-xs text-secondary-default mt-1 line-clamp-2">
                            {component?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentLibrary;