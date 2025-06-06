export interface Sticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

export interface StickerType {
  emoji: string;
  label: string;
  color: string;
}