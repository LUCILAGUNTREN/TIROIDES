import React, { useState, useMemo } from 'react';
import Card from './shared/Card';
import SelectInput from './shared/SelectInput';
import ResultDisplay from './shared/ResultDisplay';
import { type AtaRiskInputs, type AtaRiskCategory } from '../types';

const AtaRiskCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<AtaRiskInputs>({
    tumorType: 'PTC', tStage: 'T1', isIMPC: false, ete: 'none', vascularInvasion: 'none',
    nStage: 'N0', nodeCount: '<=5', largestNode: '<1', hasDistantMets: false,
    incompleteResection: false, brafV600e: false, aggressiveHistology: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setInputs(prev => ({ ...prev, [name]: checked }));
  };

  const { riskCategory, riskFactors, color } = useMemo(() => {
    let category: AtaRiskCategory = 'Low';
    const factors: string[] = [];

    const { tStage, isIMPC, ete, vascularInvasion, nStage, nodeCount, largestNode, hasDistantMets, incompleteResection, brafV600e, aggressiveHistology } = inputs;
    
    if (hasDistantMets) {
        category = 'High'; factors.push("Metástasis a distancia (M1)");
    }
    if (incompleteResection) {
        category = 'High'; factors.push("Resección tumoral incompleta");
    }
    if (ete === 'gross_major') {
        category = 'High'; factors.push("Extensión extratiroidea (ETE) macroscópica a estructuras mayores (T4)");
    }
    if (nStage !== 'N0' && largestNode === '>3') {
        category = 'High'; factors.push("Cualquier ganglio linfático > 3 cm");
    }
    
    if (category !== 'High') {
      if (aggressiveHistology) {
        category = 'Intermediate-High'; factors.push("Histología agresiva");
      }
      if (vascularInvasion === 'extensive') {
        category = 'High'; factors.push("Invasión vascular extensa");
      }
      if (ete === 'gross_strap') {
        category = 'Intermediate-High'; factors.push("ETE macroscópica a músculo pretiroideo (T3b)");
      }
      if (nStage !== 'N0' && largestNode === '1-3') {
        category = 'Intermediate-High'; factors.push("Ganglios linfáticos 1-3 cm");
      }

      const lowIntermediateRiskFactors: string[] = [];
      if (nStage === 'N1a' && nodeCount === '>5') lowIntermediateRiskFactors.push("N1a con >5 ganglios");
      if (nStage === 'N1b') lowIntermediateRiskFactors.push("Enfermedad N1b");
      if (brafV600e) lowIntermediateRiskFactors.push("Mutación BRAF V600E");
      if (ete === 'microscopic') lowIntermediateRiskFactors.push("Márgenes microscópicos positivos");
      if (tStage === 'T3a' || tStage === 'T3b' || tStage === 'T4') lowIntermediateRiskFactors.push(`Estadio tumoral ${tStage}`);
      if(vascularInvasion === 'focal') lowIntermediateRiskFactors.push("Invasión vascular focal");
      
      if(lowIntermediateRiskFactors.length >= 2 && category === 'Low') {
          category = 'Intermediate-High';
          factors.push(...lowIntermediateRiskFactors);
      } else if (lowIntermediateRiskFactors.length === 1 && category === 'Low') {
          category = 'Low-Intermediate';
          factors.push(...lowIntermediateRiskFactors);
      }
    }

    if (factors.length === 0) factors.push("No se identificaron factores de riesgo significativos.");
    if(isIMPC) factors.push("Microcarcinoma papilar multifocal intratiroideo (IMPC)");


    let color = 'border-green-400 bg-green-50';
    if(category === 'Low-Intermediate') color = 'border-yellow-400 bg-yellow-50';
    if(category === 'Intermediate-High') color = 'border-orange-400 bg-orange-50';
    if(category === 'High') color = 'border-red-400 bg-red-50';
    
    return { riskCategory: category, riskFactors: factors, color };
  }, [inputs]);

  const checkboxes = [
    { name: 'isIMPC', label: 'IMPC', tooltip: 'Microcarcinoma Papilar Multifocal Intratiroideo: Múltiples focos de cáncer papilar ≤1 cm confinados a la tiroides.' },
    { name: 'hasDistantMets', label: 'Mets a Distancia (M1)' },
    { name: 'incompleteResection', label: 'Resección Incompleta' },
    { name: 'brafV600e', label: 'BRAF V600E+' },
    { name: 'aggressiveHistology', label: 'Histología Agresiva', tooltip: 'Incluye variantes como células altas (>30%), células columnares, hobnail, sólida/trabecular, o carcinoma de Hürthle con invasión vascular extensa.' }
  ];

  return (
    <Card title="Estratificación de Riesgo de Recurrencia ATA 2025" description="Estime el riesgo de recurrencia después de la terapia inicial basado en características clinicopatológicas.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        <SelectInput label="Tipo de Tumor" name="tumorType" value={inputs.tumorType} onChange={handleChange} options={[
          { value: 'PTC', label: 'Papilar (PTC)' }, { value: 'FTC_IEFVPTC', label: 'Folicular / IEFVPTC' }, { value: 'OTC', label: 'Oncocítico (OTC)' }
        ]} />
        <SelectInput label="Estadio T" name="tStage" value={inputs.tStage} onChange={handleChange} options={[
          { value: 'T1', label: 'T1' }, { value: 'T2', label: 'T2' }, { value: 'T3a', label: 'T3a' }, { value: 'T3b', label: 'T3b' }, { value: 'T4', label: 'T4' }
        ]} />
        <SelectInput label="Extensión Extratiroidea" name="ete" value={inputs.ete} onChange={handleChange} options={[
          { value: 'none', label: 'Ninguna' }, { value: 'microscopic', label: 'Microscópica' }, { value: 'gross_strap', label: 'Macro ETE a músculo pretiroideo' }, { value: 'gross_major', label: 'Macro ETE a estructuras mayores' }
        ]} />
        <SelectInput label="Invasión Vascular" name="vascularInvasion" value={inputs.vascularInvasion} onChange={handleChange} options={[
          { value: 'none', label: 'Ninguna' }, { value: 'focal', label: 'Focal (< 4 vasos)' }, { value: 'extensive', label: 'Extensa (≥ 4 vasos)' }
        ]} />
        <SelectInput label="Estadio N" name="nStage" value={inputs.nStage} onChange={handleChange} options={[
          { value: 'N0', label: 'N0' }, { value: 'N1a', label: 'N1a' }, { value: 'N1b', label: 'N1b' }
        ]} />
        {inputs.nStage !== 'N0' && <>
          <SelectInput label="Nº Ganglios Patológicos" name="nodeCount" value={inputs.nodeCount} onChange={handleChange} options={[
            { value: '<=5', label: '≤ 5 ganglios' }, { value: '>5', label: '> 5 ganglios' }
          ]} />
          <SelectInput label="Ganglio Metastásico más Grande" name="largestNode" value={inputs.largestNode} onChange={handleChange} options={[
            { value: '<1', label: '< 1 cm' }, { value: '1-3', label: '1-3 cm' }, { value: '>3', label: '> 3 cm' }
          ]} />
        </>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {checkboxes.map(cb => (
          <label key={cb.name} className="flex items-center cursor-pointer group relative">
            <input type="checkbox" name={cb.name} checked={inputs[cb.name as keyof AtaRiskInputs] as boolean} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"/>
            <span className="ml-2 text-sm">{cb.label}</span>
            {cb.tooltip && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-slate-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 text-xs text-white bg-slate-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  {cb.tooltip}
                </div>
              </>
            )}
          </label>
        ))}
      </div>
      
      <ResultDisplay title="Categoría de Riesgo ATA" color={color}>
        <p className="text-2xl font-bold">{riskCategory === 'Low' ? 'Bajo' : (riskCategory === 'Low-Intermediate' ? 'Bajo-Intermedio' : (riskCategory === 'Intermediate-High' ? 'Intermedio-Alto' : 'Alto'))}</p>
        <p className="font-semibold mt-2">Basado en:</p>
        <ul className="list-disc list-inside text-sm">
          {riskFactors.map((factor, i) => <li key={i}>{factor}</li>)}
        </ul>
      </ResultDisplay>
    </Card>
  );
};

export default AtaRiskCalculator;
