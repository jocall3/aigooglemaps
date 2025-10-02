// Copyright James Burvel O’Callaghan III
// President Citibank Demo Business Inc.


import React from 'react';
import { Address, Bounds } from '../types';

interface RouteMapProps {
  initialAddresses: Address[];
  optimizedAddresses: Address[] | null;
  selectedAddress: Address | null;
  bounds: Bounds;
}

export const RouteMap: React.FC<RouteMapProps> = ({ initialAddresses, optimizedAddresses, selectedAddress, bounds }) => {
    
  const addressesToDisplay = optimizedAddresses || initialAddresses;

  const project = (lat: number, lon: number, width: number, height: number) => {
    const x = ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * width;
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * height;
    return { x, y };
  };

  return (
    <div className="w-full h-full relative">
       <svg width="100%" height="100%" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
        <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6"
                orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
            </marker>
        </defs>
        
        {/* Initial Route Path (dashed grey) */}
        {optimizedAddresses && initialAddresses.length > 1 && (
            <path
                d={initialAddresses.map((addr, i) => {
                    const { x, y } = project(addr.lat, addr.lon, 500, 300);
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#d1d5db"
                strokeWidth="2"
                strokeDasharray="4 4"
            />
        )}

        {/* Optimized Route Path (solid blue) */}
        {addressesToDisplay.length > 1 && (
            <path
                d={addressesToDisplay.map((addr, i) => {
                    const { x, y } = project(addr.lat, addr.lon, 500, 300);
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2.5"
                markerEnd="url(#arrow)"
            />
        )}
        
        {/* Address Points */}
        {addressesToDisplay.map((addr, index) => {
          const { x, y } = project(addr.lat, addr.lon, 500, 300);
          const isSelected = selectedAddress?.id === addr.id;
          return (
            <g key={addr.id} transform={`translate(${x}, ${y})`} className="cursor-pointer">
              <circle
                cx="0"
                cy="0"
                r={isSelected ? 8 : 5}
                fill={isSelected ? '#1e40af' : '#2563eb'}
                stroke="#fff"
                strokeWidth="2"
              />
              <text
                x="0"
                y="-10"
                textAnchor="middle"
                fontSize="10"
                fill="#111827"
                className="font-bold"
              >
                {index + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/70 p-1 rounded">
        Map is a schematic representation for visualization purposes.
      </div>
    </div>
  );
};
