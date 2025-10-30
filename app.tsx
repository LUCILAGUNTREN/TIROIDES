import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TiradsCalculator from './components/TiradsCalculator';
import TnmCalculator from './components/TnmCalculator';
import AtaRiskCalculator from './components/AtaRiskCalculator';
import DynamicRiskCalculator from './components/DynamicRiskCalculator';
import RaiDoseCalculator from './components/RaiDoseCalculator';
import LevothyroxineCalculator from './components/LevothyroxineCalculator';
import { type Calculator } from './types';

const App: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<Calculator>('TIRADS');

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'TIRADS':
        return <TiradsCalculator />;
      case 'TNM':
        return <TnmCalculator />;
      case 'ATA Risk':
        return <AtaRiskCalculator />;
      case 'Dynamic Risk':
        return <DynamicRiskCalculator />;
      case 'RAI Dose':
        return <RaiDoseCalculator />;
      case 'Levothyroxine':
        return <LevothyroxineCalculator />;
      default:
        return <TiradsCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">
              Calculadoras Clínicas de Cáncer de Tiroides
            </h1>
            <p className="text-sm text-slate-500 font-medium">Basado en las Guías ATA 2025</p>
          </div>
        </div>
      </header>
      
      <div className="flex flex-col lg:flex-row container mx-auto p-4 lg:p-6 gap-6 lg:gap-8">
        <Navbar activeCalculator={activeCalculator} setActiveCalculator={setActiveCalculator} />
        <main className="flex-1">
          <div className="w-full transition-all duration-300">
            {renderCalculator()}
          </div>
        </main>
      </div>

      <footer className="bg-white mt-8 py-5 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>Esta herramienta es solo para fines informativos y no constituye un consejo médico. Consulte a un profesional de la salud calificado para cualquier inquietud médica.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
