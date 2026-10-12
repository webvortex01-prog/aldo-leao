import React, { useState } from 'react';
import { Lock, KeyRound, User, AlertCircle, X, ShieldCheck, Scale } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Editor de Sites · Admin',
  description = 'Área restrita de edição de conteúdos. Digite suas credenciais de administrador para acessar o Editor de Sites.',
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Credentials: login "aldo" or "admin" or "aldo1908" / password "aldo1908" or "1908"
    const validUser = ['aldo', 'admin', 'aldo1908', 'doutor', 'dr.aldo'].includes(
      username.trim().toLowerCase()
    );
    const validPass = ['aldo1908', '1908', 'leao1908', 'admin'].includes(password.trim());

    setTimeout(() => {
      if (validUser && validPass) {
        setIsLoading(false);
        setError('');
        onSuccess();
        onClose();
      } else {
        setIsLoading(false);
        setError('Login ou senha incorretos. Verifique suas credenciais de acesso.');
      }
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#071122] border border-[#D4AF37]/60 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#D4AF37]/30 flex items-center justify-between bg-gradient-to-r from-[#0E1F3D] to-[#071122]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F6E27A] shadow-[0_0_12px_rgba(212,175,55,0.3)]">
              <Scale className="w-5 h-5 text-[#E5C158]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-cinzel tracking-wider">
                {title}
              </h3>
              <p className="text-[11px] text-[#E5C158] font-semibold">
                Autenticação de Segurança OAB
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#050B14] border border-[#D4AF37]/40 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {description}
          </p>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/50 flex items-start gap-2.5 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Usuário / Login</span>
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ex: aldo1908"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/40 focus:border-[#F6E27A] text-white text-xs outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Senha de Acesso</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/40 focus:border-[#F6E27A] text-white text-xs outline-none transition-colors"
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-[#E5C158]">
              <Lock className="w-3 h-3" />
              Credencial padrão: <strong className="text-white">aldo1908</strong> / <strong className="text-white">1908</strong>
            </span>
          </div>

          <div className="pt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-95 text-[#050B14] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoading ? 'Autenticando...' : 'Acessar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
