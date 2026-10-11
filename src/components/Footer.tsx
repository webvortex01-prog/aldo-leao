import React from 'react';
import { Logo } from './Logo';
import { Scale, ShieldCheck, Lock } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenTutorial?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenTutorial }) => {
  const { siteConfig } = useSite();
  const { contact } = siteConfig;


  return (
    <footer className="bg-[#040810] text-slate-400 border-t border-[#D4AF37]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D4AF37]/15">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-slate-400 font-sans-body max-w-sm leading-relaxed mt-4">
              Escritório de advocacia estratégica vocacionado para a resolução
              de litígios de alta complexidade e proteção incondicional de grandes
              patrimônios perante cortes superiores e tribunais administrativos.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E5C158] pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Inscrição {siteConfig.hero.oabNumber} · Sociedade de Advogados</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#areas-atuacao" className="hover:text-[#F6E27A] transition-colors">
                  Áreas de Atuação
                </a>
              </li>
              <li>
                <a href="#diagnostico" className="hover:text-[#F6E27A] transition-colors">
                  Diagnóstico de Risco
                </a>
              </li>
              <li>
                <a href="#selo-40-anos" className="hover:text-[#F6E27A] text-[#F6E27A] font-semibold transition-colors">
                  Selo Comemorativo 40 Anos
                </a>
              </li>
              <li>
                <a href="#academia-leao" className="hover:text-[#F6E27A] transition-colors">
                  Academia Leão Ferreira & Palestras
                </a>
              </li>
              <li>
                <a href="#head-juridico" className="hover:text-[#F6E27A] transition-colors">
                  Head Jurídico Dr. Aldo Leão
                </a>
              </li>
              <li>
                <a href="#casos" className="hover:text-[#F6E27A] transition-colors">
                  Casos Emblemáticos
                </a>
              </li>
              <li>
                <a href="#livros" className="hover:text-[#F6E27A] text-[#F6E27A] font-semibold transition-colors">
                  Livros & Obras (Download PDF)
                </a>
              </li>
              <li>
                <a href="#publicacoes" className="hover:text-[#F6E27A] transition-colors">
                  Publicações Jurídicas
                </a>
              </li>
              {onOpenTutorial && (
                <li className="pt-2">
                  <button
                    onClick={onOpenTutorial}
                    className="text-xs text-sky-400 hover:text-white flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <span>✨ Abrir Guia do Projeto Exemplar</span>
                  </button>
                </li>
              )}
              {onOpenAdmin && (
                <li className="pt-1">
                  <button
                    onClick={onOpenAdmin}
                    className="text-xs text-[#E5C158] hover:text-[#F6E27A] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Acesso Restrito · Gabinete Dr. Aldo</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Sedes & Contato */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest">
              Sede & Atendimento Digital
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>
                <strong className="text-slate-300">Sede Principal:</strong> {contact.addressPortoAlegre}
              </p>
              <p>
                <strong className="text-slate-300">Horário:</strong> {contact.officeHours}
              </p>
              <p>
                <strong className="text-slate-300">Atendimento Nacional:</strong> 100% Digital com hora marcada
              </p>
              <p className="pt-2 text-[#E5C158] font-semibold tabular-nums">
                Linhas: {contact.phonePrimary} · {contact.phoneSecondary}
              </p>
              <p className="text-[#E5C158]">
                WhatsApp: {contact.whatsappNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar & OAB Ethics Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Aldo Leão Advocacia Estratégica. Todos os direitos reservados.
          </p>
          <p className="max-w-xl text-center md:text-right">
            Este portal tem caráter estritamente informativo e atende aos ditames do Provimento nº 205/2021
            do Conselho Federal da Ordem dos Advogados do Brasil (CFOAB).
          </p>
        </div>
      </div>
    </footer>
  );
};

