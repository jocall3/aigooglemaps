
import React from 'react';
import { Address } from '../types';
import { IconLocation, IconClock, IconRoute } from './Icons';

interface AddressListProps {
  title: string;
  addresses: Address[];
  onAddressSelect: (address: Address) => void;
  selectedAddressId?: string;
  stats: {
    totalDistance: number;
    totalTime: number;
  };
}

export const AddressList: React.FC<AddressListProps> = ({ title, addresses, onAddressSelect, selectedAddressId, stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <ul className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
        {addresses.map((address, index) => (
          <li
            key={address.id}
            onClick={() => onAddressSelect(address)}
            className={`p-4 cursor-pointer transition-colors duration-200 ${
              selectedAddressId === address.id
                ? 'bg-blue-100'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1 h-6 w-6 flex items-center justify-center bg-brand-blue text-white rounded-full text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-md font-semibold text-brand-blue-light truncate">{address.name}</p>
                <p className="text-sm text-gray-500 truncate">{address.address}</p>
                {address.distanceFromPrevious != null && address.travelTimeFromPrevious != null && index > 0 && (
                   <div className="text-xs text-gray-600 mt-2 flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                          <IconRoute />
                          <span>{address.distanceFromPrevious.toFixed(1)} mi</span>
                      </div>
                      <div className="flex items-center space-x-1">
                          <IconClock />
                          <span>{address.travelTimeFromPrevious.toFixed(0)} min</span>
                      </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {stats.totalDistance > 0 && (
         <div className="p-4 bg-gray-50 border-t border-gray-200">
            <h4 className="font-semibold text-gray-700">Route Totals:</h4>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
              <div className="flex items-center space-x-1">
                <IconRoute />
                <span>Total Distance: <span className="font-bold">{stats.totalDistance.toFixed(1)} mi</span></span>
              </div>
              <div className="flex items-center space-x-1">
                <IconClock />
                <span>Total Time: <span className="font-bold">{stats.totalTime.toFixed(0)} min</span></span>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};
