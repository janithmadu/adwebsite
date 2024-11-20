import React from 'react';
import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="text-center text-gray-500 text-sm">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Globe className="w-4 h-4" />
        <span>Available in multiple languages</span>
      </div>
      <p>© {new Date().getFullYear()} Arzaq. All rights reserved.</p>
    </footer>
  );
}