
import { Task, HealingPhase, ScienceCard, Devotional } from './types';

export const COLORS = {
  primary: '#7FB3D5', // Soft Blue
  secondary: '#A2D9CE', // Sage Green
  accent: '#FAD7A0', // Warm Sand
  background: '#F8FAF9',
  text: '#2D3436',
  muted: '#636E72',
};

export const INITIAL_TASKS: Task[] = [
  { 
    id: '1', 
    type: 'default',
    title: 'Hidratação (Copo 1)', 
    description: '300ml de água purificada', 
    icon: '💧', 
    timeOfDay: 'Morning', 
    completed: false, 
    phase: HealingPhase.PREPARATION 
  },
  { 
    id: '2', 
    type: 'prayer',
    title: 'Oração Matinal', 
    description: '5 min de conexão e entrega', 
    icon: '🙏', 
    timeOfDay: 'Morning', 
    completed: false, 
    phase: HealingPhase.RHYTHM_LIFESTYLE,
    instructions: "Pai, eu entrego este dia em Tuas mãos. Fortalece minhas células, renova meu ânimo e dá-me sabedoria para cada escolha. Eu descanso em Teu cuidado."
  },
  { 
    id: '3', 
    type: 'movement',
    title: 'Movimento do Dia', 
    description: 'Escolha como ativar seu corpo', 
    icon: '🏃‍♀️', 
    timeOfDay: 'Morning', 
    completed: false, 
    phase: HealingPhase.RHYTHM_LIFESTYLE 
  },
  { 
    id: '4', 
    type: 'nutrition',
    title: 'Vegetais Crucíferos', 
    description: 'Brócolis, couve ou rúcula', 
    icon: '🥗', 
    timeOfDay: 'Midday', 
    completed: false, 
    phase: HealingPhase.CELLULAR_NOURISHMENT,
    details: ['Brócolis', 'Couve-flor', 'Rúcula', 'Repolho', 'Brotos'],
    instructions: "Dica: Cozinhe levemente no vapor para preservar o sulforafano."
  },
  { 
    id: '5', 
    type: 'tea',
    title: 'Chá Verde (EGCG)', 
    description: 'Pausa para restauração', 
    icon: '🍵', 
    timeOfDay: 'Afternoon', 
    completed: false, 
    phase: HealingPhase.CELLULAR_NOURISHMENT,
    instructions: "Use água quente, mas não fervente (80°C). Deixe em infusão por 2-3 minutos para evitar o sabor amargo e extrair o máximo de EGCG."
  },
  { 
    id: '6', 
    type: 'supplements',
    title: 'Suplementos', 
    description: 'Nutrição direcionada', 
    icon: '💊', 
    timeOfDay: 'Evening', 
    completed: false, 
    phase: HealingPhase.TARGETED_SUPPLEMENTATION,
    details: ['Vitamina D3 + K2', 'Magnésio', 'Ômega-3']
  },
  { 
    id: '7', 
    type: 'default',
    title: 'Desligar Telas', 
    description: '1h antes de deitar', 
    icon: '📱', 
    timeOfDay: 'Night', 
    completed: false, 
    phase: HealingPhase.RHYTHM_LIFESTYLE 
  },
  { 
    id: '8', 
    type: 'default',
    title: 'Sono Reparador', 
    description: 'Quarto totalmente escuro', 
    icon: '😴', 
    timeOfDay: 'Night', 
    completed: false, 
    phase: HealingPhase.RHYTHM_LIFESTYLE 
  },
];

export const SCIENCE_CONTENT: ScienceCard[] = [
  {
    id: 'warburg',
    title: 'O Efeito Warburg',
    summary: 'Como o açúcar alimenta células indesejadas.',
    detail: 'Otto Warburg descobriu que células alteradas têm uma dependência extrema de glicose. Reduzir o açúcar abre espaço para que o corpo recupere o controle metabólico.',
    icon: '🍭',
  },
  {
    id: 'nrf2',
    title: 'Ativação Nrf2',
    summary: 'O "mestre interruptor" da desintoxicação.',
    detail: 'O sulforafano (encontrado no brócolis) ativa a via Nrf2, que estimula a produção de centenas de enzimas antioxidantes naturais no seu corpo.',
    icon: '🥦',
  },
  {
    id: 'nf-kb',
    title: 'Inibição NF-κB',
    summary: 'Silenciando o alarme da inflamação.',
    detail: 'O NF-κB é o interruptor principal da inflamação. A curcumina ajuda a manter esse interruptor desligado, permitindo que o sistema imunológico descanse.',
    icon: '🔥',
  },
];

export const DAILY_DEVOTIONALS: Devotional[] = [
  {
    verse: "Não sabeis vós que o vosso corpo é o templo do Espírito Santo, que habita em vós, proveniente de Deus, e que não sois de vós mesmos?",
    reference: "1 Coríntios 6:19",
    reflection: "Hoje, cuidamos do corpo não por vaidade, mas por gratidão. Cada escolha saudável é um ato de honra ao Criador que habita em você."
  },
  {
    verse: "Purifica-me com hissopo, e ficarei limpo; lava-me, e ficarei mais alvo do que a neve.",
    reference: "Salmos 51:7",
    reflection: "Assim como limpamos o interior, pedimos que a paz limpe nosso coração de todo medo e ansiedade."
  }
];
