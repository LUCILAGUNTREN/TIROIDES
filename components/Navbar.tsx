import React from 'react';
import { type Calculator } from '../types';
import { CALCULATORS } from '../constants';

interface NavbarProps {
  activeCalculator: Calculator;
  setActiveCalculator: (calculator: Calculator) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeCalculator, setActiveCalculator }) => {
  return (
    <aside className="w-full lg:w-72 lg:flex-shrink-0">
      <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
        <h3 className="font-bold text-lg mb-4 text-slate-800 px-2">Calculadoras</h3>
        <nav className="space-y-1">
          {CALCULATORS.map(({ id, name, icon }) => (
            <button
              key={id}
              onClick={() => setActiveCalculator(id)}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                activeCalculator === id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {icon}
              {name}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
