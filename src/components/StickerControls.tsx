import React from 'react';
import { StickerButton } from './StickerButton';
import { StickerType } from '../types/sticker';

interface StickerControlsProps {
  onAddSticker: (emoji: string) => void;
  stickerCount: number;
}

const STICKER_TYPES: StickerType[] = [
  { emoji: '😀', label: 'Happy', color: 'from-yellow-400 to-orange-500' },
  { emoji: '❤️', label: 'Love', color: 'from-red-400 to-pink-500' },
  { emoji: '⭐', label: 'Star', color: 'from-blue-400 to-purple-500' },
];

export const StickerControls: React.FC<StickerControlsProps> = ({ 
  onAddSticker, 
  stickerCount 
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          Add Stickers
        </h2>
        
        <div className="space-y-4">
          {STICKER_TYPES.map((stickerType) => (
            <StickerButton
              key={stickerType.emoji}
              stickerType={stickerType}
              onClick={() => onAddSticker(stickerType.emoji)}
            />
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-white/10 rounded-lg text-center">
          <p className="text-white/80 text-sm">
            Total Stickers
          </p>
          <p className="text-2xl font-bold text-white mt-1">
            {stickerCount}
          </p>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
        <h3 className="text-sm font-medium text-white/90 mb-2">Quick Tips</h3>
        <ul className="text-xs text-white/70 space-y-1">
          <li>• Click buttons to add stickers</li>
          <li>• Drag stickers to move them</li>
          <li>• Double-click to delete</li>
          <li>• Auto-snaps to grid</li>
        </ul>
      </div>
    </div>
  );
};