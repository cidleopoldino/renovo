
import React, { useState } from 'react';
import { DAILY_DEVOTIONALS } from '../constants';

interface SoulViewProps {
  onOpenPrayer: () => void;
}

const SoulView: React.FC<SoulViewProps> = ({ onOpenPrayer }) => {
  const [showGratitudeInput, setShowGratitudeInput] = useState(false);
  const [gratitudeText, setGratitudeText] = useState("");
  const devotional = DAILY_DEVOTIONALS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden group shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800" 
          alt="Peaceful Woods" 
          className="object-cover w-full h-full brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 mb-4">Palavra do Dia</div>
          <blockquote className="text-xl font-serif italic mb-4 leading-relaxed">
            "{devotional.verse}"
          </blockquote>
          <cite className="block text-xs font-bold opacity-60 not-italic tracking-widest uppercase">— {devotional.reference}</cite>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm">
        <h3 className="text-lg font-serif font-bold text-gray-800 mb-4">Reflexão</h3>
        <p className="text-sm text-gray-500 leading-relaxed italic mb-8">
          {devotional.reflection}
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={onOpenPrayer}
            className="w-full py-5 bg-blue-50 text-blue-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center justify-center space-x-2"
          >
            <span>🎧 Oração Guiada</span>
            <span className="text-[10px] opacity-60">(5 min)</span>
          </button>
          
          {!showGratitudeInput ? (
            <button 
              onClick={() => setShowGratitudeInput(true)}
              className="w-full py-5 bg-amber-50 text-amber-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-100 transition-all"
            >
              🙏 Momento de Gratidão
            </button>
          ) : (
            <div className="animate-fadeIn">
              <textarea 
                placeholder="Hoje sou grata por..."
                className="w-full p-4 bg-amber-50/30 border border-amber-100 rounded-2xl text-sm focus:ring-0 outline-none h-24 mb-2 text-amber-900"
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
              />
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    alert("Gratidão salva. Que seu coração repouse em paz.");
                    setShowGratitudeInput(false);
                    setGratitudeText("");
                  }}
                  className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-bold text-xs uppercase"
                >
                  Salvar
                </button>
                <button 
                  onClick={() => setShowGratitudeInput(false)}
                  className="px-4 py-3 bg-gray-100 text-gray-400 rounded-xl font-bold text-xs uppercase"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoulView;
