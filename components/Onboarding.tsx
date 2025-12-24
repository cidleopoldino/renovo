
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Seja Bem-vindo ao RENOVO",
      subtitle: "Um espaço seguro para nutrir seu corpo, acalmar sua mente e fortalecer seu espírito.",
      image: "https://picsum.photos/seed/renovo1/800/800",
      button: "Começar Minha Jornada"
    },
    {
      title: "O Corpo Sabe Curar",
      subtitle: "Nosso papel é remover os obstáculos e criar as condições ideais para a restauração da vida.",
      image: "https://picsum.photos/seed/renovo2/800/800",
      button: "Avançar"
    },
    {
      title: "Um Passo de Cada Vez",
      subtitle: "Guias diários simples, baseados em ciência e fé, sem pressão ou alarmismo.",
      image: "https://picsum.photos/seed/renovo3/800/800",
      button: "Estou Pronto"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F8FAF9] flex flex-col p-8 z-[100] animate-fadeIn">
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-md mx-auto">
        <div className="w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl mb-12">
          <img src={steps[step].image} alt="Onboarding" className="w-full h-full object-cover" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6 leading-tight">
          {steps[step].title}
        </h1>
        <p className="text-gray-500 leading-relaxed px-4">
          {steps[step].subtitle}
        </p>
      </div>

      <div className="mt-auto pt-12 max-w-md mx-auto w-full">
        <div className="flex justify-center space-x-2 mb-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-blue-500' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="w-full bg-blue-500 text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl shadow-blue-100 hover:bg-blue-600 active:scale-95 transition-all"
        >
          {steps[step].button}
        </button>
        <button 
          onClick={onComplete}
          className="w-full mt-4 text-gray-400 font-medium py-2 text-sm"
        >
          Pular
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
