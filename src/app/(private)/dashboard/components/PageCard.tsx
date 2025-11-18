'use client'

import React, { useState } from 'react';

import Image from '@/components/AppImage';
import Button from '@/components/ui/Button';

interface PageCardProps {
  page: any;
  onEdit: (id: number) => void;
  onDuplicate: (id: number) => void;
  onDelete: (id: number) => void;
  onTogglePublish: (id: number) => void;
  isSelected: boolean;
  onSelect: (id: number, selected: boolean) => void;
}

const PageCard: React.FC<PageCardProps> = ({ 
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
    <div 
      className={`
        relative bg-background-light border border-surface-secondary-default rounded-lg overflow-hidden
        transition-all duration-300 hover:shadow-md group
        ${isSelected ? 'ring-2 ring-primary-default' : ''}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(page?.id, e?.target?.checked)}
          className="w-4 h-4 text-primary-default bg-background-light border-surface-secondary-default rounded focus:ring-primary-default"
        />
      </div>
      {/* Thumbnail */}
      <div className="relative h-48 bg-surface-secondary-light overflow-hidden">
        <Image
          src={page?.thumbnail}
          alt={`Miniatura da página ${page?.title}`}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page?.status)}`}>
            {page?.status === 'published' ? 'Publicado' : 
             page?.status === 'draft' ? 'Rascunho' : 
             page?.status === 'scheduled' ? 'Agendado' : page?.status}
          </span>
        </div>

        {/* Quick Actions Overlay */}
        {showActions && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={() => onEdit(page?.id)}
              iconName="Edit"
              iconSize={16}
              title="Editar página"
              className="h-9 px-3 bg-secondary text-white hover:scale-125 transition-transform"
            >
              <span className="sr-only">Editar</span>
            </Button>
            <Button
              onClick={() => onDuplicate(page?.id)}
              iconName="Copy"
              iconSize={16}
              title="Duplicar página"
              className="h-9 px-3 bg-secondary text-white hover:scale-125 transition-transform"
            >
              <span className="sr-only">Duplicar</span>
            </Button>
            <Button
              onClick={() => onTogglePublish(page?.id)}
              iconName={page?.status === 'published' ? 'EyeOff' : 'Eye'}
              iconSize={16}
              title={page?.status === 'published' ? 'Despublicar' : 'Publicar'}
              className="h-9 px-3 bg-secondary text-white hover:scale-125 transition-transform"
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
              className="h-9 px-3 bg-destructive text-danger-default hover:scale-125 transition-transform"
            >
              <span className="sr-only">Excluir</span>
            </Button>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-secondary-darker mb-2 truncate" title={page?.title}>
          {page?.title}
        </h3>
        
        <div className="space-y-2 text-sm text-secondary-light">
          <div className="flex items-center justify-between">
            <span>Modificado:</span>
            <span>{formatDate(page?.lastModified)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Visualizações:</span>
            <span>{page?.views?.toLocaleString('pt-BR')}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Conversões:</span>
            <span>{page?.conversions?.toLocaleString('pt-BR')}</span>
          </div>
          
          {page?.template && (
            <div className="flex items-center justify-between">
              <span>Template:</span>
              <span className="truncate max-w-24" title={page?.template}>
                {page?.template}
              </span>
            </div>
          )}
        </div>

        {/* Performance Indicator */}
        <div className="mt-3 pt-3 border-t border-surface-secondary-default">
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary-light">Taxa de Conversão</span>
            <span className={`font-medium ${
              page?.conversionRate >= 5 ? 'text-success-default' :
              page?.conversionRate >= 2 ? 'text-warning-default' : 'text-danger-default'
            }`}>
              {page?.conversionRate?.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-surface-secondary-light rounded-full h-1.5 mt-1">
            <div 
              className={`h-1.5 rounded-full transition-all ${
                page?.conversionRate >= 5 ? 'bg-success-default' :
                page?.conversionRate >= 2 ? 'bg-warning-default' : 'bg-danger-default'
              }`}
              style={{ width: `${Math.min(page?.conversionRate * 10, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCard;