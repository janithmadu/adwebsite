import React from 'react';
import { ScrollText } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <ScrollText className="w-16 h-16 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}