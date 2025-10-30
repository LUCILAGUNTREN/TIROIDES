import React, { useState } from 'react';
import Card from './shared/Card';
import SelectInput from './shared/SelectInput';
import ResultDisplay from './shared/ResultDisplay';
import { BETHESDA_DATA } from '../constants';

const BethesdaCalculator: React.FC = () => {
  const [category, setCategory] = useState<string>('I');
  
  const selectedCategory = BETHESDA_DATA[category];

  return (
    <Card title="Sistema Bethesda para Reporte de Citopatología Tiroidea" description="Comprenda el riesgo de malignidad y el manejo típico para cada categoría diagnóstica.">
      <SelectInput 
        label="Seleccione la Categoría Bethesda"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={Object.keys(BETHESDA_DATA).map(key => ({
            value: key,
            label: BETHESDA_DATA[key].name
        }))}
      />

      {selectedCategory && (
        <ResultDisplay title={selectedCategory.name} color={`border-slate-400 ${selectedCategory.color}`}>
            <p><strong>Riesgo de Malignidad:</strong> {selectedCategory.risk}</p>
            <p><strong>Manejo Típico:</strong> {selectedCategory.management}</p>
        </ResultDisplay>
      )}
    </Card>
  );
};

export default BethesdaCalculator;
