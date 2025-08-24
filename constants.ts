
import { Address, ChecklistItem, Bounds } from './types';

export const INITIAL_ADDRESSES: Address[] = [
  { id: '1', name: 'Tampa General Hospital', address: '1 Tampa General Cir, Tampa, FL 33606', lat: 27.9398, lon: -82.4599 },
  { id: '2', name: 'University of Tampa', address: '401 W Kennedy Blvd, Tampa, FL 33606', lat: 27.9472, lon: -82.4647 },
  { id: '3', name: 'ZooTampa at Lowry Park', address: '1101 W Sligh Ave, Tampa, FL 33604', lat: 28.0076, lon: -82.4697 },
  { id: '4', name: 'Amalie Arena', address: '401 Channelside Dr, Tampa, FL 33602', lat: 27.9427, lon: -82.4522 },
  { id: '5', name: 'International Plaza and Bay Street', address: '2223 N Westshore Blvd, Tampa, FL 33607', lat: 27.9625, lon: -82.5222 },
  { id: '6', name: 'Busch Gardens Tampa Bay', address: '10165 N McKinley Dr, Tampa, FL 33612', lat: 28.0373, lon: -82.4194 },
  { id: '7', name: 'Florida Aquarium', address: '701 Channelside Dr, Tampa, FL 33602', lat: 27.9428, lon: -82.4479 },
  { id: '8', name: 'Raymond James Stadium', address: '4201 N Dale Mabry Hwy, Tampa, FL 33607', lat: 27.9799, lon: -82.5033 },
  { id: '9', name: 'Ybor City State Museum', address: '1818 E 9th Ave, Tampa, FL 33605', lat: 27.9602, lon: -82.4382 },
  { id: '10', name: 'Tampa International Airport (TPA)', address: '4100 George J Bean Pkwy, Tampa, FL 33607', lat: 27.9755, lon: -82.5332 },
];


export const POOL_SERVICE_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', text: 'Test chemical levels (Chlorine, pH, Alkalinity)', completed: false },
  { id: 'c2', text: 'Add necessary chemicals', completed: false },
  { id: 'c3', text: 'Empty skimmer and pump baskets', completed: false },
  { id: 'c4', text: 'Skim pool surface for debris', completed: false },
  { id: 'c5', text: 'Brush pool walls and steps', completed: false },
  { id: 'c6', text: 'Backwash filter if pressure is high', completed: false },
  { id: 'c7', text: 'Inspect equipment for leaks or issues', completed: false },
];

export const TAMPA_BOUNDS: Bounds = {
    minLat: 27.93,
    maxLat: 28.05,
    minLon: -82.55,
    maxLon: -82.41
};
