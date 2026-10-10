import React, { useState } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { ConsultationRequest } from '../types';
import { useSite } from '../context/SiteContext';

interface ContactSectionProps {
  initialArea?: string;
  initialUrgency?: string;
  initialValue?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialArea = 'Defesa Tributária & CARF',
  initialUrgency = 'media',
  initialValue = 'R$ 5M - R$ 20M'
}) => {
  const { siteConfig, addLead } = useSite();
  const { contact } = siteConfig;

  const [formData, setFormData] = useState<ConsultationRequest>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    area: initialArea,
    urgency: initialUrgency as any,
    estimatedValue: initialValue,
    summary: '',
    ndaAccepted: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;
    setLoading(true);

    // Save lead into Admin CRM
    addLead({
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      area: formData.area,
      urgency: formData.urgency,
      estimatedValue: formData.estimatedValue,
      summary: formData.summary,
      ndaAccepted: formData.ndaAccepted
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Olá Dr. Aldo Leão, gostaria de agendar uma consulta jurídica estratégica confidencial.\n\n*Nome:* ${formData.fullName || 'Não informado'}\n*Área:* ${formData.area}\n*Urgência:* ${formData.urgency.toUpperCase()}\n*Valor estimado:* ${formData.estimatedValue || 'A definir'}`
    );
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-[#050B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office Contacts & Headquarters */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-semibold mb-3">
                <span>Atendimento Privativo</span>
                <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
                <span>Sigilo OAB Garantido</span>
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
                Inicie Sua <span className="gold-text-gradient">Defesa Estratégica</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-sans-body leading-relaxed">
                Cada consulta é conduzida sob estrito sigilo profissional. Nossos advogados
                sócios analisarão preliminarmente a viabilidade e os riscos do seu caso.
              </p>
            </div>

            {/* Offices & Contact Cards */}
            <div className="space-y-4 pt-2">
              {/* Sede Porto Alegre */}
              <div className="p-5 rounded-xl bg-[#071122] border border-[#D4AF37]/35 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#E5C158] font-bold block">
                      SEDE PRINCIPAL
                    </span>
                    <h4 className="font-cinzel text-base font-bold text-white mt-0.5">
                      Porto Alegre · Rio Grande do Sul
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {contact.addressPortoAlegre}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Horário: {contact.officeHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Central Telefônica & WhatsApp */}
              <div className="p-5 rounded-xl bg-[#071122] border border-[#D4AF37]/35 shadow-lg space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white">
                      Linhas Telefônicas Privativas
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#F6E27A] font-semibold tabular-nums">
                      <span>{contact.phonePrimary}</span>
                      <span>·</span>
                      <span>{contact.phoneSecondary}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* E-mails Institucionais */}
              <div className="p-5 rounded-xl bg-[#071122] border border-[#D4AF37]/35 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <h4 className="font-cinzel text-sm font-bold text-white">
                      Canais Eletrônicos Oficiais
                    </h4>
                    <p className="text-slate-300">
                      Geral: <span className="text-[#F6E27A]">{contact.emailPrimary}</span>
                    </p>
                    <p className="text-slate-300">
                      Gabinete: <span className="text-[#F6E27A]">{contact.emailSecondary}</span>
                    </p>
                    <p className="text-slate-300">
                      Holding 4.0: <span className="text-[#F6E27A]">{contact.emailHolding}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Urgent Hotline */}
            <div className="p-4 rounded-lg bg-[#0A1730] border border-[#D4AF37]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#E5C158]" />
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">
                    Plantão de Urgência 24 Horas
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Mandados, prisões e bloqueios judiciais imediatos
                  </p>
                </div>
              </div>
              <button
                onClick={handleWhatsAppDirect}
                className="px-3.5 py-2 rounded text-xs font-semibold bg-[#25D366] text-black hover:bg-[#20ba59] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>


          {/* Right Column: Confidential Form */}
          <div className="lg:col-span-7 bg-[#071122] rounded-xl border border-[#D4AF37]/35 p-6 sm:p-10 shadow-2xl relative">
            {submitted ? (
              <div className="text-center py-12 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-white">
                  Solicitação Recebida com Sucesso
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Os detalhes foram encaminhados diretamente à coordenação jurídica do{' '}
                  <strong className="text-white">Dr. Aldo Leão</strong>. Nosso sócio responsável
                  retornará o contato confidencial em até 2 horas úteis.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="py-3 px-6 rounded text-xs font-semibold uppercase tracking-wider text-[#050B14] bg-[#25D366] hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Acelerar pelo WhatsApp Plantão</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-3 px-6 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="pb-3 border-b border-[#D4AF37]/20 flex items-center justify-between">
                  <span className="font-cinzel text-base font-bold text-white">
                    Formulário de Abertura de Caso
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#E5C158]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Proteção Fiduciária</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ex: Dr. Roberto Alcantara"
                      className="w-full px-4 py-3 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Empresa ou Família (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ex: Grupo Agro Sul S/A"
                      className="w-full px-4 py-3 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      E-mail Institucional ou Pessoal *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nome@empresa.com.br"
                      className="w-full px-4 py-3 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Telefone com DDD / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(11) 98765-4321"
                      className="w-full px-4 py-3 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Área Principal da Demanda
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
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
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Grau de Urgência
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="baixa">Preventivo / Sem Prazo Fatal</option>
                      <option value="media">Prazo em Aberto (15 a 30 dias)</option>
                      <option value="imediata">Crítico / Medida Cautelar Iminente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Resumo do Caso ou Dúvida Jurídica
                  </label>
                  <textarea
                    rows={4}
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Descreva suscintamente o litígio, autuação, valor envolvido ou necessidade patrimonial..."
                    className="w-full px-4 py-3 rounded-lg bg-[#050B14] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* NDA and ethics agreement */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="nda"
                    checked={formData.ndaAccepted}
                    onChange={(e) => setFormData({ ...formData, ndaAccepted: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-700 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="nda" className="text-xs text-slate-400">
                    Estou ciente de que as informações compartilhadas estão resguardadas pelo{' '}
                    <strong className="text-slate-300">sigilo profissional incondicional</strong>{' '}
                    estabelecido pelo Estatuto da OAB e pelo Código de Ética e Disciplina.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.ndaAccepted}
                  className="w-full py-4 rounded text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Transmitindo com Criptografia...' : 'Enviar para Avaliação de Aldo Leão'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
