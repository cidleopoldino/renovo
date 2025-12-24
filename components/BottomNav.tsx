
import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'today', label: 'Hoje', icon: '🌱' },
    { id: 'science', label: 'Ciência', icon: '🔬' },
    { id: 'soul', label: 'Alma', icon: '🕊️' },
    { id: 'progress', label: 'Progresso', icon: '📊' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-full px-6 py-3 flex space-x-8 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as TabType)}
          className={`flex flex-col items-center transition-all duration-300 ${
            activeTab === tab.id ? 'scale-110 opacity-100' : 'opacity-40 grayscale'
          }`}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
