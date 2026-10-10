import React from 'react';
import { Award, BookOpen, Scale, Shield, CheckCircle2 } from 'lucide-react';
import boardroomImg from '../assets/images/office_boardroom_luxury_1791570183507.jpg';
import { useSite } from '../context/SiteContext';

interface AboutLeadershipProps {
  onOpenConsultation: () => void;
}

export const AboutLeadership: React.FC<AboutLeadershipProps> = ({ onOpenConsultation }) => {
  const { siteConfig } = useSite();
  const { founder } = siteConfig;

  return (
    <section id="fundador" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Founder Portrait & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-24">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Subtle gold border aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37]/30 to-transparent rounded-2xl blur-md" />
              
              <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl bg-[#091528]">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={founder.photoUrl}
                    alt={`${founder.name} - ${founder.title}`}
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle contrast gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/30 to-transparent opacity-90" />

                  {/* Name tag overlay on portrait */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded bg-[#070F1E]/90 backdrop-blur-md border border-[#D4AF37]/30">
                    <p className="font-cinzel text-lg font-bold text-white">
                      {founder.name}
                    </p>
                    <p className="text-xs text-[#E5C158] font-semibold tracking-wider uppercase mt-0.5">
                      {founder.title}
                    </p>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {founder.credentials}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Authority Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-semibold mb-4">
              <span>Liderança & Tradição de Excelência</span>
              <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
              <span>O Método Leão</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-4.5xl font-bold text-white tracking-tight leading-tight mb-6 [text-wrap:balance]">
              A Força do Leão na Defesa da Sua{' '}
              <span className="gold-text-gradient">Liberdade e do Seu Patrimônio</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-sans-body mb-6">
              {founder.bioParagraph1}
            </p>

            <p className="text-base text-slate-300 leading-relaxed font-sans-body mb-8">
              {founder.bioParagraph2}
            </p>

            {/* Credential Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-[#071122] border border-[#D4AF37]/25">
                <div className="flex items-center gap-2.5 text-[#E5C158] mb-1.5">
                  <Award className="w-4 h-4" />
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-white">
                    Autoridade Reconhecida
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Mais de 150 sustentações orais perante o STF, STJ e Tribunais Regionais Federais.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#071122] border border-[#D4AF37]/25">
                <div className="flex items-center gap-2.5 text-[#E5C158] mb-1.5">
                  <Shield className="w-4 h-4" />
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-white">
                    Sem Delegação Fictícia
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Cada caso de alta complexidade tem sua condução intelectual direta pelo Dr. Aldo Leão.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="px-7 py-3.5 rounded text-xs font-semibold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 transition-all cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                Agendar com o Sócio Fundador
              </button>
            </div>
          </div>
        </div>


        {/* Boardroom Section: Physical Headquarters & Institutional Presence */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#071122] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Content in Boardroom Block */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-[0.22em] text-[#E5C158] font-semibold mb-3">
                Sede Institucional & Estrutura
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-4">
                Ambiente de Alta Blindagem e Segurança Decisória
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans-body mb-6">
                Projetado para assegurar sigilo rigoroso, nossas salas de reunião
                e salas de comando de crise contam com tecnologia de comunicação
                criptografada e isolamento acústico integral, propiciando tranquilidade
                para reuniões com conselhos de administração e famílias empresárias.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Salas de videoconferência segura conectadas diretamente a Brasília</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Protocolo de Sigilo Fiduciário rigoroso (OAB e ISO 27001)</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Atendimento presencial em São Paulo, Brasília e Curitiba</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
              <img
                src={boardroomImg}
                alt="Sala de Reuniões Executiva - Aldo Leão Advocacia Estratégica"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071122] via-transparent to-transparent lg:opacity-70 opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
