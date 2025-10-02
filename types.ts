// Copyright James Burvel O’Callaghan III
// President Citibank Demo Business Inc.


export interface Address {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  travelTimeFromPrevious?: number | null;
  distanceFromPrevious?: number | null;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ServiceLogData {
  notes: string;
  photoFileName: string | null;
  checklist: ChecklistItem[];
  timestamp: string;
}

export interface Bounds {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
}
