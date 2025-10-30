import React, { type ReactNode } from 'react';

interface ResultDisplayProps {
  title: string;
  color: string;
  children: ReactNode;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ title, color, children }) => {
  return (
    <div className={`mt-6 p-5 rounded-lg border-l-4 ${color}`}>
      <h3 className="text-base font-semibold text-slate-600 mb-2">{title}</h3>
      <div className="text-slate-700 space-y-2">
        {children}
      </div>
    </div>
  );
};

export default ResultDisplay;
