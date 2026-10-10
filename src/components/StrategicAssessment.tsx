import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle2, ChevronRight, FileText, Send } from 'lucide-react';

interface AssessmentProps {
  onSelectStrategy: (data: { area: string; urgency: string; estimatedValue: string }) => void;
}

export const StrategicAssessment: React.FC<AssessmentProps> = ({ onSelectStrategy }) => {
  const [selectedArea, setSelectedArea] = useState('tributario');
  const [selectedStage, setSelectedStage] = useState('urgente');
  const [selectedValue, setSelectedValue] = useState('5m-20m');
  const [analysisRequested, setAnalysisRequested] = useState(false);

  const areas = [
    {
      id: 'tributario',
      name: 'Defesa Tributária & CARF',
      riskProfile: 'Elevado Risco de Penhora & Bloqueio BacenJud',
      action: 'Análise de decadência, prescrição e pedido de tutela de urgência para suspensão de exigibilidade.',
      keyPrecedent: 'Jurisprudência favorável da 1ª Seção do STJ sobre crédito tributário.'
    },
    {
      id: 'societario',
      name: 'Disputa Societária & M&A',
      riskProfile: 'Risco de Dissolução Forçada & Desvalorização de Ativos',
      action: 'Auditoria de governança, blindagem de quotas, medidas cautelares de preservação societária.',
      keyPrecedent: 'Defesa de direitos minoritários e apuração rigorosa de haveres.'
    },
    {
      id: 'penal',
      name: 'Direito Penal Econômico & Compliance',
      riskProfile: 'Risco Cautelar à Liberdade e Reputação Institucional',
      action: 'Habeas corpus preventivo, trancamento de inquérito e impugnação de provas ilegítimas.',
      keyPrecedent: 'Garantismo constitucional e controle de legalidade em cortes federais.'
    },
    {
      id: 'patrimonial',
      name: 'Blindagem Patrimonial & Sucessão Familiar',
      riskProfile: 'Vulnerabilidade Sucessória e Risco de Dilapidação',
      action: 'Estruturação de Holding patrimonial, acordo de acionistas e doação com reserva de usufruto.',
      keyPrecedent: 'Segregação patrimonial lícita imune a contingências operacionais futuras.'
    },
    {
      id: 'cortes',
      name: 'Recursos em Cortes Superiores (STF/STJ)',
      riskProfile: 'Última Instância Decisória de Coisa Julgada',
      action: 'Prequestionamento minucioso, elaboração de memoriais e sustentação oral presencial.',
      keyPrecedent: 'Superação de súmulas restritivas com tese de repercussão geral.'
    }
  ];

  const currentAreaInfo = areas.find(a => a.id === selectedArea) || areas[0];

  const handleApply = () => {
    onSelectStrategy({
      area: currentAreaInfo.name,
      urgency: selectedStage === 'urgente' ? 'imediata' : selectedStage === 'recente' ? 'media' : 'baixa',
      estimatedValue: selectedValue === '5m-20m' ? 'R$ 5M - R$ 20M' : selectedValue === 'acima-20m' ? 'Acima de R$ 20M' : 'Até R$ 5M'
    });
  };

  return (
    <section id="diagnostico" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-b border-[#D4AF37]/20">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-semibold mb-3">
            <span>Diagnóstico Preliminar</span>
            <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
            <span>Matriz de Risco Jurídico</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            Avaliação Estratégica de <span className="gold-text-gradient">Gravidade e Prontidão</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans-body">
            Identifique os vetores de vulnerabilidade do seu caso e receba a linha mestra
            de enfrentamento técnico adotada pela bancada de Aldo Leão.
          </p>
        </div>

        {/* Assessment Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#071122] rounded-xl border border-[#D4AF37]/30 p-6 sm:p-8 space-y-7 shadow-xl">
            {/* Step 1: Area Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                1. Selecione a Natureza do Litígio ou Demanda:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {areas.map(area => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`text-left p-3.5 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                      selectedArea === area.id
                        ? 'border-[#D4AF37] bg-[#0E1F3D] text-[#F6E27A] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                        : 'border-slate-800 bg-[#060D1A]/60 text-slate-300 hover:border-[#D4AF37]/40 hover:text-white'
                    }`}
                  >
                    <span>{area.name}</span>
                    {selectedArea === area.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Urgency Stage */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                2. Estágio Atual do Conflito / Temporalidade:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'preventivo', label: 'Preventivo / Planejamento', tag: 'Janela Segura' },
                  { id: 'recente', label: 'Notificação Recente / Prazo Aberto', tag: 'Atenção Imediata' },
                  { id: 'urgente', label: 'Risco Iminente / Bloqueio Judicial', tag: 'Urgência Crítica' }
                ].map(stage => (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={`text-left p-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      selectedStage === stage.id
                        ? 'border-[#D4AF37] bg-[#0E1F3D] text-[#F6E27A]'
                        : 'border-slate-800 bg-[#060D1A]/60 text-slate-300 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div className="font-semibold text-slate-200">{stage.label}</div>
                    <div className="text-[10px] text-[#D4AF37] mt-1">{stage.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Financial Scale */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                3. Volume de Recursos / Patrimônio em Questão:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'ate-5m', label: 'Até R$ 5 Mi' },
                  { id: '5m-20m', label: 'R$ 5M a R$ 20 Mi' },
                  { id: 'acima-20m', label: 'Acima de R$ 20 Mi' }
                ].map(val => (
                  <button
                    key={val.id}
                    onClick={() => setSelectedValue(val.id)}
                    className={`text-center p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer tabular-nums ${
                      selectedValue === val.id
                        ? 'border-[#D4AF37] bg-[#0E1F3D] text-[#F6E27A]'
                        : 'border-slate-800 bg-[#060D1A]/60 text-slate-400 hover:border-[#D4AF37]/40 hover:text-slate-200'
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnosis Vector Result */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#09152B] to-[#060D1A] rounded-xl border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/25 mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#E5C158]" />
                <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                  Parecer Preliminar
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#E5C158] uppercase tracking-wider">
                Protocolo Confidencial
              </span>
            </div>

            {/* Risk profile statement */}
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Matriz de Exposição Identificada:
                </p>
                <div className="flex items-start gap-2.5 text-[#F6E27A] font-semibold text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#E5C158] mt-0.5" />
                  <span>{currentAreaInfo.riskProfile}</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Estratégia Recomendada por Aldo Leão:
                </p>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#050B14]/70 p-3.5 rounded border border-slate-800">
                  {currentAreaInfo.action}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Fundamento & Precedente Jurídico:
                </p>
                <p className="text-xs text-slate-300 italic">
                  "{currentAreaInfo.keyPrecedent}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/20">
                <button
                  onClick={handleApply}
                  className="w-full py-4 rounded text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.3)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submeter Caso a Aldo Leão</span>
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2.5">
                  Sigilo protegido pelo art. 7º, II do Estatuto da OAB (Lei 8.906/94).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
