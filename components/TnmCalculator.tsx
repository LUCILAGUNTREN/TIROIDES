import React, { useState, useMemo } from 'react';
import Card from './shared/Card';
import SelectInput from './shared/SelectInput';
import ResultDisplay from './shared/ResultDisplay';
import TnmClassificationModal from './TnmClassificationModal';
import { type TnmInputs } from '../types';

const TnmCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<TnmInputs>({
    edition: '8',
    age: 50,
    t: 'T1a',
    n: 'N0',
    m: 'M0',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value, 10) || 0 : value }));
  };

  const { tnmStage, criteria } = useMemo(() => {
    const { edition, age, t, n, m } = inputs;
    let stage = '';
    let criteriaText = '';

    if (edition === '8') {
      const ageCutoff = 55;
      criteriaText = `Usando AJCC 8ª Edición (corte de edad: ${ageCutoff} años).`;
      
      if (age < ageCutoff) {
        stage = m === 'M1' ? 'Estadio II' : 'Estadio I';
      } else { // age >= 55
        if (m === 'M1') {
          stage = 'Estadio IVB';
        } else { // M0
          const isT1T2 = t.startsWith('T1') || t.startsWith('T2');
          const isT3 = t.startsWith('T3');
          
          if (isT1T2 && (n === 'N0' || n === 'NX')) {
            stage = 'Estadio I';
          } else if ((isT1T2 && (n === 'N1a' || n === 'N1b')) || isT3) {
            stage = 'Estadio II';
          } else if (t === 'T4a') {
            stage = 'Estadio III';
          } else if (t === 'T4b') {
            stage = 'Estadio IVA';
          }
        }
      }
    } else { // 7th Edition
      const ageCutoff = 45;
      criteriaText = `Usando AJCC 7ª Edición (corte de edad: ${ageCutoff} años).`;

      if (age < ageCutoff) {
        stage = m === 'M1' ? 'Estadio II' : 'Estadio I';
      } else { // age >= 45
        if (m === 'M1') {
          stage = 'Estadio IVC';
        } else { // M0
          const isT1 = t.startsWith('T1');
          const isT2 = t.startsWith('T2');
          const isT3 = t.startsWith('T3');

          if (isT1 && (n === 'N0' || n === 'NX')) {
            stage = 'Estadio I';
          } else if (isT2 && (n === 'N0' || n === 'NX')) {
            stage = 'Estadio II';
          } else if ((isT3 && (n === 'N0' || n === 'NX')) || ((isT1 || isT2 || isT3) && n === 'N1a')) {
            stage = 'Estadio III';
          } else if (t === 'T4a' || ((isT1 || isT2 || isT3) && n === 'N1b')) {
            stage = 'Estadio IVA';
          } else if (t === 'T4b') {
            stage = 'Estadio IVB';
          }
        }
      }
    }
    
    return { tnmStage: stage || 'No aplicable', criteria: criteriaText };
  }, [inputs]);

  return (
    <>
      <Card title="Estadificación TNM para Cáncer Diferenciado de Tiroides" description="Calcule el grupo de estadio AJCC basado en Tumor, Ganglio (Node), Metástasis y la edad del paciente.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              <SelectInput label="Edición de Estadificación" name="edition" value={inputs.edition} onChange={handleChange} options={[
                  { value: '8', label: 'AJCC 8ª Edición' }, { value: '7', label: 'AJCC 7ª Edición' }
              ]} />
              <div>
                  <label htmlFor="age-input" className="block text-sm font-medium text-slate-700 mb-1.5">Edad al Diagnóstico</label>
                  <input id="age-input" type="number" name="age" value={inputs.age} onChange={handleChange} className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm" />
              </div>
              <SelectInput label="Estadio T" name="t" value={inputs.t} onChange={handleChange} options={[
                  { value: 'T1a', label: 'T1a (≤1 cm)' }, { value: 'T1b', label: 'T1b (>1 a ≤2 cm)' }, { value: 'T2', label: 'T2 (>2 a ≤4 cm)' }, { value: 'T3a', label: 'T3a (>4 cm, en tiroides)' }, { value: 'T3b', label: 'T3b (ETE macro a músc. pretiroideos)' }, { value: 'T4a', label: 'T4a (laringe, tráquea, etc.)' }, { value: 'T4b', label: 'T4b (fascia prevertebral, etc.)' }
              ]} />
              <SelectInput label="Estadio N" name="n" value={inputs.n} onChange={handleChange} options={[
                  { value: 'NX', label: 'NX (No evaluable)' }, { value: 'N0', label: 'N0 (Sin metástasis regionales)' }, { value: 'N1a', label: 'N1a (Mets. compart. central)' }, { value: 'N1b', label: 'N1b (Mets. lateral/mediastínica)' }
              ]} />
              <SelectInput label="Estadio M" name="m" value={inputs.m} onChange={handleChange} options={[
                  { value: 'M0', label: 'M0 (Sin metástasis a distancia)' }, { value: 'M1', label: 'M1 (Metástasis a distancia)' }
              ]} />
          </div>
        
        <div className="mt-6 text-center">
            <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Ver Clasificación Completa TNM
            </button>
        </div>
        
        <ResultDisplay title="Grupo de Estadio TNM" color="border-indigo-500 bg-indigo-50">
          <p className="text-3xl font-bold text-indigo-800">{tnmStage}</p>
          <p className="text-sm mt-1">{criteria}</p>
        </ResultDisplay>
      </Card>
      <TnmClassificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default TnmCalculator;
