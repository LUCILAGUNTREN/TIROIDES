import React, { useState, useMemo } from 'react';
import Card from './shared/Card';
import SelectInput from './shared/SelectInput';
import ResultDisplay from './shared/ResultDisplay';
import { type TiradsFeatures } from '../types';

const TiradsCalculator: React.FC = () => {
  const [features, setFeatures] = useState<TiradsFeatures>({
    composition: '0',
    echogenicity: '0',
    shape: '0',
    margin: '0',
    echogenicFoci: [],
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFeatures(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFeatures(prev => {
      const currentFoci = prev.echogenicFoci;
      if (checked) {
        return { ...prev, echogenicFoci: [...currentFoci, value as '0' | '1' | '2' | '3'] };
      } else {
        return { ...prev, echogenicFoci: currentFoci.filter(focus => focus !== value) };
      }
    });
  };

  const { score, tiradsLevel, recommendation, color } = useMemo(() => {
    const compositionScore = parseInt(features.composition, 10);
    const echogenicityScore = parseInt(features.echogenicity, 10);
    const shapeScore = parseInt(features.shape, 10);
    const marginScore = parseInt(features.margin, 10);
    const fociScore = features.echogenicFoci.reduce((acc, val) => acc + parseInt(val, 10), 0);
    
    const totalScore = compositionScore + echogenicityScore + shapeScore + marginScore + fociScore;

    let level = '';
    let rec = '';
    let displayColor = 'border-slate-400 bg-slate-50';

    if (totalScore === 0) {
        level = 'TR1 - Benigno';
        rec = 'No requiere PAAF.';
        displayColor = 'border-green-400 bg-green-50';
    } else if (totalScore === 1) {
        level = 'Puntaje no clasificable';
        rec = 'Un puntaje de 1 no corresponde a una categoría TI-RADS según el esquema ACR 2017.';
        displayColor = 'border-slate-400 bg-slate-50';
    } else if (totalScore === 2) {
        level = 'TR2 - No Sospechoso';
        rec = 'No requiere PAAF.';
        displayColor = 'border-yellow-400 bg-yellow-50';
    } else if (totalScore === 3) {
        level = 'TR3 - Levemente Sospechoso';
        rec = 'Seguimiento ≥ 1.5 cm, PAAF ≥ 2.5 cm.';
        displayColor = 'border-yellow-400 bg-yellow-50';
    } else if (totalScore >= 4 && totalScore <= 6) {
        level = 'TR4 - Moderadamente Sospechoso';
        rec = 'Seguimiento ≥ 1.0 cm, PAAF ≥ 1.5 cm.';
        displayColor = 'border-orange-400 bg-orange-50';
    } else if (totalScore >= 7) {
        level = 'TR5 - Altamente Sospechoso';
        rec = 'Seguimiento ≥ 0.5 cm, PAAF ≥ 1.0 cm.';
        displayColor = 'border-red-400 bg-red-50';
    }

    return { score: totalScore, tiradsLevel: level, recommendation: rec, color: displayColor };
  }, [features]);

  const echogenicFociOptions = [
    { value: '1', label: 'Macrocalcificaciones (1 pto)' },
    { value: '2', label: 'Calcificaciones periféricas / anulares (2 ptos)' },
    { value: '3', label: 'Focos ecogénicos punteados (3 ptos)' }
  ];

  return (
    <Card title="Puntaje de Riesgo TI-RADS (ACR 2017)" description="Evalue el riesgo de malignidad de los nódulos tiroideos basado en características ecográficas.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <SelectInput 
            label="Composición" 
            name="composition" 
            value={features.composition} 
            onChange={handleSelectChange} 
            options={[
                { value: '0', label: 'Quístico o casi quístico / Espongiforme (0 ptos)' },
                { value: '1', label: 'Mixto quístico y sólido (1 pto)' },
                { value: '2', label: 'Sólido o casi completamente sólido (2 ptos)' },
            ]} 
        />
        <SelectInput 
            label="Ecogenicidad" 
            name="echogenicity" 
            value={features.echogenicity} 
            onChange={handleSelectChange} 
            options={[
                { value: '0', label: 'Anecoico (0 ptos)' },
                { value: '1', label: 'Hiperecoico o isoecoico (1 pto)' },
                { value: '2', label: 'Hipoecoico (2 ptos)' },
                { value: '3', label: 'Muy hipoecoico (3 ptos)' },
            ]} 
        />
        <SelectInput 
            label="Forma" 
            name="shape" 
            value={features.shape} 
            onChange={handleSelectChange} 
            options={[
                { value: '0', label: 'Más ancho que alto (0 ptos)' },
                { value: '3', label: 'Más alto que ancho (3 ptos)' },
            ]} 
        />
        <SelectInput 
            label="Margen" 
            name="margin" 
            value={features.margin} 
            onChange={handleSelectChange} 
            options={[
                { value: '0', label: 'Liso / Mal definido (0 ptos)' },
                { value: '2', label: 'Lobulado o irregular (2 ptos)' },
                { value: '3', label: 'Extensión extratiroidea (ETE) (3 ptos)' },
            ]} 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Focos Ecogénicos (seleccione todos los que apliquen)</label>
        <div className="mt-2 space-y-2">
            {echogenicFociOptions.map(option => (
                <label key={option.value} className="flex items-center">
                    <input 
                        type="checkbox" 
                        name="echogenicFoci" 
                        value={option.value} 
                        checked={features.echogenicFoci.includes(option.value as '1' | '2' | '3')}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-slate-700">{option.label}</span>
                </label>
            ))}
        </div>
      </div>
      
      <ResultDisplay title="Resultado TI-RADS" color={color}>
        <p className="text-2xl font-bold">{tiradsLevel}</p>
        <p><strong>Puntaje Total:</strong> {score} puntos</p>
        <p className="mt-1"><strong>Recomendación:</strong> {recommendation}</p>
      </ResultDisplay>
    </Card>
  );
};

export default TiradsCalculator;
