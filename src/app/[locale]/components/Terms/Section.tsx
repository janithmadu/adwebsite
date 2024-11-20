import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export function Section({ icon: Icon, title, children }: SectionProps) {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}