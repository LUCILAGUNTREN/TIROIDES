import React from 'react';
import { type Calculator, type AtaRiskCategory } from './types';

export const CALCULATORS: { id: Calculator; name: string; icon: React.ReactElement }[] = [
  { id: 'TIRADS', name: 'Puntaje TI-RADS', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { id: 'Bethesda', name: 'Sistema Bethesda', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
  { id: 'TNM', name: 'Estadificación TNM', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
  { id: 'ATA Risk', name: 'Riesgo ATA', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { id: 'RAI Dose', name: 'Dosis I-131', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l-.477-2.387a2 2 0 01.547-1.806z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.243 5.757a2 2 0 00-1.022.547l-2.387.477a6 6 0 00-3.86-.517l-.318-.158a6 6 0 01-3.86-.517L.572 7.022a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" /></svg> },
  { id: 'Dynamic Risk', name: 'Riesgo Dinámico', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" /></svg> },
  { id: 'Levothyroxine', name: 'Meta TSH', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0112 3c2.392 0 4.544.97 6.142 2.572A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1014.12 11.88l1.414 1.414-1.414 1.414a3 3 0 00-4.242 0z" /></svg> },
];

export const RAI_DOSE_DATA: { [key in AtaRiskCategory]?: { recommendation: string; dose: string; goals: string } } = {
  'Low': { recommendation: 'No', dose: '1.1-1.85 GBq (30-50 mCi) si se administra', goals: 'Ninguno o ablación de remanente' },
  'Low-Intermediate': { recommendation: 'Considerar', dose: '1.1-3.7 GBq (30-100 mCi)', goals: 'Ablación de remanente +/- terapia adyuvante' },
  'Intermediate-High': { recommendation: 'Considerar', dose: '1.1-3.7 GBq (30-100 mCi)', goals: 'Ablación de remanente y terapia adyuvante' },
  'High': { recommendation: 'Sí', dose: '3.7-5.55 GBq (100-150 mCi)', goals: 'Ablación de remanente y terapia adyuvante' },
  'Not Determined': { recommendation: 'Consideración especial para metástasis a distancia', dose: '3.7-7.4 GBq (100-200 mCi) o considerar dosimetría', goals: 'Tratamiento de enfermedad conocida, ablación de remanente' }
};

export const BETHESDA_DATA: { [key: string]: { name: string; risk: string; management: string; color: string } } = {
  'I': {
    name: 'I. No Diagnóstico o Insatisfactorio',
    risk: '1-4%',
    management: 'Repetir PAAF con guía ecográfica',
    color: 'bg-slate-50',
  },
  'II': {
    name: 'II. Benigno',
    risk: '0-3%',
    management: 'Seguimiento clínico',
    color: 'bg-green-50',
  },
  'III': {
    name: 'III. Atipia de Significado Indeterminado (AUS) o Lesión Folicular de Significado Indeterminado (FLUS)',
    risk: '5-15%',
    management: 'Repetir PAAF, pruebas moleculares o lobectomía diagnóstica',
    color: 'bg-yellow-50',
  },
  'IV': {
    name: 'IV. Neoplasia Folicular o Sospechoso de Neoplasia Folicular',
    risk: '15-30%',
    management: 'Lobectomía diagnóstica',
    color: 'bg-orange-50',
  },
  'V': {
    name: 'V. Sospechoso de Malignidad',
    risk: '60-75%',
    management: 'Tiroidectomía (casi) total o lobectomía',
    color: 'bg-red-50',
  },
  'VI': {
    name: 'VI. Maligno',
    risk: '97-99%',
    management: 'Tiroidectomía (casi) total',
    color: 'bg-red-50',
  },
};
