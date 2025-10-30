import React, { useState, useMemo } from 'react';
import Card from './shared/Card';
import SelectInput from './shared/SelectInput';
import ResultDisplay from './shared/ResultDisplay';
import { type DynamicRiskInputs, type DynamicResponseCategory } from '../types';

const DynamicRiskCalculator: React.FC = () => {
    const [inputs, setInputs] = useState<DynamicRiskInputs>({
        initialTx: 'total_rai',
        tg: '',
        stimulatedTg: '',
        tgAb: 'negative',
        imaging: 'negative',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const { responseCategory, criteria, color } = useMemo(() => {
        let category: DynamicResponseCategory = 'Inconclusive';
        let criteriaText = '';
        let displayColor = 'border-slate-400 bg-slate-50';

        const { initialTx, tg, stimulatedTg, tgAb, imaging } = inputs;

        const tgNum = parseFloat(tg);
        const stimTgNum = parseFloat(stimulatedTg);

        if (imaging === 'suspicious') {
            category = 'Structurally Incomplete';
            criteriaText = 'Evidencia estructural de enfermedad (imagen sospechosa o biopsia positiva).';
            displayColor = 'border-red-400 bg-red-50';
        } else {
            if (initialTx === 'total_rai') {
                if (!isNaN(stimTgNum) && stimTgNum >= 10 || !isNaN(tgNum) && tgNum > 1 || tgAb === 'rising') {
                    category = 'Biochemically Incomplete';
                    criteriaText = 'Tg estimulada elevada (≥10), Tg no estimulada (>1), o niveles de AcTg en aumento con imagen negativa.';
                    displayColor = 'border-orange-400 bg-orange-50';
                } else if (!isNaN(stimTgNum) && stimTgNum < 1 && tgAb === 'negative' && imaging === 'negative') {
                    category = 'Excellent';
                    criteriaText = 'Imagen negativa y Tg estimulada < 1 ng/mL.';
                    displayColor = 'border-green-400 bg-green-50';
                } else if (imaging === 'nonspecific' || (!isNaN(stimTgNum) && stimTgNum >= 1 && stimTgNum < 10) || tgAb === 'stable_declining') {
                    category = 'Indeterminate';
                    criteriaText = 'Hallazgos no específicos en imagen, o Tg estimulada 1-9.9 ng/mL, o niveles de AcTg estables/descendentes.';
                    displayColor = 'border-yellow-400 bg-yellow-50';
                }
            } else if (initialTx === 'total_no_rai') {
                 if (!isNaN(tgNum) && tgNum > 5 || tgAb === 'rising') {
                    category = 'Biochemically Incomplete';
                    criteriaText = 'Tg no estimulada > 5 ng/mL o niveles de AcTg en aumento con imagen negativa.';
                    displayColor = 'border-orange-400 bg-orange-50';
                } else if (!isNaN(tgNum) && tgNum <= 2.5 && tgAb === 'negative' && imaging === 'negative') {
                    category = 'Excellent';
                    criteriaText = 'Imagen negativa y Tg no estimulada < 2.5 ng/mL.';
                    displayColor = 'border-green-400 bg-green-50';
                } else if (imaging === 'nonspecific' || (!isNaN(tgNum) && tgNum > 2.5 && tgNum <= 5) || tgAb === 'stable_declining') {
                    category = 'Indeterminate';
                    criteriaText = 'Hallazgos no específicos en imagen, o Tg no estimulada 2.5-5 ng/mL, o niveles de AcTg estables/descendentes.';
                    displayColor = 'border-yellow-400 bg-yellow-50';
                }
            } else { // hemi
                if (imaging === 'negative' && tgAb === 'negative') {
                    category = 'Excellent';
                    criteriaText = 'Nódulos normales o de bajo riesgo en lóbulo contralateral y sin adenopatías anormales en imagen.';
                    displayColor = 'border-green-400 bg-green-50';
                } else if (imaging === 'nonspecific' || tgAb !== 'negative') {
                    category = 'Indeterminate';
                    criteriaText = 'Hallazgos no específicos en imagen o presencia de AcTg.';
                    displayColor = 'border-yellow-400 bg-yellow-50';
                }
            }
        }
        
        return { responseCategory: category, criteria: criteriaText, color: displayColor };
    }, [inputs]);
    
    const responseLabels: {[key in DynamicResponseCategory]: string} = {
        'Excellent': 'Respuesta Excelente',
        'Indeterminate': 'Respuesta Indeterminada',
        'Biochemically Incomplete': 'Respuesta Bioquímicamente Incompleta',
        'Structurally Incomplete': 'Respuesta Estructuralmente Incompleta',
        'Inconclusive': 'Inconclusa'
    };

    return (
        <Card title="Estratificación de Riesgo Dinámico (Respuesta a Terapia)" description="Categorice la respuesta a la terapia inicial para guiar el manejo y la vigilancia posteriores.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <SelectInput label="Terapia Inicial" name="initialTx" value={inputs.initialTx} onChange={handleChange} options={[
                    { value: 'total_rai', label: 'Tiroidectomía Total + I-131' }, { value: 'total_no_rai', label: 'Tiroidectomía Total, sin I-131' }, { value: 'hemi', label: 'Lobectomía / Hemitiroidectomía' },
                ]}/>
                <SelectInput label="Resultados de Imagen" name="imaging" value={inputs.imaging} onChange={handleChange} options={[
                    { value: 'negative', label: 'Negativa para recurrencia' }, { value: 'nonspecific', label: 'Hallazgos no específicos' }, { value: 'suspicious', label: 'Sospechosa de recurrencia' },
                ]}/>
                {inputs.initialTx !== 'hemi' && <>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Tg no estimulada (ng/mL)</label>
                        <input type="number" step="0.1" name="tg" value={inputs.tg} onChange={handleChange} className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm" />
                    </div>
                </>}
                {inputs.initialTx === 'total_rai' && <>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Tg estimulada (ng/mL)</label>
                        <input type="number" step="0.1" name="stimulatedTg" value={inputs.stimulatedTg} onChange={handleChange} className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm" />
                    </div>
                </>}
                 {inputs.initialTx !== 'hemi' && <>
                    <SelectInput label="Tendencia Ac. Anti-Tiroglobulina (AcTg)" name="tgAb" value={inputs.tgAb} onChange={handleChange} options={[
                        { value: 'negative', label: 'Negativos / Indetectables' }, { value: 'stable_declining', label: 'Estables o en Descenso' }, { value: 'rising', label: 'En Aumento' },
                    ]}/>
                </>}
            </div>
            
            <ResultDisplay title="Respuesta a la Terapia" color={color}>
                <p className="text-2xl font-bold">{responseLabels[responseCategory]}</p>
                {criteria && <p className="text-sm mt-2">{criteria}</p>}
            </ResultDisplay>
        </Card>
    );
};

export default DynamicRiskCalculator;
