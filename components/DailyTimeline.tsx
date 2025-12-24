
import React from 'react';
import { Task } from '../types';

interface DailyTimelineProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onOpenDetail: (task: Task) => void;
  lowEnergy?: boolean;
}

const DailyTimeline: React.FC<DailyTimelineProps> = ({ tasks, onToggle, onOpenDetail, lowEnergy }) => {
  const times: Task['timeOfDay'][] = ['Morning', 'Midday', 'Afternoon', 'Evening', 'Night'];
  const labels = {
    Morning: 'Manhã',
    Midday: 'Meio-dia',
    Afternoon: 'Tarde',
    Evening: 'Noite',
    Night: 'Madrugada',
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {lowEnergy && (
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start space-x-3 mb-4">
          <span className="text-xl">🕯️</span>
          <div>
            <h4 className="text-amber-800 font-bold text-sm">Modo Restauração Ativo</h4>
            <p className="text-amber-700 text-xs">Sua energia está baixa. Priorize o repouso e a hidratação hoje.</p>
          </div>
        </div>
      )}

      {times.map((time) => {
        const timeTasks = tasks.filter((t) => t.timeOfDay === time);
        if (timeTasks.length === 0) return null;

        return (
          <section key={time} className="relative pl-6 border-l-2 border-dashed border-gray-100 ml-2">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-300 border-4 border-white shadow-sm" />
            
            <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">
              {labels[time]}
            </h3>
            
            <div className="space-y-3">
              {timeTasks.map((task) => {
                const isPriority = lowEnergy && (task.type === 'prayer' || task.title.includes('Hidratação') || task.type === 'default');
                
                return (
                  <div
                    key={task.id}
                    onClick={() => task.type === 'default' ? onToggle(task.id) : onOpenDetail(task)}
                    className={`flex items-center p-4 rounded-[1.5rem] border transition-all cursor-pointer group ${
                      task.completed 
                        ? 'bg-green-50/30 border-green-50' 
                        : isPriority ? 'bg-white border-blue-200 shadow-sm' : 'bg-white border-gray-50 shadow-sm opacity-90'
                    }`}
                  >
                    <div className="text-3xl mr-4 group-hover:scale-110 transition-transform">{task.icon}</div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold text-gray-800 ${task.completed ? 'line-through opacity-40' : ''}`}>
                        {task.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">{task.description}</p>
                    </div>
                    
                    {task.type !== 'default' && !task.completed && (
                      <div className="mr-3 text-[10px] font-bold text-blue-400 uppercase tracking-tighter bg-blue-50 px-2 py-1 rounded-md">
                        Guia
                      </div>
                    )}

                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.completed ? 'bg-green-500 border-green-500 scale-90' : 'border-gray-100 group-hover:border-blue-200'
                    }`}>
                      {task.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default DailyTimeline;
