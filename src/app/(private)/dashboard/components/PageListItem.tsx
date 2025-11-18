'use client'

import React, { useState } from 'react';

import Image from '@/components/AppImage';
import Button from '@/components/ui/Button';

interface PageListItemProps {
  page: any;
  onEdit: (id: number) => void;
  onDuplicate: (id: number) => void;
  onDelete: (id: number) => void;
  onTogglePublish: (id: number) => void;
  isSelected: boolean;
  onSelect: (id: number, selected: boolean) => void;
}

const PageListItem: React.FC<PageListItemProps> = ({ 
  page, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onTogglePublish,
  isSelected,
  onSelect 
}) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success-default text-white';
      case 'draft': return 'bg-warning-default text-white';
      case 'scheduled': return 'bg-info-default text-white';
      default: return 'bg-secondary-default text-white';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date)?.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <tr 
      className={`
        border-b border-surface-secondary-default hover:bg-surface-secondary-lighter transition-colors
        ${isSelected ? 'bg-primary-lighter/20' : ''}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Selection */}
      <td className="p-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(page?.id, e?.target?.checked)}
          className="w-4 h-4 text-primary-default bg-background-light border-surface-secondary-default rounded focus:ring-primary-default"
        />
      </td>
      {/* Thumbnail & Title */}
      <td className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-8 bg-surface-secondary-light rounded overflow-hidden flex-shrink-0">
            <Image
              src={page?.thumbnail}
              alt={`Miniatura da página ${page?.title}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-secondary-darker">{page?.title}</div>
            {page?.template && (
              <div className="text-sm text-secondary-light">
                Template: {page?.template}
              </div>
            )}
          </div>
        </div>
      </td>
      {/* Status */}
      <td className="p-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page?.status)}`}>
          {page?.status === 'published' ? 'Publicado' : 
           page?.status === 'draft' ? 'Rascunho' : 
           page?.status === 'scheduled' ? 'Agendado' : page?.status}
        </span>
      </td>
      {/* Last Modified */}
      <td className="p-4 text-sm text-secondary-light">
        {formatDate(page?.lastModified)}
      </td>
      {/* Views */}
      <td className="p-4 text-sm text-secondary-default">
        {page?.views?.toLocaleString('pt-BR')}
      </td>
      {/* Conversions */}
      <td className="p-4 text-sm text-secondary-default">
        {page?.conversions?.toLocaleString('pt-BR')}
      </td>
      {/* Conversion Rate */}
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${
            page?.conversionRate >= 5 ? 'text-success-default' :
            page?.conversionRate >= 2 ? 'text-warning-default' : 'text-danger-default'
          }`}>
            {page?.conversionRate?.toFixed(1)}%
          </span>
          <div className="w-16 bg-surface-secondary-light rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all ${
                page?.conversionRate >= 5 ? 'bg-success-default' :
                page?.conversionRate >= 2 ? 'bg-warning-default' : 'bg-danger-default'
              }`}
              style={{ width: `${Math.min(page?.conversionRate * 10, 100)}%` }}
            />
          </div>
        </div>
      </td>
      {/* Actions */}
      <td className="p-4">
        <div className={`flex items-center space-x-1 transition-opacity ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            onClick={() => onEdit(page?.id)}
            iconName="Edit"
            iconSize={16}
            title="Editar página"
            className="h-9 px-3 hover:scale-125 transition-transform"
          >
            <span className="sr-only">Editar</span>
          </Button>
          <Button
            onClick={() => onDuplicate(page?.id)}
            iconName="Copy"
            iconSize={16}
            title="Duplicar página"
            className="h-9 px-3 hover:scale-125 transition-transform"
          >
            <span className="sr-only">Duplicar</span>
          </Button>
          <Button
            onClick={() => onTogglePublish(page?.id)}
            iconName={page?.status === 'published' ? 'EyeOff' : 'Eye'}
            iconSize={16}
            title={page?.status === 'published' ? 'Despublicar' : 'Publicar'}
            className="h-9 px-3 hover:scale-125 transition-transform"
          >
            <span className="sr-only">
              {page?.status === 'published' ? 'Despublicar' : 'Publicar'}
            </span>
          </Button>
          <Button
            onClick={() => onDelete(page?.id)}
            iconName="Trash2"
            iconSize={16}
            title="Excluir página"
            className="h-9 px-3 text-danger-default hover:scale-125 transition-transform"
          >
            <span className="sr-only">Excluir</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default PageListItem;