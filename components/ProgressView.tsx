
import React, { useState } from 'react';
import { ProgressData } from '../types';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressViewProps {
  history: ProgressData[];
  onSave: (data: ProgressData) => void;
}

const ProgressView: React.FC<ProgressViewProps> = ({ history, onSave }) => {
  const [victory, setVictory] = useState("");
  const [energyLevel, setEnergyLevel] = useState(3);

  const mockData = history.length > 0 
    ? [...history].reverse().map(h => ({ day: h.date.split('-')[2], energy: h.energy }))
    : [
        { day: '01', energy: 3 },
        { day: '02', energy: 4 },
        { day: '03', energy: 2 },
        { day: '04', energy: 5 },
        { day: '05', energy: 4 },
      ];

  const handleSave = () => {
    if (!victory.trim()) {
      alert("Por favor, registre uma pequena vitória.");
      return;
    }
    
    const newData: ProgressData = {
      date: new Date().toISOString().split('T')[0],
      energy: energyLevel,
      sleep: 8,
      digestion: true,
      victory: victory,
    };
    
    onSave(newData);
    setVictory("");
    alert("Sua vitória foi registrada!");
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="mb-6">
        <h2 className="text-xl font-serif font-bold text-gray-800">Sua Evolução</h2>
        <p className="text-sm text-gray-500">Pequenas vitórias diárias constroem o caminho.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
          <span className="text-xs font-bold text-blue-400 uppercase">Energia</span>
          <div className="text-3xl font-bold text-blue-700 mt-1">Nível {history[0]?.energy || energyLevel}</div>
          <p className="text-[10px] text-blue-500 mt-2">Atualizado hoje</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
          <span className="text-xs font-bold text-purple-400 uppercase">Sono</span>
          <div className="text-3xl font-bold text-purple-700 mt-1">7.5h</div>
          <p className="text-[10px] text-purple-500 mt-2">Média recomendada</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-64">
        <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">Energia Recente</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7FB3D5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#7FB3D5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Area type="monotone" dataKey="energy" stroke="#7FB3D5" fillOpacity={1} fill="url(#colorEnergy)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">Como está sua energia agora?</h3>
          <div className="flex justify-between px-2">
            {[1, 2, 3, 4, 5].map(lvl => (
              <button 
                key={lvl}
                onClick={() => setEnergyLevel(lvl)}
                className={`w-10 h-10 rounded-full font-bold transition-all ${energyLevel === lvl ? 'bg-blue-500 text-white scale-110 shadow-lg' : 'bg-gray-100 text-gray-400'}`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">Minha Vitória Hoje</h3>
          <textarea 
            placeholder="Hoje eu consegui..."
            value={victory}
            onChange={(e) => setVictory(e.target.value)}
            className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-200 outline-none h-24 transition-all"
          />
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all active:scale-95"
        >
          Salvar no Renovo
        </button>
      </div>

      {history.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Jornada de Vitórias</h3>
          {history.map((h, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-blue-400">{h.date}</span>
                <span className="text-[10px] bg-gray-50 px-2 py-1 rounded-md text-gray-400 font-bold">Energia: {h.energy}</span>
              </div>
              <p className="text-sm text-gray-600 italic">"{h.victory}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressView;
