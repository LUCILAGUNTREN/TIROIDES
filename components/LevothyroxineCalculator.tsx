import React, { useState } from 'react';
import Card from './shared/Card';
import SelectInput from './shared/SelectInput';
import ResultDisplay from './shared/ResultDisplay';
import { type DynamicResponseCategory } from '../types';

const TSH_GOALS: { [key in DynamicResponseCategory]?: { goal: string; note: string; color: string } } = {
  'Excellent': { 
    goal: '0.5 - 2.0 mU/L',
    note: 'Mantener TSH en el rango normal-bajo. No se requiere supresión.',
    color: 'border-green-400 bg-green-50'
  },
  'Indeterminate': {
    goal: '0.5 - 2.0 mU/L',
    note: 'Mantener TSH en el rango normal-bajo. Considerar supresión leve (ej. 0.1-0.5 mU/L) solo si el riesgo inicial era alto o hay otros factores preocupantes.',
    color: 'border-yellow-400 bg-yellow-50'
  },
  'Biochemically Incomplete': {
    goal: '0.1 - 0.5 mU/L',
    note: 'Se recomienda supresión de TSH. El objetivo exacto debe individualizarse según el riesgo, la edad y las comorbilidades del paciente.',
    color: 'border-orange-400 bg-orange-50'
  },
  'Structurally Incomplete': {
    goal: '< 0.1 mU/L',
    note: 'Se recomienda supresión de TSH fuerte. El objetivo exacto debe individualizarse, sopesando los beneficios contra los riesgos de la supresión a largo plazo.',
    color: 'border-red-400 bg-red-50'
  },
  'Inconclusive': {
      goal: 'N/A',
      note: 'Por favor, seleccione una categoría de respuesta válida.',
      color: 'border-slate-400 bg-slate-50'
  }
};

const LevothyroxineCalculator: React.FC = () => {
    const [response, setResponse] = useState<DynamicResponseCategory>('Excellent');

    const recommendation = TSH_GOALS[response] || TSH_GOALS['Inconclusive'];

    return (
        <Card title="Terapia con Levotiroxina (Meta de TSH)" description="Orientación sobre el rango objetivo de TSH según la respuesta dinámica a la terapia inicial.">
            <SelectInput 
                label="Seleccione la Categoría de Respuesta a la Terapia"
                value={response}
                onChange={(e) => setResponse(e.target.value as DynamicResponseCategory)}
                options={[
                    { value: 'Excellent', label: 'Respuesta Excelente' },
                    { value: 'Indeterminate', label: 'Respuesta Indeterminada' },
                    { value: 'Biochemically Incomplete', label: 'Respuesta Bioquímicamente Incompleta' },
                    { value: 'Structurally Incomplete', label: 'Respuesta Estructuralmente Incompleta' },
                ]}
            />
            {recommendation && (
                <ResultDisplay title="Meta de TSH Recomendada" color={recommendation.color}>
                    <p className="font-bold text-xl">{recommendation.goal}</p>
                    <p className="text-sm mt-2">{recommendation.note}</p>
                </ResultDisplay>
            )}
        </Card>
    );
};

export default LevothyroxineCalculator;
