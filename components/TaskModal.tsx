
import React, { useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onComplete: (id: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onComplete }) => {
  const [timer, setTimer] = useState(300); // 5 min for prayer
  const [isActive, setIsActive] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    let interval: any;
    if (isActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderContent = () => {
    switch (task.type) {
      case 'prayer':
        return (
          <div className="space-y-6 text-center">
            <div className="text-4xl font-mono text-blue-500 font-bold mb-4">{formatTime(timer)}</div>
            <p className="text-gray-600 italic leading-relaxed text-sm bg-blue-50 p-6 rounded-3xl">
              "{task.instructions}"
            </p>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all ${
                isActive ? 'bg-amber-100 text-amber-700' : 'bg-blue-500 text-white shadow-xl shadow-blue-100'
              }`}
            >
              {isActive ? 'Pausar' : timer === 300 ? 'Iniciar Oração' : 'Continuar'}
            </button>
          </div>
        );

      case 'movement':
        const movements = [
          { id: 'walk', label: 'Caminhada Leve', time: '15-30 min', icon: '🚶' },
          { id: 'rebound', label: 'Pula-Pula', time: '5-10 min', icon: '🤸', tip: 'Ativa o sistema linfático' },
          { id: 'stretch', label: 'Alongamento', time: '5 min', icon: '🧘' },
          { id: 'breath', label: 'Respiração', time: '5 min', icon: '🫁' }
        ];
        return (
          <div className="space-y-3">
            {movements.map(m => (
              <div 
                key={m.id}
                onClick={() => setSelectedItems(prev => prev.includes(m.id) ? prev.filter(i => i !== m.id) : [...prev, m.id])}
                className={`flex items-center p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedItems.includes(m.id) ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-transparent'
                }`}
              >
                <span className="text-2xl mr-4">{m.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800">{m.label}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{m.time} {m.tip && `• ${m.tip}`}</p>
                </div>
                {selectedItems.includes(m.id) && <span className="text-blue-500 font-bold">✓</span>}
              </div>
            ))}
          </div>
        );

      case 'nutrition':
      case 'supplements':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {task.details?.map(item => (
                <div 
                  key={item}
                  onClick={() => setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])}
                  className={`flex items-center p-4 rounded-xl transition-all cursor-pointer ${
                    selectedItems.includes(item) ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${selectedItems.includes(item) ? 'bg-green-500 border-green-500' : 'border-gray-200'}`}>
                    {selectedItems.includes(item) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>
            {task.instructions && (
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-[10px] font-bold leading-relaxed">
                💡 {task.instructions}
              </div>
            )}
          </div>
        );

      case 'tea':
        const teaOptions = [
          { id: 'matcha', label: 'Matchá / Chá Verde', tip: 'Máximo EGCG e antioxidantes', icon: '🍵' },
          { id: 'ginger', label: 'Gengibre', tip: 'Anti-inflamatório potente', icon: '🫚' },
          { id: 'dandelion', label: 'Dente-de-Leão', tip: 'Suporte à desintoxicação hepática', icon: '🌼' },
          { id: 'holy-basil', label: 'Tulsi (Manjericão Sagrado)', tip: 'Reduz cortisol e estresse', icon: '🌿' }
        ];
        return (
          <div className="space-y-4">
            <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100 mb-2">
              <h4 className="font-black text-orange-800 text-[10px] uppercase tracking-widest mb-2">Como Preparar</h4>
              <p className="text-orange-700 text-xs italic leading-relaxed">
                Água a 80°C (não fervente). Infusão por 2-3 minutos.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase ml-1">Opções Benéficas</h4>
              {teaOptions.map(tea => (
                <div 
                  key={tea.id}
                  onClick={() => setSelectedItems(prev => prev.includes(tea.id) ? prev.filter(i => i !== tea.id) : [...prev, tea.id])}
                  className={`flex items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    selectedItems.includes(tea.id) ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-transparent'
                  }`}
                >
                  <span className="text-xl mr-3">{tea.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-800">{tea.label}</h4>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">{tea.tip}</p>
                  </div>
                  {selectedItems.includes(tea.id) && <span className="text-orange-500 font-bold">✓</span>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <p className="text-gray-500 italic text-sm">{task.description}</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-8 animate-fadeIn">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-slideUp">
        <div className="p-8 pb-4 flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{task.icon}</div>
            <div>
              <h2 className="text-xl font-serif font-bold text-gray-800">{task.title}</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Guia de Prática</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-300 hover:text-gray-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-4 overflow-y-auto max-h-[60vh]">
          {renderContent()}
        </div>

        <div className="p-8 pt-4">
          <button 
            onClick={() => onComplete(task.id)}
            className="w-full bg-blue-500 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 active:scale-95 transition-all"
          >
            Concluir Atividade
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
