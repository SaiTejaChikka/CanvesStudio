import React from 'react';
import { StickerType } from '../types/sticker';

interface StickerButtonProps {
  stickerType: StickerType;
  onClick: () => void;
}

export const StickerButton: React.FC<StickerButtonProps> = ({ stickerType, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-white/30 backdrop-blur-sm bg-gradient-to-br ${stickerType.color}`}
    >
      <div className="flex flex-col items-center space-y-3">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
          {stickerType.emoji}
        </span>
        <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
          {stickerType.label}
        </span>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>
    </button>
  );
};