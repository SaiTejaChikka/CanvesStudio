import React, { useState, useCallback } from 'react';
import { StickerCanvas } from './components/StickerCanvas';
import { StickerControls } from './components/StickerControls';
import { Sticker } from './types/sticker';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 40;

// Smart positioning to avoid overlapping stickers
const getNextPosition = (existingStickers: Sticker[]): { x: number; y: number } => {
  const gridColumns = Math.floor(CANVAS_WIDTH / GRID_SIZE);
  const gridRows = Math.floor(CANVAS_HEIGHT / GRID_SIZE);
  
  // Create a grid to track occupied positions
  const occupiedPositions = new Set(
    existingStickers.map(s => `${s.x}-${s.y}`)
  );
  
  // Find the first available position in a spiral pattern from center
  const centerX = Math.floor(gridColumns / 2) * GRID_SIZE;
  const centerY = Math.floor(gridRows / 2) * GRID_SIZE;
  
  // Try center first
  if (!occupiedPositions.has(`${centerX}-${centerY}`)) {
    return { x: centerX, y: centerY };
  }
  
  // Spiral outward from center
  for (let radius = 1; radius <= Math.max(gridColumns, gridRows); radius++) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
        
        const x = centerX + dx * GRID_SIZE;
        const y = centerY + dy * GRID_SIZE;
        
        if (x >= 0 && x < CANVAS_WIDTH && y >= 0 && y < CANVAS_HEIGHT) {
          if (!occupiedPositions.has(`${x}-${y}`)) {
            return { x, y };
          }
        }
      }
    }
  }
  
  // Fallback to random position if all positions are somehow occupied
  return {
    x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)) * GRID_SIZE,
    y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)) * GRID_SIZE,
  };
};

function App() {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  const addSticker = useCallback((emoji: string) => {
    const position = getNextPosition(stickers);
    const newSticker: Sticker = {
      id: `sticker-${Date.now()}-${Math.random()}`,
      emoji,
      x: position.x,
      y: position.y,
      size: 32,
    };
    
    setStickers(prev => [...prev, newSticker]);
  }, [stickers]);

  const moveStickerHandler = useCallback((id: string, x: number, y: number) => {
    setStickers(prev => 
      prev.map(sticker => 
        sticker.id === id 
          ? { ...sticker, x: Math.max(0, Math.min(x, CANVAS_WIDTH - 40)), y: Math.max(0, Math.min(y, CANVAS_HEIGHT - 40)) }
          : sticker
      )
    );
  }, []);

  const deleteStickerHandler = useCallback((id: string) => {
    setStickers(prev => prev.filter(sticker => sticker.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Sticker Canvas Studio
          </h1>
          <p className="text-white/80 text-lg">
            Create, arrange, and download your custom sticker compositions
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Controls */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <StickerControls 
              onAddSticker={addSticker}
              stickerCount={stickers.length}
            />
          </div>

          {/* Canvas */}
          <div className="flex-1 flex justify-center">
            <StickerCanvas
              stickers={stickers}
              onStickerMove={moveStickerHandler}
              onStickerDelete={deleteStickerHandler}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            Built with React, TypeScript, and Konva • Drag stickers, double-click to delete, download as PNG
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;