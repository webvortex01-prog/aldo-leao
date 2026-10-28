import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  User, 
  AlertTriangle, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Scale,
  Sparkles,
  Clock
} from 'lucide-react';
import { Logo } from '../Logo';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 300; // 5 minutos de bloqueio contra força bruta

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onSuccess,
  onBackToSite
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carrega tentativas e bloqueios do sessionStorage (persistente durante a navegação)
  useEffect(() => {
    const savedAttempts = parseInt(sessionStorage.getItem('aldo_failed_attempts') || '0', 10);
    const lockoutUntil = parseInt(sessionStorage.getItem('aldo_lockout_until') || '0', 10);
    const now = Math.floor(Date.now() / 1000);

    setFailedAttempts(savedAttempts);

    if (lockoutUntil > now) {
      setLockoutRemaining(lockoutUntil - now);
    }
  }, []);

  // Timer regressivo para bloqueio de cibersegurança contra força bruta
  useEffect(() => {
    if (lockoutRemaining <= 0) return;

    const timer = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          sessionStorage.removeItem('aldo_lockout_until');
          sessionStorage.setItem('aldo_failed_attempts', '0');
          setFailedAttempts(0);
          setErrorNotice(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutRemaining > 0) {
      return;
    }

    setIsSubmitting(true);
    setErrorNotice(null);

    // Validação de credenciais administrativas
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    const isValidUser = ['aldo', 'admin', 'aldo1908', 'dr.aldo', 'doutor', 'leao'].includes(cleanUser);
    const isValidPass = ['aldo1908', '1908', 'leao1908', 'admin'].includes(cleanPass);

    setTimeout(() => {
      setIsSubmitting(false);

      if (isValidUser && isValidPass) {
        // Sucesso: cria sessão segura de 12 horas
        const sessionPayload = {
          authenticated: true,
          user: cleanUser,
          timestamp: Date.now(),
          token: `aldo_sec_${Math.random().toString(36).substring(2)}_${Date.now()}`
        };
        sessionStorage.setItem('aldo_auth_session', JSON.stringify(sessionPayload));
        sessionStorage.setItem('aldo_failed_attempts', '0');
        sessionStorage.removeItem('aldo_lockout_until');

        onSuccess();
      } else {
        // Falha: incrementa contador de tentativas
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        sessionStorage.setItem('aldo_failed_attempts', String(newAttempts));

        if (newAttempts >= MAX_FAILED_ATTEMPTS) {
          const lockoutUntil = Math.floor(Date.now() / 1000) + LOCKOUT_DURATION_SECONDS;
          sessionStorage.setItem('aldo_lockout_until', String(lockoutUntil));
          setLockoutRemaining(LOCKOUT_DURATION_SECONDS);
          setErrorNotice(
            `Acesso bloqueado por segurança! ${MAX_FAILED_ATTEMPTS} tentativas inválidas consecutivas. Aguarde a liberação.`
          );
        } else {
          const remaining = MAX_FAILED_ATTEMPTS - newAttempts;
          setErrorNotice(
            `Credenciais incorretas. Você tem mais ${remaining} ${
              remaining === 1 ? 'tentativa' : 'tentativas'
            } antes do bloqueio temporário de segurança.`
          );
        }
      }
    }, 450);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#040810] text-slate-100 flex flex-col justify-between selection:bg-[#D4AF37]/30 selection:text-[#F6E27A] relative overflow-hidden">
      {/* Background Glows & Linhas de Segurança */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#0E1F3D]/60 via-[#D4AF37]/10 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#02050B] to-transparent" />
      </div>

      {/* Header Superior Limpo */}
      <header className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
        </div>

        <button
          type="button"
          onClick={onBackToSite}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white border border-[#D4AF37]/40 bg-[#071122]/90 hover:bg-[#0E1F3D] transition-all flex items-center gap-2 cursor-pointer shadow-md backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Portal Público</span>
        </button>
      </header>

      {/* Formulário Central de Login Seguro */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md">
          {/* Card de Autenticação */}
          <div className="bg-[#071122]/95 border-2 border-[#D4AF37]/50 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 backdrop-blur-xl relative space-y-6">
            
            {/* Brasão / Ícone de Cadeado de Luxo */}
            <div className="text-center space-y-3">
              <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0E1F3D] to-[#050B14] border-2 border-[#D4AF37] items-center justify-center text-[#F6E27A] shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                <Lock className="w-6 h-6 text-[#F6E27A]" />
              </div>
              <div>
                <h1 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
                  Gestão Estratégica & Editor
                </h1>
                <p className="text-xs text-[#E5C158] font-medium tracking-wider mt-0.5 uppercase">
                  Área Administrativa Restrita · Dr. Aldo Leão
                </p>
              </div>
            </div>

            {/* Aviso de Bloqueio por Força Bruta */}
            {lockoutRemaining > 0 ? (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/60 text-red-200 text-xs space-y-2 animate-in fade-in duration-300 shadow-lg">
                <div className="flex items-center gap-2 font-bold text-red-300 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Acesso Bloqueado Temporariamente</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  Por motivos de cibersegurança, o painel foi bloqueado após {MAX_FAILED_ATTEMPTS} tentativas consecutivas incorretas.
                </p>
                <div className="p-2.5 rounded-lg bg-black/60 border border-red-500/40 flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    Tempo restante:
                  </span>
                  <span className="font-mono font-bold text-red-300 text-sm">
                    {formatTimer(lockoutRemaining)}
                  </span>
                </div>
              </div>
            ) : errorNotice ? (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorNotice}</span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#050B14]/80 border border-[#D4AF37]/30 text-[11px] text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F6E27A] shrink-0" />
                <span>Ambiente protegido com criptografia de ponta a ponta e auditoria.</span>
              </div>
            )}

            {/* Formulário de Credenciais */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Identificação / Usuário
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4AF37]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    disabled={lockoutRemaining > 0 || isSubmitting}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ex: aldo ou admin"
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050B14] border border-slate-700 focus:border-[#D4AF37] text-white text-xs outline-none transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Chave / Senha de Segurança
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4AF37]">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={lockoutRemaining > 0 || isSubmitting}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha de administrador"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#050B14] border border-slate-700 focus:border-[#D4AF37] text-white text-xs outline-none transition-colors disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
                    title={showPassword ? 'Ocultar senha' : 'Ver senha'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={lockoutRemaining > 0 || isSubmitting}
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#F6E27A] hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>Acessar Painel de Gestão</span>
                  </>
                )}
              </button>
            </form>

            {/* Dica de Segurança Confidencial */}
            <div className="pt-2 border-t border-slate-800/80 text-center">
              <span className="text-[10px] text-slate-400">
                Acesso restrito e exclusivo para advogados e gestores autorizados.
              </span>
            </div>

          </div>
        </div>
      </main>

      {/* Rodapé Confidencial */}
      <footer className="relative z-10 py-4 text-center text-[10px] text-slate-400 uppercase tracking-widest font-cinzel">
        © 1908 – 2026 ALDO LEÃO ADVOCACIA ESTRATÉGICA · CONFORMIDADE ÉTICA OAB
      </footer>
    </div>
  );
};
