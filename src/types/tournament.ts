export interface PinPosition {
  x: number;
  y: number;
  posX: string;
  posY: string;
}

export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  pins: (PinPosition | null)[];
}