'use client'

import React from 'react';
import Icon from '@/components/AppIcon';
import PageListItem from './PageListItem';

interface PageListProps {
  pages: any[];
  onEdit: (id: number) => void;
  onDuplicate: (id: number) => void;
  onDelete: (id: number) => void;
  onTogglePublish: (id: number) => void;
  selectedPages: number[];
  onSelectPage: (id: number, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  sortBy: string;
  onSort: (column: string) => void;
}

const PageList: React.FC<PageListProps> = ({ 
  pages, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onTogglePublish,
  selectedPages,
  onSelectPage,
  onSelectAll,
  sortBy,
  onSort
}) => {
  const allSelected = pages?.length > 0 && selectedPages?.length === pages?.length;
  const someSelected = selectedPages?.length > 0 && selectedPages?.length < pages?.length;

  const handleSort = (column: string) => {
    onSort(column);
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return 'ArrowUp';
  };

  if (pages?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-surface-secondary-light rounded-full flex items-center justify-center mb-4">
          <Icon name="FileText" size={32} className="text-secondary-light" />
        </div>
        <h3 className="text-lg font-semibold text-secondary-darker mb-2">
          Nenhuma página encontrada
        </h3>
        <p className="text-secondary-light max-w-md">
          Você ainda não criou nenhuma página ou nenhuma página corresponde aos filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-background-light">
        <thead className="bg-surface-secondary-lighter border-b border-surface-secondary-default">
          <tr>
            <th className="p-4 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={(e) => onSelectAll(e?.target?.checked)}
                className="w-4 h-4 text-primary-default bg-background-light border-surface-secondary-default rounded focus:ring-primary-default"
              />
            </th>
            <th className="p-4 text-left">
              <button
                onClick={() => handleSort('title')}
                className="flex items-center space-x-2 text-sm font-medium text-secondary-darker hover:text-primary-default transition-smooth"
              >
                <span>Página</span>
                <Icon name={getSortIcon('title')} size={14} />
              </button>
            </th>
            <th className="p-4 text-left">
              <button
                onClick={() => handleSort('status')}
                className="flex items-center space-x-2 text-sm font-medium text-secondary-darker hover:text-primary-default transition-smooth"
              >
                <span>Status</span>
                <Icon name={getSortIcon('status')} size={14} />
              </button>
            </th>
            <th className="p-4 text-left">
              <button
                onClick={() => handleSort('lastModified')}
                className="flex items-center space-x-2 text-sm font-medium text-secondary-darker hover:text-primary-default transition-smooth"
              >
                <span>Modificado</span>
                <Icon name={getSortIcon('lastModified')} size={14} />
              </button>
            </th>
            <th className="p-4 text-left">
              <button
                onClick={() => handleSort('views')}
                className="flex items-center space-x-2 text-sm font-medium text-secondary-darker hover:text-primary-default transition-smooth"
              >
                <span>Visualizações</span>
                <Icon name={getSortIcon('views')} size={14} />
              </button>
            </th>
            <th className="p-4 text-left">
              <button
                onClick={() => handleSort('conversions')}
                className="flex items-center space-x-2 text-sm font-medium text-secondary-darker hover:text-primary-default transition-smooth"
              >
                <span>Conversões</span>
                <Icon name={getSortIcon('conversions')} size={14} />
              </button>
            </th>
            <th className="p-4 text-left">
              <button
                onClick={() => handleSort('conversionRate')}
                className="flex items-center space-x-2 text-sm font-medium text-secondary-darker hover:text-primary-default transition-smooth"
              >
                <span>Taxa Conv.</span>
                <Icon name={getSortIcon('conversionRate')} size={14} />
              </button>
            </th>
            <th className="p-4 text-left">
              <span className="text-sm font-medium text-secondary-darker">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {pages?.map((page) => (
            <PageListItem
              key={page?.id}
              page={page}
              onEdit={onEdit}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              onTogglePublish={onTogglePublish}
              isSelected={selectedPages?.includes(page?.id)}
              onSelect={onSelectPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PageList;