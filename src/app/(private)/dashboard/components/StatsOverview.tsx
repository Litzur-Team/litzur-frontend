'use client'

import React from 'react';
import Icon from '@/components/AppIcon';

interface StatsOverviewProps {
  stats: {
    totalPages: number;
    publishedPages: number;
    draftPages: number;
    totalViews: number;
  };
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total de Páginas',
      value: stats?.totalPages,
      icon: 'FileText',
      color: 'text-primary-default',
      bgColor: 'bg-primary-lighter'
    },
    {
      title: 'Páginas Publicadas',
      value: stats?.publishedPages,
      icon: 'Eye',
      color: 'text-success-default',
      bgColor: 'bg-success-lighter'
    },
    {
      title: 'Rascunhos',
      value: stats?.draftPages,
      icon: 'Edit',
      color: 'text-warning-default',
      bgColor: 'bg-warning-lighter'
    },
    {
      title: 'Visualizações Totais',
      value: stats?.totalViews?.toLocaleString('pt-BR'),
      icon: 'BarChart3',
      color: 'text-info-default',
      bgColor: 'bg-info-lighter'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-surface-secondary-lighter">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-background-light border border-surface-secondary-default rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-light mb-1">{stat?.title}</p>
              <p className="text-2xl font-bold text-secondary-darker">{stat?.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;