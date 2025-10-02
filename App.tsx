// Copyright James Burvel O’Callaghan III
// President Citibank Demo Business Inc.


import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { AddressList } from './components/AddressList';
import { RouteMap } from './components/RouteMap';
import { ServiceLog } from './components/ServiceLog';
import { Button } from './components/Button';
import { Spinner } from './components/Spinner';
import { INITIAL_ADDRESSES, TAMPA_BOUNDS } from './constants';
import { Address, ServiceLogData } from './types';
import { getOptimizedRoute } from './services/geminiService';
import { IconOptimize, IconError } from './components/Icons';

export default function App() {
  const [optimizedAddresses, setOptimizedAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [serviceLogs, setServiceLogs] = useState<Map<string, ServiceLogData>>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptimizeRoute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setOptimizedAddresses(null);
    setSelectedAddress(null);
    try {
      const optimized = await getOptimizedRoute(INITIAL_ADDRESSES);
      setOptimizedAddresses(optimized);
    } catch (e) {
      console.error(e);
      setError('Failed to optimize route. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };
  
  const handleSaveLog = (log: ServiceLogData) => {
    if (!selectedAddress) return;
    const newLogs = new Map(serviceLogs);
    newLogs.set(selectedAddress.id, log);
    setServiceLogs(newLogs);
    alert(`Service log saved for ${selectedAddress.name}`);
  };

  const initialStats = useMemo(() => ({
    totalDistance: 0,
    totalTime: 0
  }), []);

  const optimizedStats = useMemo(() => {
    if (!optimizedAddresses) return { totalDistance: 0, totalTime: 0 };
    return optimizedAddresses.reduce((acc, curr) => {
      acc.totalDistance += curr.distanceFromPrevious ?? 0;
      acc.totalTime += curr.travelTimeFromPrevious ?? 0;
      return acc;
    }, { totalDistance: 0, totalTime: 0 });
  }, [optimizedAddresses]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-brand-text">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Route Lists and Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Route Planner</h2>
              <Button onClick={handleOptimizeRoute} disabled={isLoading} className="w-full">
                {isLoading ? <Spinner /> : <IconOptimize />}
                {isLoading ? 'Optimizing...' : 'Optimize Route with AI'}
              </Button>
              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-start space-x-2">
                  <IconError />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
            
            <AddressList 
              title="Initial Unordered Route"
              addresses={INITIAL_ADDRESSES}
              onAddressSelect={handleSelectAddress}
              selectedAddressId={selectedAddress?.id}
              stats={initialStats}
            />
            
            {optimizedAddresses && (
              <AddressList 
                title="AI-Optimized Route"
                addresses={optimizedAddresses}
                onAddressSelect={handleSelectAddress}
                selectedAddressId={selectedAddress?.id}
                stats={optimizedStats}
              />
            )}
          </div>

          {/* Right Column: Map and Service Log */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md h-[400px]">
               <h2 className="text-xl font-bold mb-4 text-gray-800">Route Visualization</h2>
              <RouteMap 
                initialAddresses={INITIAL_ADDRESSES}
                optimizedAddresses={optimizedAddresses}
                selectedAddress={selectedAddress}
                bounds={TAMPA_BOUNDS}
              />
            </div>

            {selectedAddress ? (
              <ServiceLog 
                key={selectedAddress.id}
                address={selectedAddress}
                onSave={handleSaveLog}
                initialLog={serviceLogs.get(selectedAddress.id)}
              />
            ) : (
               <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
                 <h3 className="text-xl font-semibold text-gray-700">Select an Address</h3>
                 <p className="text-gray-500 mt-2">Click on an address in the route lists to view details and log service information.</p>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
