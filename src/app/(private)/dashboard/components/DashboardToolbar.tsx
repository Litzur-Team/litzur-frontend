'use client'

import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface DashboardToolbarProps {
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  filterStatus: string;
  onFilterStatusChange: (status: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkPublish: () => void;
  onBulkUnpublish: () => void;
  onCreateNew: (type: string) => void;
}

const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  filterStatus,
  onFilterStatusChange,
  searchQuery,
  onSearchChange,
  selectedCount,
  onBulkDelete,
  onBulkPublish,
  onBulkUnpublish,
  onCreateNew
}) => {
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const sortOptions = [
    { value: 'lastModified', label: 'Última Modificação' },
    { value: 'title', label: 'Nome' },
    { value: 'status', label: 'Status' },
    { value: 'views', label: 'Visualizações' },
    { value: 'conversions', label: 'Conversões' },
    { value: 'conversionRate', label: 'Taxa de Conversão' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'published', label: 'Publicado' },
    { value: 'draft', label: 'Rascunho' },
    { value: 'scheduled', label: 'Agendado' }
  ];

  const createOptions = [
    {
      label: 'Página em Branco',
      icon: 'FileText',
      action: () => onCreateNew('blank')
    },
    {
      label: 'A partir de Template',
      icon: 'Layout',
      action: () => onCreateNew('template')
    },
    {
      label: 'Duplicar Existente',
      icon: 'Copy',
      action: () => onCreateNew('duplicate')
    }
  ];

  const bulkActions = [
    {
      label: 'Publicar Selecionados',
      icon: 'Eye',
      action: onBulkPublish,
      variant: 'default'
    },
    {
      label: 'Despublicar Selecionados',
      icon: 'EyeOff',
      action: onBulkUnpublish,
      variant: 'secondary'
    },
    {
      label: 'Excluir Selecionados',
      icon: 'Trash2',
      action: onBulkDelete,
      variant: 'destructive'
    }
  ];

  return (
    <div className="bg-background-light border-b border-surface-secondary-default p-4 space-y-4 shadow-sm">
      {/* Top Row - Search and Create */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Buscar páginas..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        <div className="relative">
          <Button
            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            variant={'success'}
            className='text-white hover:bg-success-dark'
          >
            Criar Nova Página
          </Button>

          {showCreateDropdown && (
            <>
              <div 
                className="fixed inset-0 z-dropdown" 
                onClick={() => setShowCreateDropdown(false)}
              />
              <div className="absolute z-50 right-0 top-full mt-2 w-56 bg-background-light border border-surface-secondary-default rounded-lg shadow-lg z-dropdown">
                <div className="py-2">
                  {createOptions?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        option?.action();
                        setShowCreateDropdown(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-secondary-default hover:bg-surface-secondary-lighter transition-smooth"
                    >
                      <Icon name={option?.icon} size={16} className="mr-3" />
                      {option?.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Bottom Row - Filters and View Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Side - Filters and Bulk Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(value) => onSortChange(Array.isArray(value) ? value[0] : value)}
              placeholder="Ordenar por"
              className="w-48"
            />

            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={(value) => onFilterStatusChange(Array.isArray(value) ? value[0] : value)}
              placeholder="Filtrar status"
              className="w-44"
            />
          </div>

          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-light">
                {selectedCount} selecionado{selectedCount > 1 ? 's' : ''}
              </span>
              
              <div className="relative">
                <Button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  iconName="MoreHorizontal"
                  iconSize={16}
                  className="h-9 border border-secondary-default/20 hover:bg-accent hover:text-accent-foreground"
                >
                  Ações
                </Button>

                {showBulkActions && (
                  <>
                    <div 
                      className="fixed inset-0 z-dropdown" 
                      onClick={() => setShowBulkActions(false)}
                    />
                    <div className="absolute z-50 left-0 top-full mt-2 w-max bg-background-light border border-surface-secondary-default rounded-lg shadow-lg z-dropdown">
                      <div className="py-2">
                        {bulkActions?.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              action?.action();
                              setShowBulkActions(false);
                            }}
                            className={`
                              w-full flex items-center px-4 py-2 text-sm transition-smooth
                              ${action?.variant === 'destructive' ?'text-danger-default hover:bg-danger-lighter' :'text-secondary-default hover:bg-surface-secondary-lighter'
                              }
                            `}
                          >
                            <Icon name={action?.icon} size={16} className="mr-3" />
                            {action?.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - View Toggle */}
        <div className="flex items-center bg-surface-secondary-light rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
              transition-smooth
              ${viewMode === 'grid' ?'bg-background-light text-secondary-darker shadow-sm' :'text-secondary-light hover:text-secondary-darker'
              }
            `}
            title="Visualização em Grade"
          >
            <Icon name="Grid3X3" size={16} />
            <span className="hidden sm:inline">Grade</span>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
              transition-smooth
              ${viewMode === 'list' ?'bg-background-light text-secondary-darker shadow-sm' :'text-secondary-light hover:text-secondary-darker'
              }
            `}
            title="Visualização em Lista"
          >
            <Icon name="List" size={16} />
            <span className="hidden sm:inline">Lista</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardToolbar;