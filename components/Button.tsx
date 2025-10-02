// Copyright James Burvel O’Callaghan III
// President Citibank Demo Business Inc.


import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center px-4 py-2 border border-transparent 
        text-sm font-medium rounded-md shadow-sm text-white bg-brand-blue 
        hover:bg-brand-blue-light focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-brand-blue-light transition-colors duration-200
        disabled:bg-gray-400 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <div className="flex items-center space-x-2">
        {children}
      </div>
    </button>
  );
};
