import React, { useRef, useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { Sticker } from '../types/sticker';

interface StickerCanvasProps {
  stickers: Sticker[];
  onStickerMove: (id: string, x: number, y: number) => void;
  onStickerDelete: (id: string) => void;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 40;

const snapToGrid = (value: number): number => {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
};

export const StickerCanvas: React.FC<StickerCanvasProps> = ({
  stickers,
  onStickerMove,
  onStickerDelete,
}) => {
  const stageRef = useRef<any>(null);
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);

  const handleDownload = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL({
        mimeType: 'image/png',
        quality: 1,
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.download = 'sticker-canvas.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm bg-opacity-95 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Canvas</h2>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
          >
            Download PNG
          </button>
        </div>
        
        <div 
          className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-inner bg-gradient-to-br from-gray-50 to-white"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
          <Stage
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            ref={stageRef}
          >
            <Layer>
              {/* Grid pattern (subtle visual guide) */}
              {Array.from({ length: Math.ceil(CANVAS_WIDTH / GRID_SIZE) }).map((_, i) =>
                Array.from({ length: Math.ceil(CANVAS_HEIGHT / GRID_SIZE) }).map((_, j) => (
                  <Text
                    key={`grid-${i}-${j}`}
                    x={i * GRID_SIZE + 2}
                    y={j * GRID_SIZE + 2}
                    text="·"
                    fontSize={4}
                    fill="#e5e7eb"
                  />
                ))
              )}
              
              {/* Stickers */}
              {stickers.map((sticker) => (
                <Text
                  key={sticker.id}
                  x={sticker.x}
                  y={sticker.y}
                  text={sticker.emoji}
                  fontSize={sticker.size}
                  draggable
                  onDragStart={() => setDraggedSticker(sticker.id)}
                  onDragEnd={(e) => {
                    const snappedX = snapToGrid(e.target.x());
                    const snappedY = snapToGrid(e.target.y());
                    onStickerMove(sticker.id, snappedX, snappedY);
                    setDraggedSticker(null);
                  }}
                  onDblClick={() => onStickerDelete(sticker.id)}
                  opacity={draggedSticker === sticker.id ? 0.7 : 1}
                  shadowColor="rgba(0,0,0,0.2)"
                  shadowBlur={draggedSticker === sticker.id ? 8 : 3}
                  shadowOffset={{ x: 2, y: 2 }}
                  className="cursor-pointer"
                />
              ))}
            </Layer>
          </Stage>
        </div>
        
        <p className="text-sm text-gray-500 mt-2 text-center">
          Drag stickers to move • Double-click to delete • Snaps to 40px grid
        </p>
      </div>
    </div>
  );
};