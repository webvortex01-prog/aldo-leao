import React, { useState, useEffect } from 'react';
import { X, Shield, Send, CheckCircle2, Phone, Mail, MessageSquare } from 'lucide-react';
import { Logo } from './Logo';
import { useSite } from '../context/SiteContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetArea?: string;
  presetUrgency?: string;
  presetValue?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  presetArea,
  presetUrgency,
  presetValue,
}) => {
  const { siteConfig, addLead } = useSite();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState(presetArea || 'Defesa Tributária & CARF');
  const [urgency, setUrgency] = useState(presetUrgency || 'imediata');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (presetArea) setArea(presetArea);
    if (presetUrgency) setUrgency(presetUrgency);
  }, [presetArea, presetUrgency]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitting(true);

    // Save lead into Admin CRM
    addLead({
      fullName,
      phone,
      email: email || 'Não informado',
      area,
      urgency: urgency as any,
      estimatedValue: presetValue || 'A definir na consulta',
      summary: notes || 'Solicitação via Consulta Rápida',
      ndaAccepted: true
    });

    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Prezado Dr. Aldo Leão, solicito agendamento de consulta estratégica prioritária.\n\n*Cliente:* ${fullName || 'Privado'}\n*Área:* ${area}\n*Urgência:* ${urgency}\n*Contato:* ${phone || 'WhatsApp'}`
    );
    window.open(`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`, '_blank');
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-10 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white">
              Chamado Estratégico Registrado
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              Seu contato foi priorizado na agenda do <strong className="text-white">Dr. Aldo Leão</strong>.
              Nosso gabinete entrará em contato reservado com a maior brevidade.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleWhatsApp}
                className="py-3 px-6 rounded text-xs font-semibold uppercase tracking-wider text-[#050B14] bg-[#25D366] hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar Agora no WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="py-3 px-6 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#D4AF37]/20">
              <Logo size="sm" variant="symbol" />
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Consulta Estratégica Confidencial
                </h3>
                <p className="text-xs text-[#E5C158] uppercase tracking-wider">
                  Diretoria & Sócios Fundadores · Aldo Leão
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Seu Nome ou Razão Social *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nome do solicitante ou da empresa"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    WhatsApp Direto para Retorno *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    E-mail Corporativo
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato@empresa.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Área Principal
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Defesa Tributária & CARF">Defesa Tributária & CARF</option>
                    <option value="Blindagem Patrimonial & Sucessão">Blindagem Patrimonial & Sucessão</option>
                    <option value="Cortes Superiores (STF/STJ)">Cortes Superiores (STF/STJ)</option>
                    <option value="Direito Penal Econômico">Direito Penal Econômico</option>
                    <option value="Direito Societário & M&A">Direito Societário & M&A</option>
                    <option value="Agronegócio & Reestruturação">Agronegócio & Reestruturação</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Temporalidade
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="imediata">Urgência Crítica / Liminar / Prisão</option>
                    <option value="media">Prazo de Recurso Aberto</option>
                    <option value="baixa">Planejamento Preventivo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Notas sobre o Caso (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Informações adicionais para nossa análise prévia..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded text-xs font-semibold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Registrando...' : 'Solicitar Atendimento Prioritário'}</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="text-xs text-[#25D366] hover:underline inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ou prefiro acionar o Dr. Aldo Leão direto pelo WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
