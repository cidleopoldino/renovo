
import React, { useState, useEffect } from 'react';
import { TabType, Task, HealingPhase, ProgressData } from './types';
import { INITIAL_TASKS } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DailyTimeline from './components/DailyTimeline';
import ScienceView from './components/ScienceView';
import SoulView from './components/SoulView';
import ProgressView from './components/ProgressView';
import Onboarding from './components/Onboarding';
import AuthView from './components/AuthView';
import TaskModal from './components/TaskModal';
import { supabase } from './supabase';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [currentPhase, setCurrentPhase] = useState<HealingPhase>(HealingPhase.PREPARATION);
  const [dayInPhase, setDayInPhase] = useState(3);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [activeTaskModal, setActiveTaskModal] = useState<Task | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Authenticate / Get Session
  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
        loadUserData(session.user.id);
        setShowOnboarding(false);
        setShowAuth(false);
      } else {
        // Fallback to local storage for demo
        const savedProgress = localStorage.getItem('renovo_progress');
        if (savedProgress) setProgress(JSON.parse(savedProgress));
      }
    };
    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserId(session.user.id);
        loadUserData(session.user.id);
        setShowAuth(false);
      } else {
        setUserId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (uid: string) => {
    // Load Progress
    const { data: progressData } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', uid)
      .order('date', { ascending: false });
    
    if (progressData) setProgress(progressData);

    // Load Today's Tasks
    const today = new Date().toISOString().split('T')[0];
    const { data: taskData } = await supabase
      .from('user_tasks')
      .select('task_id, completed')
      .eq('user_id', uid)
      .eq('date', today);

    if (taskData) {
      setTasks(prev => prev.map(t => {
        const dbTask = taskData.find(dt => dt.task_id === t.id);
        return dbTask ? { ...t, completed: dbTask.completed } : t;
      }));
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newCompleted = !task.completed;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: newCompleted } : t));

    if (userId) {
      const today = new Date().toISOString().split('T')[0];
      try {
        await supabase.from('user_tasks').upsert({
          user_id: userId,
          task_id: id,
          completed: newCompleted,
          date: today
        }, { onConflict: 'user_id, task_id, date' });
      } catch (err) {
        console.error("Erro ao sincronizar tarefa:", err);
      }
    }
  };

  const openTaskDetail = (task: Task) => {
    setActiveTaskModal(task);
  };

  const handleEndDay = () => {
    alert("Dia concluído com gratidão. Preparando seu renovo para amanhã...");
    setTasks(INITIAL_TASKS);
    setDayInPhase(prev => (prev % 7) + 1);
  };

  const handleExit = async () => {
    if (confirm("Deseja sair da conta? Seu progresso será mantido.")) {
      await supabase.auth.signOut();
      setShowOnboarding(true);
      setShowAuth(false);
    }
  };

  const saveProgress = async (data: ProgressData) => {
    const updatedProgress = [data, ...progress];
    setProgress(updatedProgress);
    localStorage.setItem('renovo_progress', JSON.stringify(updatedProgress));

    if (userId) {
      try {
        await supabase.from('user_progress').insert({
          user_id: userId,
          ...data
        });
      } catch (err) {
        console.error("Erro ao salvar progresso no banco:", err);
      }
    }
  };

  if (showOnboarding) {
    return <Onboarding onComplete={() => {
      setShowOnboarding(false);
      setShowAuth(true);
    }} />;
  }

  if (showAuth && !userId) {
    return (
      <AuthView 
        onAuthComplete={(uid) => {
          setUserId(uid);
          setShowAuth(false);
        }} 
        onSkip={() => setShowAuth(false)} 
      />
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);
  const latestEnergy = progress.length > 0 ? progress[0].energy : 3;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAF9] text-[#2D3436]">
      <Header 
        progress={progressPercent} 
        currentPhase={currentPhase} 
        dayInPhase={dayInPhase} 
        onExit={handleExit}
      />
      
      <main className="flex-1 pb-32 overflow-y-auto pt-4 px-4 max-w-md mx-auto w-full">
        {activeTab === 'today' && (
          <>
            <DailyTimeline 
              tasks={tasks} 
              onToggle={toggleTask} 
              onOpenDetail={openTaskDetail}
              lowEnergy={latestEnergy <= 2}
            />
            <button 
              onClick={handleEndDay}
              className="w-full mt-12 mb-8 bg-gray-800 text-white py-5 rounded-[2rem] font-bold shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-all"
            >
              <span>Encerrar o Dia</span>
              <span className="text-xl">🌙</span>
            </button>
          </>
        )}
        {activeTab === 'science' && <ScienceView />}
        {activeTab === 'soul' && <SoulView onOpenPrayer={() => openTaskDetail(tasks.find(t => t.type === 'prayer')!)} />}
        {activeTab === 'progress' && (
          <ProgressView 
            history={progress} 
            onSave={saveProgress} 
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTaskModal && (
        <TaskModal 
          task={activeTaskModal} 
          onClose={() => setActiveTaskModal(null)} 
          onComplete={(id) => {
            toggleTask(id);
            setActiveTaskModal(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
