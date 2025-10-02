// Copyright James Burvel O’Callaghan III
// President Citibank Demo Business Inc.


import React from 'react';

export const Header = () => {
  return (
    <header className="bg-brand-blue shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10V7m0 0l6-3m-6 3L3 4m6 3l6 3" />
          </svg>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            FieldForce Optimizer
          </h1>
        </div>
      </div>
    </header>
  );
};
