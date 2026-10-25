import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, X } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPrivacyPolicy,
  onOpenTerms,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('aldoleao_cookie_consent_v1');
      if (!consent) {
        // Exibe o banner após um breve delay de 1.5s para transição suave
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Ignora erro em ambientes restritos de storage
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('aldoleao_cookie_consent_v1', 'accepted_all');
    } catch (e) {}
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem('aldoleao_cookie_consent_v1', 'accepted_essential');
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentimento de Cookies e Privacidade LGPD"
      className="fixed bottom-0 inset-x-0 z-[120] p-3 sm:p-4 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div className="max-w-6xl mx-auto rounded-2xl bg-[#061021]/98 border border-[#D4AF37]/50 shadow-[0_12px_45px_rgba(0,0,0,0.85)] backdrop-blur-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Ícone e Texto Explicativo em Estrita Conformidade LGPD & OAB */}
        <div className="flex items-start gap-3.5 flex-1 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5 text-[#E5C158]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                Privacidade & Proteção de Dados (LGPD)
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#102347] text-[#E5C158] border border-[#D4AF37]/30">
                Lei 13.709/18
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans-body leading-relaxed font-light">
              A <strong className="text-white font-medium">ALDO LEÃO ADVOCACIA ESTRATÉGICA</strong> utiliza cookies essenciais e tecnologias seguras para proporcionar uma experiência personalizada, proteger o tráfego do portal e assegurar o sigilo profissional da advocacia (<strong className="text-[#E5C158] font-medium">art. 7º, II do Estatuto da OAB</strong> e <strong className="text-[#E5C158] font-medium">Provimento nº 205/2021 do CFOAB</strong>). Não comercializamos seus dados em nenhuma hipótese.
            </p>

            <div className="flex items-center gap-3 pt-1 text-[11px]">
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-[#F6E27A] hover:underline underline-offset-2 font-medium cursor-pointer"
              >
                Política de Privacidade
              </button>
              <span className="text-slate-600">·</span>
              <button
                type="button"
                onClick={onOpenTerms}
                className="text-slate-300 hover:text-white hover:underline underline-offset-2 cursor-pointer"
              >
                Termos de Uso e Direitos Autorais
              </button>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={handleAcceptEssential}
            className="px-4 py-2.5 rounded-lg border border-slate-700 bg-[#071122] hover:bg-[#0D1C38] text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap text-center"
          >
            Apenas Essenciais
          </button>

          <button
            type="button"
            onClick={handleAcceptAll}
            className="btn-gold-luxury px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-black uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer whitespace-nowrap text-center"
          >
            Aceitar Todos
          </button>

          <button
            type="button"
            onClick={handleAcceptEssential}
            className="hidden md:flex p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
