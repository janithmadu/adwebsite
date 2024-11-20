import React from 'react';

interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-4 text-gray-600">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <div className="min-w-2 h-2 w-2 rounded-full bg-indigo-600 mt-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}