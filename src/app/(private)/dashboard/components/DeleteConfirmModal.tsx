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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-background-light border border-surface-secondary-default rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-danger-lighter rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-danger-default" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-darker">
                {isMultiple ? 'Excluir Páginas' : 'Excluir Página'}
              </h3>
              <p className="text-sm text-secondary-light">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            {isMultiple ? (
              <p className="text-secondary-default">
                Tem certeza de que deseja excluir <strong>{count} página{count > 1 ? 's' : ''}</strong> selecionada{count > 1 ? 's' : ''}? 
                Esta ação removerá permanentemente {count > 1 ? 'as páginas' : 'a página'} e todos os dados associados.
              </p>
            ) : (
              <p className="text-secondary-default">
                Tem certeza de que deseja excluir a página <strong>&quot;{pageTitle}&quot;</strong>? 
                Esta ação removerá permanentemente a página e todos os dados associados.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              onClick={onClose}
              disabled={isDeleting}
              className="border border-surface-secondary-default hover:bg-surface-secondary-lighter hover:text-secondary-darker"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              loading={isDeleting}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              className="bg-danger-default text-white hover:bg-danger-dark"
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