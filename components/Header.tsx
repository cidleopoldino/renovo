
import React from 'react';
import { HealingPhase } from '../types';

interface HeaderProps {
  progress: number;
  currentPhase: HealingPhase;
  dayInPhase: number;
  onExit: () => void;
}

const Header: React.FC<HeaderProps> = ({ progress, currentPhase, dayInPhase, onExit }) => {
  const phaseNames = [
    "Fase 0: Preparação",
    "Fase 1: Limpeza Leve",
    "Fase 2: Nutrição Celular",
    "Fase 3: Suplementação",
    "Fase 4: Reset Metabólico",
    "Fase 5: Ritmo & Estilo",
  ];

  return (
    <header className="bg-white border-b border-gray-100 p-6 rounded-b-[2rem] shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">RENOVO</h1>
            <button 
              onClick={onExit}
              className="text-[10px] font-bold text-red-400 uppercase tracking-tighter bg-red-50 px-2 py-0.5 rounded-full hover:bg-red-100 transition-colors"
            >
              Sair
            </button>
          </div>
          <h2 className="text-xl font-serif font-bold text-gray-800">Hoje eu escolho a Vida</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
              Dia {dayInPhase} de 7
            </span>
            <span className="text-[10px] text-gray-400 font-medium">|</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
              {phaseNames[currentPhase]}
            </span>
          </div>
        </div>
        
        <div className="relative w-14 h-14 ml-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="28" cy="28" r="24" stroke="#F1F5F9" strokeWidth="4" fill="transparent" />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="#7FB3D5"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={150}
              strokeDashoffset={150 - (150 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-700 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-blue-600">
            {progress}%
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
