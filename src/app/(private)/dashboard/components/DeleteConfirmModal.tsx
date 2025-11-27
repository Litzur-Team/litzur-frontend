'use client'

import React from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pageTitle: string;
  isMultiple?: boolean;
  count?: number;
  isDeleting?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  pageTitle, 
  isMultiple = false,
  count = 1,
  isDeleting = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background-light border border-surface-secondary-default rounded-lg shadow-lg max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-danger-lighter rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="AlertTriangle" size={20} className="text-danger-default" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-secondary-darker">
                {isMultiple ? 'Excluir Páginas' : 'Excluir Página'}
              </h3>
              <p className="text-xs sm:text-sm text-secondary-light mt-1">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            {isMultiple ? (
              <p className="text-sm sm:text-base text-secondary-default">
                Tem certeza de que deseja excluir <strong>{count} página{count > 1 ? 's' : ''}</strong> selecionada{count > 1 ? 's' : ''}? 
                Esta ação removerá permanentemente {count > 1 ? 'as páginas' : 'a página'} e todos os dados associados.
              </p>
            ) : (
              <p className="text-sm sm:text-base text-secondary-default break-words">
                Tem certeza de que deseja excluir a página <strong className="break-all">&quot;{pageTitle}&quot;</strong>? 
                Esta ação removerá permanentemente a página e todos os dados associados.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
            <Button
              onClick={onClose}
              disabled={isDeleting}
              size="sm"
              className="border border-surface-secondary-default hover:bg-surface-secondary-lighter hover:text-secondary-darker w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              loading={isDeleting}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              size="sm"
              className="bg-danger-default text-white hover:bg-danger-dark w-full sm:w-auto"
            >
              {isMultiple ? 'Excluir Páginas' : 'Excluir Página'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;