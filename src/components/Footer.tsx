import React from 'react';
import { Logo } from './Logo';
import { Scale, Lock, ArrowRight, FileEdit } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenTutorial?: () => void;
  onOpenLandingPage?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenAdmin, 
  onOpenTutorial,
  onOpenLandingPage 
}) => {
  const { siteConfig } = useSite();

  return (
    <footer className="bg-[#040810] text-slate-400 border-t border-[#D4AF37]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-sans-body leading-relaxed">
            Desde 1908, excelência jurídica centenária em três gerações. Advocacia estratégica, proteção patrimonial e inteligência jurídica.
          </p>
        </div>

        {/* 4 Footer Boxes as requested in Item 14 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-[#D4AF37]/20">
          {/* Box 1: Editor de Sites (Acesso Restrito Admin) */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-3">
                <FileEdit className="w-5 h-5 text-[#E5C158]" />
              </div>
              <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-2">
                Editor de Sites
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Acesso administrativo restrito para edição e personalização em tempo real de conteúdos do site.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 px-3 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-[#F6E27A] hover:bg-[#1A365D] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                title="Acessar Editor de Sites"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin (Editor de Sites)</span>
              </button>
            </div>
          </div>

          {/* Box 2: Planejamento Patrimonial 4.0 */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-3">
                <Scale className="w-5 h-5 text-[#E5C158]" />
              </div>
              <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-2">
                Planejamento Patrimonial 4.0
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Proteção e perpetuação do patrimônio familiar em vida, evitando o inventário e os custos sucessórios.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
              <button
                onClick={onOpenLandingPage}
                className="w-full py-2 px-3 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-[#F6E27A] hover:bg-[#1A365D] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Conhecer Solução</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Box 3: Planejamento Patrimonial 4.0 */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-3">
                <Scale className="w-5 h-5 text-[#E5C158]" />
              </div>
              <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-2">
                Planejamento Patrimonial 4.0
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Modelagem societária personalizada via Holding Familiar, governança corporativa e sucessão segura.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
              <a
                href="#holding-familiar"
                className="w-full py-2 px-3 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-[#F6E27A] hover:bg-[#1A365D] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Ver Estudo de Custos</span>
              </a>
            </div>
          </div>

          {/* Box 4: Atendimento Digital e Presencial */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-3">
                <Scale className="w-5 h-5 text-[#E5C158]" />
              </div>
              <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-2">
                Atendimento Digital e Presencial
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Sede em Porto Alegre - RS com atuação digital e suporte estratégico em todo o Brasil.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
              <a
                href="#localizacao"
                className="w-full py-2 px-3 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-[#F6E27A] hover:bg-[#1A365D] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Detalhes da Sede</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Excluído "Política de Privacidade, Termos de Uso e Compliance" conforme solicitado) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Aldo Leão Advocacia Estratégica · Tradição Jurídica Centenária Desde 1908. Todos os direitos reservados.
          </p>
          <p className="max-w-xl text-center md:text-right">
            Provimento nº 205/2021 do Conselho Federal da OAB · Inscrição OAB/RS 22.418.
          </p>
        </div>
      </div>
    </footer>
  );
};
