
import React, { useState } from 'react';
import { supabase } from '../supabase';

interface AuthViewProps {
  onAuthComplete: (userId: string | null) => void;
  onSkip: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onAuthComplete, onSkip }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onAuthComplete(data.user?.id || null);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Conta criada com sucesso! Verifique seu e-mail se necessário.");
        onAuthComplete(data.user?.id || null);
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F8FAF9] flex flex-col p-8 z-[110] animate-fadeIn overflow-y-auto">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-500 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-blue-100">
            🌱
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isLogin 
              ? 'Sua jornada de renovação continua aqui.' 
              : 'Comece hoje sua jornada de cura e equilíbrio.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2 block">
              E-mail
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-white border-none rounded-[1.5rem] px-6 py-4 text-sm shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2 block">
              Senha
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border-none rounded-[1.5rem] px-6 py-4 text-sm shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-[10px] font-bold p-3 rounded-xl text-center uppercase tracking-tight">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl shadow-blue-100 hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-400 font-medium"
          >
            {isLogin ? 'Ainda não tem conta? ' : 'Já possui uma conta? '}
            <span className="text-blue-500 font-bold">
              {isLogin ? 'Criar conta' : 'Entrar'}
            </span>
          </button>

          <div className="pt-4">
            <button 
              onClick={onSkip}
              className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] hover:text-gray-500 transition-colors"
            >
              Continuar depois
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-auto text-center text-[10px] text-gray-300 py-4 italic">
        "Sua privacidade e saúde são nossa prioridade."
      </p>
    </div>
  );
};

export default AuthView;
