'use client'

import React, { useState, useEffect } from 'react';
import Icon from '../../../../components/AppIcon';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';

interface PropertiesPanelProps {
  selectedComponent?: any;
  onComponentUpdate?: (id: string, updates: any) => void;
  onComponentDelete?: (id: string) => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ 
  selectedComponent, 
  onComponentUpdate, 
  onComponentDelete, 
  isCollapsed, 
  onToggle 
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [localComponent, setLocalComponent] = useState<any>(null);

  useEffect(() => {
    setLocalComponent(selectedComponent);
  }, [selectedComponent]);

  const tabs = [
    { id: 'content', label: 'Conteúdo', icon: 'FileText' },
    { id: 'style', label: 'Estilo', icon: 'Palette' },
    { id: 'layout', label: 'Layout', icon: 'Layout' },
    { id: 'advanced', label: 'Avançado', icon: 'Settings' }
  ];

  const handleContentChange = (field: string, value: any) => {
    if (!localComponent) return;
    
    const updatedComponent = {
      ...localComponent,
      content: {
        ...localComponent?.content,
        [field]: value
      }
    };
    
    setLocalComponent(updatedComponent);
    onComponentUpdate && onComponentUpdate(localComponent.id, updatedComponent);
  };

  const handleStyleChange = (field: string, value: any) => {
    if (!localComponent) return;
    
    const updatedComponent = {
      ...localComponent,
      styles: {
        ...localComponent?.styles,
        [field]: value
      }
    };
    
    setLocalComponent(updatedComponent);
    onComponentUpdate && onComponentUpdate(localComponent.id, updatedComponent);
  };

  const handleDuplicateComponent = () => {
    if (!localComponent) return;
    
    const duplicatedComponent = {
      ...localComponent,
      id: `comp-${Date.now()}`,
      name: `${localComponent?.name} (Cópia)`
    };
    
    // This would need to be handled by parent component
    console.log('Duplicating component:', duplicatedComponent);
  };

  const handleDeleteComponent = () => {
    if (!localComponent) return;
    
    if (window.confirm(`Tem certeza que deseja excluir o componente "${localComponent?.name}"?`)) {
      onComponentDelete && onComponentDelete(localComponent?.id);
    }
  };

  const paddingOptions = [
    { value: 'py-0', label: 'Nenhum' },
    { value: 'py-4', label: 'Pequeno' },
    { value: 'py-8', label: 'Médio' },
    { value: 'py-16', label: 'Grande' },
    { value: 'py-24', label: 'Extra Grande' }
  ];

  const backgroundOptions = [
    { value: 'bg-white', label: 'Branco' },
    { value: 'bg-gray-50', label: 'Cinza Claro' },
    { value: 'bg-gray-100', label: 'Cinza' },
    { value: 'bg-primary', label: 'Primário' },
    { value: 'bg-secondary', label: 'Secundário' },
    { value: 'bg-gradient-to-r from-blue-600 to-purple-600', label: 'Gradiente Azul-Roxo' }
  ];

  const textColorOptions = [
    { value: 'text-foreground', label: 'Padrão' },
    { value: 'text-white', label: 'Branco' },
    { value: 'text-gray-600', label: 'Cinza' },
    { value: 'text-primary', label: 'Primário' },
    { value: 'text-secondary', label: 'Secundário' }
  ];

