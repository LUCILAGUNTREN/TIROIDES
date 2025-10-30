import React, { type ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 animate-fade-in">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-indigo-800">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
