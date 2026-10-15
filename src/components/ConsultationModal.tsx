import React, { useState, useEffect } from 'react';
import { X, Scale, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { getCleanWhatsAppDigits } from '../utils/phoneUtils';

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
  const [area, setArea] = useState(presetArea || 'Planejamento Patrimonial 4.0');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgente'>('Normal');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (presetArea) setArea(presetArea);
    if (presetUrgency === 'imediata' || presetUrgency === 'alta' || presetUrgency === 'Urgente') {
      setUrgency('Urgente');
    } else {
      setUrgency('Normal');
    }
  }, [presetArea, presetUrgency]);

  if (!isOpen) return null;

  const buildWhatsAppMessage = () => {
    return encodeURIComponent(
      `Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de agendar uma Consulta Virtual.\n\n` +
      `📋 *DADOS DO AGENDAMENTO:*\n` +
      `• *Nome Completo:* ${fullName || 'Não informado'}\n` +
      `• *WhatsApp:* ${phone || 'Não informado'}\n` +
      `• *E-mail:* ${email || 'Não informado'}\n` +
      `• *Área da Consulta:* ${area}\n` +
      `• *Tipo de Consulta:* ${urgency}\n` +
      (notes ? `• *Assunto e Histórico:* ${notes}\n` : '') +
      `\nSolicito confirmação de data e horário com o Dr. Aldo Leão.`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitting(true);

    addLead({
      fullName,
      phone,
      email: email || 'Não informado',
      area,
      urgency: urgency === 'Urgente' ? 'imediata' : 'normal' as any,
      estimatedValue: presetValue || 'A definir na consulta',
      summary: notes || 'Solicitação via Consulta Digital do Site',
      ndaAccepted: true
    });

    const targetPhone = getCleanWhatsAppDigits(siteConfig.contact?.whatsappNumber, '5551998088998');
    const waUrl = `https://wa.me/${targetPhone}?text=${buildWhatsAppMessage()}`;
    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      console.warn('Popup blocked:', err);
    }

    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 400);
  };

  const handleWhatsAppDirect = () => {
    const targetPhone = getCleanWhatsAppDigits(siteConfig.contact?.whatsappNumber, '5551998088998');
    window.open(`https://wa.me/${targetPhone}?text=${buildWhatsAppMessage()}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
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
              Agendamento Registrado
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              Sua solicitação de consulta virtual foi encaminhada para a equipe do <strong className="text-white">Dr. Aldo Leão</strong>.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleWhatsAppDirect}
                className="py-3 px-6 rounded text-xs font-semibold uppercase tracking-wider text-[#050B14] bg-[#25D366] hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Agendar pelo WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="py-3 px-6 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header: Sem "diretoria & sócios fundadores . Aldo Leão" conforme Item 39 */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D4AF37]/20">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F6E27A] shrink-0">
                <Scale className="w-5 h-5 text-[#E5C158]" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Agende sua Consulta Digital
                </h3>
                <p className="text-xs text-[#E5C158]">
                  Aldo Leão Advocacia Estratégica · Atendimento Nacional
                </p>
              </div>
            </div>

            {/* Form com rótulos e campos exatos do Item 9 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome Completo */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Nome Completo <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* WhatsApp e E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    WhatsApp <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(DDD) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Área da Consulta e Tipo de Consulta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Área da Consulta
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Planejamento Patrimonial 4.0">Planejamento Patrimonial 4.0 (Holding Familiar)</option>
                    <option value="Direito Imobiliário">Direito Imobiliário</option>
                    <option value="Direito Empresarial">Direito Empresarial</option>
                    <option value="Direito Civil">Direito Civil</option>
                    <option value="Relações de Consumo">Relações de Consumo</option>
                    <option value="Advocacia Geral">Advocacia Geral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Tipo de Consulta
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as 'Normal' | 'Urgente')}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
              </div>

              {/* Assunto e Histórico */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Assunto e Histórico
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Descreva brevemente o assunto para análise prévia..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Botão AGENDAR CONSULTA VIRTUAL */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-98 text-[#050B14] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'PROCESSANDO...' : 'AGENDAR CONSULTA VIRTUAL'}</span>
                </button>
              </div>

              {/* Link Alternativo: Agendar pelo WhatsApp */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="text-xs text-[#25D366] hover:underline font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Agendar pelo WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
