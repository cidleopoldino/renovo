
import React, { useState } from 'react';
import { SCIENCE_CONTENT } from '../constants';
import { ScienceCard } from '../types';

const ScienceCardItem: React.FC<{ card: ScienceCard }> = ({ card }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer mb-4"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl">
          {card.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{card.title}</h3>
          <p className="text-sm text-gray-500">{card.summary}</p>
        </div>
        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
           <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
           </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-50 text-sm text-gray-600 leading-relaxed animate-fadeIn">
          {card.detail}
        </div>
      )}
    </div>
  );
};

const ScienceView: React.FC = () => {
  return (
    <div className="space-y-4 pb-8">
      <div className="mb-6">
        <h2 className="text-xl font-serif font-bold text-gray-800">Por que isso importa?</h2>
        <p className="text-sm text-gray-500">Entenda a base biológica das suas escolhas diárias.</p>
      </div>
      
      {SCIENCE_CONTENT.map(card => (
        <ScienceCardItem key={card.id} card={card} />
      ))}

      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 mt-8">
        <h4 className="font-bold text-emerald-800 mb-2">💡 Dica de Ouro</h4>
        <p className="text-sm text-emerald-700">
          Combine sempre a Cúrcuma com uma pitada de Pimenta Preta. A piperina aumenta a absorção da curcumina em até 2000%!
        </p>
      </div>
    </div>
  );
};

export default ScienceView;