  if (isCollapsed) {
    return (
      <div className="w-16 bg-background-light border-l border-surface-secondary-default shadow-sm h-full flex flex-col">
        <div className="p-4 border-b border-surface-secondary-default">
          <button
            onClick={onToggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-secondary-lighter transition-colors"
            title="Expandir painel de propriedades"
          >
            <Icon name="Settings" size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (!localComponent) {
    return (
      <div className="w-80 bg-background-light border-l border-surface-secondary-default shadow-sm h-full flex flex-col">
        <div className="p-4 border-b border-surface-secondary-default">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-secondary-darker">Propriedades</h2>
            <button
              onClick={onToggle}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-secondary-lighter transition-colors"
              title="Recolher painel"
            >
              <Icon name="PanelRightClose" size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-surface-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MousePointer" size={24} className="text-secondary-default" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-darker mb-2">
              Nenhum Componente Selecionado
            </h3>
            <p className="text-secondary-default text-sm">
              Clique em um componente no canvas para editar suas propriedades
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-background-light border-l border-surface-secondary-default shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-surface-secondary-default">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-darker">Propriedades</h2>
          <button
            onClick={onToggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-secondary-lighter transition-colors"
            title="Recolher painel"
          >
            <Icon name="PanelRightClose" size={18} />
          </button>
        </div>

        {/* Component Info */}
        <div className="flex items-center space-x-3 p-3 bg-surface-secondary-light rounded-lg">
          <div className="w-10 h-10 bg-primary-default rounded-lg flex items-center justify-center">
            <Icon name="Box" size={18} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground truncate">
              {localComponent?.name}
            </h3>
            <p className="text-xs text-secondary-default">
              {localComponent?.type}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-surface-secondary-light rounded-lg p-1 mt-4 overflow-x-scroll">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex-1 flex items-center justify-center space-x-1 px-2 py-2 rounded-md text-xs font-medium
                transition-colors
                ${activeTab === tab?.id 
                  ? 'bg-background-light text-secondary-darker shadow-sm' 
                  : 'text-secondary-default hover:text-secondary-darker'
                }
              `}
              title={tab?.label}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden lg:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-secondary-darker mb-3">Conteúdo</h3>
            
            {/* Common text components */}
            {['heading', 'text']?.includes(localComponent?.type) && (
              <Input
                label={localComponent?.type === 'heading' ? 'Texto do Título' : 'Conteúdo do Texto'}
                value={localComponent?.content?.text || localComponent?.content?.content || ''}
                onChange={(e) => {
                  const field = localComponent?.type === 'heading' ? 'text' : 'content';
                  handleContentChange(field, e?.target?.value);
                }}
                placeholder="Digite o texto..."
              />
            )}

            {/* Button component */}
            {localComponent?.type === 'button' && (
              <>
                <Input
                  label="Texto do Botão"
                  value={localComponent?.content?.text || ''}
                  onChange={(e) => handleContentChange('text', e?.target?.value)}
                  placeholder="Clique Aqui"
                />
                <Input
                  label="Link (URL)"
                  value={localComponent?.content?.href || ''}
                  onChange={(e) => handleContentChange('href', e?.target?.value)}
                  placeholder="https://..."
                />
              </>
            )}

            {/* Image component */}
            {localComponent?.type === 'image' && (
              <>
                <Input
                  label="URL da Imagem"
                  value={localComponent?.content?.src || ''}
                  onChange={(e) => handleContentChange('src', e?.target?.value)}
                  placeholder="https://..."
                />
                <Input
                  label="Texto Alternativo"
                  value={localComponent?.content?.alt || ''}
                  onChange={(e) => handleContentChange('alt', e?.target?.value)}
                  placeholder="Descrição da imagem"
                />
                <Input
                  label="Legenda"
                  value={localComponent?.content?.caption || ''}
                  onChange={(e) => handleContentChange('caption', e?.target?.value)}
                  placeholder="Legenda opcional"
                />
              </>
            )}

            {/* Section component */}
            {localComponent?.type === 'section' && (
              <>
                <Input
                  label="Título da Seção"
                  value={localComponent?.content?.title || ''}
                  onChange={(e) => handleContentChange('title', e?.target?.value)}
                  placeholder="Nova Seção"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Conteúdo</label>
                  <textarea
                    className="w-full h-24 px-3 py-2 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    value={localComponent?.content?.content || ''}
                    onChange={(e) => handleContentChange('content', e?.target?.value)}
                    placeholder="Conteúdo da seção..."
                  />
                </div>
              </>
            )}

            {/* Hero component */}
            {localComponent?.type === 'hero' && (
              <>
                <Input
                  label="Título Principal"
                  value={localComponent?.content?.title || ''}
                  onChange={(e) => handleContentChange('title', e?.target?.value)}
                  placeholder="Digite o título..."
                />
                <Input
                  label="Subtítulo"
                  value={localComponent?.content?.subtitle || ''}
                  onChange={(e) => handleContentChange('subtitle', e?.target?.value)}
                  placeholder="Digite o subtítulo..."
                />
                <Input
                  label="Texto do Botão"
                  value={localComponent?.content?.buttonText || ''}
                  onChange={(e) => handleContentChange('buttonText', e?.target?.value)}
                  placeholder="Call to Action"
                />
                <Input
                  label="Imagem de Fundo"
                  value={localComponent?.content?.backgroundImage || ''}
                  onChange={(e) => handleContentChange('backgroundImage', e?.target?.value)}
                  placeholder="URL da imagem de fundo"
                />
              </>
            )}

            {/* Features component */}
            {localComponent?.type === 'features' && (
              <>
                <Input
                  label="Título da Seção"
                  value={localComponent?.content?.title || ''}
                  onChange={(e) => handleContentChange('title', e?.target?.value)}
                  placeholder="Digite o título..."
                />
                <div className="space-y-3">
                  <label className="text-sm font-medium text-secondary-darker">Recursos</label>
                  {localComponent?.content?.features?.map((feature: any, index: number) => (
                    <div key={index} className="p-3 border border-surface-secondary-default rounded-lg space-y-2">
                      <Input
                        label={`Título do Recurso ${index + 1}`}
                        value={feature?.title || ''}
                        onChange={(e) => {
                          const newFeatures = [...localComponent?.content?.features];
                          newFeatures[index] = { ...feature, title: e?.target?.value };
                          handleContentChange('features', newFeatures);
                        }}
                        placeholder="Nome do recurso"
                      />
                      <Input
                        label="Descrição"
                        value={feature?.description || ''}
                        onChange={(e) => {
                          const newFeatures = [...localComponent?.content?.features];
                          newFeatures[index] = { ...feature, description: e?.target?.value };
                          handleContentChange('features', newFeatures);
                        }}
                        placeholder="Descrição do recurso"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Card component */}
            {localComponent?.type === 'card' && (
              <>
                <Input
                  label="Título do Card"
                  value={localComponent?.content?.title || ''}
                  onChange={(e) => handleContentChange('title', e?.target?.value)}
                  placeholder="Título do Card"
                />
                <Input
                  label="URL da Imagem"
                  value={localComponent?.content?.image || ''}
                  onChange={(e) => handleContentChange('image', e?.target?.value)}
                  placeholder="https://..."
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-darker">Conteúdo</label>
                  <textarea
                    className="w-full h-20 px-3 py-2 border border-surface-secondary-default rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-default"
                    value={localComponent?.content?.content || ''}
                    onChange={(e) => handleContentChange('content', e?.target?.value)}
                    placeholder="Conteúdo do card..."
                  />
                </div>
              </>
            )}

            {/* Testimonial component */}
            {localComponent?.type === 'testimonial' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-darker">Citação</label>
                  <textarea
                    className="w-full h-20 px-3 py-2 border border-surface-secondary-default rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-default"
                    value={localComponent?.content?.quote || ''}
                    onChange={(e) => handleContentChange('quote', e?.target?.value)}
                    placeholder="Esta é uma citação de depoimento incrível!"
                  />
                </div>
                <Input
                  label="Nome do Cliente"
                  value={localComponent?.content?.author || ''}
                  onChange={(e) => handleContentChange('author', e?.target?.value)}
                  placeholder="Nome do Cliente"
                />
                <Input
                  label="Empresa"
                  value={localComponent?.content?.company || ''}
                  onChange={(e) => handleContentChange('company', e?.target?.value)}
                  placeholder="Empresa do Cliente"
                />
                <Input
                  label="Avatar (URL)"
                  value={localComponent?.content?.avatar || ''}
                  onChange={(e) => handleContentChange('avatar', e?.target?.value)}
                  placeholder="https://..."
                />
              </>
            )}

            {/* CTA component */}
            {localComponent?.type === 'cta' && (
              <>
                <Input
                  label="Título"
                  value={localComponent?.content?.title || ''}
                  onChange={(e) => handleContentChange('title', e?.target?.value)}
                  placeholder="Pronto para começar?"
                />
                <Input
                  label="Subtítulo"
                  value={localComponent?.content?.subtitle || ''}
                  onChange={(e) => handleContentChange('subtitle', e?.target?.value)}
                  placeholder="Entre em contato conosco hoje mesmo"
                />
                <Input
                  label="Texto do Botão"
                  value={localComponent?.content?.buttonText || ''}
                  onChange={(e) => handleContentChange('buttonText', e?.target?.value)}
                  placeholder="Começar Agora"
                />
              </>
            )}

            {/* Newsletter component */}
            {localComponent?.type === 'newsletter' && (
              <>
                <Input
                  label="Título"
                  value={localComponent?.content?.title || ''}
                  onChange={(e) => handleContentChange('title', e?.target?.value)}
                  placeholder="Inscreva-se na Newsletter"
                />
                <Input
                  label="Subtítulo"
                  value={localComponent?.content?.subtitle || ''}
                  onChange={(e) => handleContentChange('subtitle', e?.target?.value)}
                  placeholder="Receba as últimas novidades"
                />
                <Input
                  label="Placeholder do Email"
                  value={localComponent?.content?.placeholder || ''}
                  onChange={(e) => handleContentChange('placeholder', e?.target?.value)}
                  placeholder="Seu email..."
                />
                <Input
                  label="Texto do Botão"
                  value={localComponent?.content?.buttonText || ''}
                  onChange={(e) => handleContentChange('buttonText', e?.target?.value)}
                  placeholder="Inscrever"
                />
              </>
            )}
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-secondary-darker mb-3">Estilos</h3>
            
            <Select
              label="Espaçamento"
              options={paddingOptions}
              value={localComponent?.styles?.padding || 'py-8'}
              onChange={(value) => handleStyleChange('padding', value)}
            />

            <Select
              label="Cor de Fundo"
              options={backgroundOptions}
              value={localComponent?.styles?.background || 'bg-white'}
              onChange={(value) => handleStyleChange('background', value)}
            />

            <Select
              label="Cor do Texto"
              options={textColorOptions}
              value={localComponent?.styles?.textColor || 'text-foreground'}
              onChange={(value) => handleStyleChange('textColor', value)}
            />

            {/* Typography options for text components */}
            {['heading', 'text']?.includes(localComponent?.type) && (
              <>
                <Select
                  label="Tamanho da Fonte"
                  options={[
                    { value: 'text-sm', label: 'Pequeno' },
                    { value: 'text-base', label: 'Normal' },
                    { value: 'text-lg', label: 'Grande' },
                    { value: 'text-xl', label: 'Extra Grande' },
                    { value: 'text-2xl', label: '2XL' },
                    { value: 'text-3xl', label: '3XL' },
                    { value: 'text-4xl', label: '4XL' }
                  ]}
                  value={localComponent?.styles?.fontSize || 'text-base'}
                  onChange={(value) => handleStyleChange('fontSize', value)}
                />
                <Select
                  label="Peso da Fonte"
                  options={[
                    { value: 'font-normal', label: 'Normal' },
                    { value: 'font-medium', label: 'Médio' },
                    { value: 'font-semibold', label: 'Semi Negrito' },
                    { value: 'font-bold', label: 'Negrito' }
                  ]}
                  value={localComponent?.styles?.fontWeight || 'font-normal'}
                  onChange={(value) => handleStyleChange('fontWeight', value)}
                />
              </>
            )}

            <div className="pt-4 border-t border-border">
              <label className="text-sm font-medium text-foreground mb-2 block">
                CSS Personalizado
              </label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-surface-secondary-default rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary-default"
                placeholder="/* Adicione CSS personalizado aqui */"
                value={localComponent?.styles?.customCSS || ''}
                onChange={(e) => handleStyleChange('customCSS', e?.target?.value)}
              />
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-secondary-darker mb-3">Layout</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Largura"
                type="text"
                placeholder="auto"
                value={localComponent?.styles?.width || ''}
                onChange={(e) => handleStyleChange('width', e?.target?.value)}
              />
              <Input
                label="Altura"
                type="text"
                placeholder="auto"
                value={localComponent?.styles?.height || ''}
                onChange={(e) => handleStyleChange('height', e?.target?.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Margin X"
                type="text"
                placeholder="mx-auto"
                value={localComponent?.styles?.marginX || ''}
                onChange={(e) => handleStyleChange('marginX', e?.target?.value)}
              />
              <Input
                label="Margin Y"
                type="text"
                placeholder="my-0"
                value={localComponent?.styles?.marginY || ''}
                onChange={(e) => handleStyleChange('marginY', e?.target?.value)}
              />
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Configurações Avançadas</h3>
            
            <Input
              label="ID do Elemento"
              value={localComponent?.id || ''}
              readOnly
              className="bg-surface-secondary-light"
              placeholder="elemento-id"
            />

            <Input
              label="Classes CSS"
              value={localComponent?.styles?.className || ''}
              onChange={(e) => handleStyleChange('className', e?.target?.value)}
              placeholder="classe-personalizada"
            />

            <div className="pt-4 border-t border-surface-secondary-default">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-secondary-darker">Ações</span>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Copy"
                  iconPosition="left"
                  onClick={handleDuplicateComponent}
                >
                  Duplicar Componente
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  fullWidth
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={handleDeleteComponent}
                >
                  Excluir Componente
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;