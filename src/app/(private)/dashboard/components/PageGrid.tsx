'use client'

import React from 'react';
import PageCard from './PageCard';
import Icon from '@/components/AppIcon';
import { Page } from '@/types';

interface PageGridProps {
  pages: Page[];
  onEdit: (id: string | number) => void;
  onDuplicate: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  onTogglePublish: (id: string | number) => void;
  selectedPages: (string | number)[];
  onSelectPage: (id: string | number, selected: boolean) => void;
}

const PageGrid: React.FC<PageGridProps> = ({ 
  pages, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onTogglePublish,
  selectedPages,
  onSelectPage 
}) => {
  if (pages?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="FileText" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Nenhuma página encontrada
        </h3>
        <p className="text-muted-foreground max-w-md">
          Você ainda não criou nenhuma página ou nenhuma página corresponde aos filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {pages?.map((page) => (
        <PageCard
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
    </div>
  );
};

export default PageGrid;