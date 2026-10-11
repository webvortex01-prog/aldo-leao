import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Users, 
  FileEdit, 
  MessageSquare, 
  Scale, 
  ShieldCheck, 
  Play, 
  ExternalLink 
} from 'lucide-react';
import { Logo } from './Logo';

interface ExemplarTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToAdmin: () => void;
  onGoToDiagnostic: () => void;
}

export const ExemplarTutorialModal: React.FC<ExemplarTutorialModalProps> = ({
  isOpen,
  onClose,
  onGoToAdmin,
  onGoToDiagnostic,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'features'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#09152B] via-[#071122] to-[#040914] rounded-2xl border-2 border-[#D4AF37]/60 shadow-[0_0_50px_rgba(212,175,55,0.3)] overflow-hidden max-h-[92vh] flex flex-col text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 text-slate-400 hover:text-white rounded-full bg-[#050B14]/80 border border-slate-700 hover:border-[#D4AF37] transition-all cursor-pointer"
          aria-label="Fechar Guia"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#D4AF37]/30 bg-[#060D1A]/90 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <Logo size="sm" variant="symbol" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5C158] font-cinzel">
                    Projeto Exemplar de Elite
                  </span>
                  <span className="text-[10px] bg-gradient-to-r from-[#D4AF37] to-[#F6E27A] text-[#050B14] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Tutorial Completo
                  </span>
                </div>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                  Guia de Exploração do Portal & Sistema Jurídico
                </h2>
              </div>
            </div>

            {/* Quick switcher tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#050B14] rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#0E1F3D] text-[#F6E27A] border border-[#D4AF37]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('steps')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'steps'
                    ? 'bg-[#0E1F3D] text-[#F6E27A] border border-[#D4AF37]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Roteiro de Teste
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'features'
                    ? 'bg-[#0E1F3D] text-[#F6E27A] border border-[#D4AF37]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Painel CRM & CMS
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Highlight Banner */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#0E1F3D] via-[#09152B] to-[#0E1F3D] border border-[#D4AF37]/40 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] shrink-0 mt-0.5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                    Bem-vindo ao Portal de Aldo Leão Advocacia Estratégica
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Este projeto reúne o que há de mais refinado em engenharia frontend e arquitetura institucional:
                    uma experiência de alto impacto para grandes clientes somada a um <strong>painel executivo completo para o advogado gerenciar casos e editar o site sem manutenção externa</strong>.
                  </p>
                </div>
              </div>

              {/* 4 Pillars of the Exemplar Project */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-[#E5C158]">
                    <Scale className="w-4 h-4" />
                    <h4 className="font-cinzel text-sm font-bold text-white">
                      1. Identidade & Paleta Imperial
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Paleta extraída da referência (azul meia-noite profundo e ouro polido),
                    leão esculpido em ouro, balança da justiça e brasão heráldico com o monograma <strong>AL</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-[#E5C158]">
                    <ShieldCheck className="w-4 h-4" />
                    <h4 className="font-cinzel text-sm font-bold text-white">
                      2. Foto Real do Dr. Aldo Leão
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Retrato executivo em 8k reproduzindo a fisionomia do print enviado (óculos retangulares, cabelos grisalhos e gravata azul royal).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-[#E5C158]">
                    <Users className="w-4 h-4" />
                    <h4 className="font-cinzel text-sm font-bold text-white">
                      3. CRM Jurídico em Tempo Real
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cada formulário enviado no site cai direto no <strong>Gabinete Admin</strong> com ficha confidencial, acionamento no WhatsApp com 1 clique e notas internas.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-[#E5C158]">
                    <FileEdit className="w-4 h-4" />
                    <h4 className="font-cinzel text-sm font-bold text-white">
                      4. Editor CMS Sem Programador
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O Dr. Aldo altera textos, fotos, números de WhatsApp, serviços e vitórias no painel e tudo reflete ao vivo no site com persistência local.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] uppercase tracking-wider">
                Roteiro Recomendado para Testar o Projeto:
              </h3>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Teste o "Diagnóstico Preliminar de Risco"
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Role até a seção de Diagnóstico. Escolha a área (ex: Defesa Tributária, Blindagem ou Penal), a temporalidade e o volume patrimonial. O sistema calcula a matriz de risco e gera precedentes instantâneos.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onGoToDiagnostic();
                      }}
                      className="mt-2 text-xs font-semibold text-[#F6E27A] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ir testar o Diagnóstico agora</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Envie um Formulário de Consulta
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Clique no botão <strong>"Consulta Confidencial"</strong> ou no formulário do rodapé e digite um caso de teste. Ao submeter, os dados são transmitidos com criptografia.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Abra o "Gabinete Dr. Aldo" no Topo
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Acesse a área administrativa. Você verá o lead que acabou de enviar no topo da lista com tag <strong>"Novo"</strong>, junto a outros casos pré-populados de milhões de reais!
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onGoToAdmin();
                      }}
                      className="mt-2 text-xs font-semibold text-[#F6E27A] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Abrir o Gabinete Admin agora</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Edite Textos, Livros e Fotos no CMS Live
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      No painel, clique na aba <strong>"Editor do Site (CMS Live)"</strong>. Altere o título principal, adicione ou edite os <strong>6 livros do Dr. Aldo Leão</strong>, ative ou desative downloads em PDF, mude a foto ou o WhatsApp de plantão. Clique em <strong>"Salvar no Site"</strong> para ver tudo refletido na hora!
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Biblioteca Jurídica: Baixe E-Books (PDF) & Adquira Exemplares
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Navegue até a seção <strong>"Livros do Dr. Aldo Leão"</strong>. São 6 livros de referência, incluindo <strong>4 e-books com download imediato liberado em PDF</strong> e botões diretos para aquisição de exemplares completos e contato com o autor.
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] font-bold text-xs shrink-0 mt-0.5">
                    6
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Selo Comemorativo de 40 Anos de Advocacia (1986–2026)
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Conheça a chancela histórica do <strong>Selo de 40 Anos</strong> com visualizador em alta resolução e explicação detalhada sobre a importância de quatro décadas ininterruptas de liderança e segurança jurídica.
                    </p>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] font-bold text-xs shrink-0 mt-0.5">
                    7
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Academia Leão Ferreira & Palestras Nacionais
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Explore a seção da <strong>Academia Leão</strong> com seu logo oficial, fotos reais do Dr. Aldo ministrando conferências em auditórios e catálogo completo de temas corporativos para contratação.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] uppercase tracking-wider">
                Recursos do Painel Administrativo:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800">
                  <div className="flex items-center gap-2 text-[#25D366] font-bold text-xs mb-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Integrado com 1 Clique</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Abre direto o WhatsApp Web ou App do celular com mensagem elegante convidando o cliente para reunião reservada.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1">
                    <Layers className="w-4 h-4" />
                    <span>Controle de Status do Caso</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Acompanhamento visual de cada caso de "Novo" até "Contrato Fechado" ou "Proposta Enviada".
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800">
                  <div className="flex items-center gap-2 text-[#E5C158] font-bold text-xs mb-1">
                    <FileEdit className="w-4 h-4" />
                    <span>Notas Estratégicas Privativas</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Bloco de anotações confidenciais do advogado salvo individualmente dentro de cada caso.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#060D1A] border border-slate-800">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs mb-1">
                    <ExternalLink className="w-4 h-4" />
                    <span>Exportação para Planilha CSV</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Baixe relatórios executivos com todos os dados dos clientes para Excel ou Google Planilhas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 sm:p-6 border-t border-[#D4AF37]/25 bg-[#050B14] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 text-center sm:text-left">
            Você pode reabrir este Guia a qualquer momento clicando em <strong>"Guia do Projeto"</strong>.
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onGoToAdmin();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-200 border border-[#D4AF37]/50 bg-[#0A1730] hover:bg-[#0E1F3D] hover:text-[#F6E27A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Ver Gabinete Admin</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Explorar o Site</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
