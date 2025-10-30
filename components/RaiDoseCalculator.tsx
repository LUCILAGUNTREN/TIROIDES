import React, { useState } from 'react';
import Card from './shared/Card';
import SelectInput from './shared/SelectInput';
import ResultDisplay from './shared/ResultDisplay';
import { RAI_DOSE_DATA } from '../constants';
import { type AtaRiskCategory } from '../types';

const RaiDoseCalculator: React.FC = () => {
    const [risk, setRisk] = useState<AtaRiskCategory>('Low');

    const recommendation = RAI_DOSE_DATA[risk] || RAI_DOSE_DATA['Not Determined'];

    const getResultColor = (recommendation: string) => {
        if (recommendation === 'Sí') return 'border-red-400 bg-red-50';
        if (recommendation === 'Considerar') return 'border-yellow-400 bg-yellow-50';
        return 'border-green-400 bg-green-50';
    }

    return (
        <Card title="Terapia Sugerida con Iodo Radiactivo (I-131)" description="Orientación sobre el uso y la dosis de I-131 según la categoría de Riesgo de Recurrencia de la ATA 2025.">
            <SelectInput 
                label="Seleccione la Categoría de Riesgo de Recurrencia ATA"
                value={risk}
                onChange={(e) => setRisk(e.target.value as AtaRiskCategory)}
                options={[
                    { value: 'Low', label: 'Riesgo Bajo' },
                    { value: 'Low-Intermediate', label: 'Riesgo Bajo-Intermedio' },
                    { value: 'Intermediate-High', label: 'Riesgo Intermedio-Alto' },
                    { value: 'High', label: 'Riesgo Alto' },
                    { value: 'Not Determined', label: 'Metástasis a Distancia Presentes' }
                ]}
            />

            {recommendation && (
                <ResultDisplay title="Recomendación de Terapia con I-131" color={getResultColor(recommendation.recommendation)}>
                    <p><strong>Recomendación:</strong> <span className="font-bold text-xl">{recommendation.recommendation}</span></p>
                    <p><strong>Nivel de Actividad Típico:</strong> {recommendation.dose}</p>
                    <p><strong>Objetivos de la Terapia:</strong> {recommendation.goals}</p>
                </ResultDisplay>
            )}
        </Card>
    );
};

export default RaiDoseCalculator;
