import React, { useState } from 'react';
import { Scale, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Logo } from './Logo';
import { useSite } from '../context/SiteContext';
import { cleanAndFormatPhone, getCleanWhatsAppDigits } from '../utils/phoneUtils';

interface LocationSectionProps {
  onOpenPrivacyPolicy?: () => void;
  onOpenTerms?: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  onOpenPrivacyPolicy,
  onOpenTerms,
}) => {
  const { siteConfig } = useSite();
  const c = siteConfig.contact;

  const [formSent, setFormSent] = useState(false);
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [area, setArea] = useState('Advocacia');
  const [urgencia, setUrgencia] = useState('Normal');
  const [mensagem, setMensagem] = useState('');

  const officialWhatsApp = getCleanWhatsAppDigits(c?.whatsappNumber, '5551998088998');

  const handleWhatsApp = (num: string = officialWhatsApp, customMsg?: string) => {
    const text = encodeURIComponent(
      customMsg || 'Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de falar com um Advogado especialista.'
    );
    window.open(`https://wa.me/${num}?text=${text}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, formulário de contato enviado:\n\n` +
      `👤 *Nome Completo:* ${nome}\n` +
      `📱 *WhatsApp:* ${whatsapp}\n` +
      `📞 *Telefone:* ${telefone || 'Não informado'}\n` +
      `✉️ *E-mail:* ${email || 'Não informado'}\n` +
      `⚖️ *Área de Atuação:* ${area}\n` +
      `⚡ *Urgência:* ${urgencia}\n` +
      (mensagem ? `📝 *Mensagem:* ${mensagem}` : '')
    );
    try {
      window.open(`https://wa.me/${officialWhatsApp}?text=${text}`, '_blank');
    } catch (err) {
      console.warn(err);
    }
    setFormSent(true);
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Título CONTATO (Itens 11, 42 e X) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-3">
            <Scale className="w-4 h-4 text-[#F6E27A]" />
            <span>{c?.sectionKicker || 'ATENDIMENTO DIGITAL EM TODO O BRASIL'}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            {c?.sectionTitle || 'CONTATO'}
          </h2>

          {/* O texto que está abaixo do título CONTATO grafado na cor branca (Itens 42 e X) */}
          <p className="text-xs sm:text-sm text-white font-normal leading-relaxed font-sans-body max-w-2xl mx-auto">
            {c?.introGold || 'Escolha o canal de relacionamento com a ALDO LEÃO ADVOCACIA ESTRATÉGICA da sua preferência, para o seu atendimento digital em todo o território nacional.'}
          </p>
        </div>

        {/* Grid de Canais de Atendimento Conforme Item 13, 42, 43, 44, 45 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
          {/* Box 1: ATENDIMENTO VIRTUAL BRASIL com Balança da Justiça (Item 9, 1 e 43) */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6 text-[#E5C158]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-white mb-2 uppercase animate-title-reveal">
                {c?.boxVirtualTitle || 'ATENDIMENTO VIRTUAL BRASIL'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body font-light">
                {c?.boxVirtualText || 'Nosso atendimento em todo o território nacional é feito com hora marcada, mediante prévio agendamento pelo WhatsApp, de 2ª à 6ª feira, das 08:30/11:30hs e das 13:30/18:30hs.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
              <button
                onClick={() => handleWhatsApp(officialWhatsApp)}
                className="w-full py-2.5 px-3 rounded-lg bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>AGENDAR CONSULTA</span>
              </button>
            </div>
          </div>

          {/* Box 2: ESCRITÓRIO DIGITAL BRASIL - PORTO ALEGRE/RS */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6 text-[#E5C158]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-white mb-1 uppercase animate-title-reveal">
                ESCRITÓRIO DIGITAL BRASIL
              </h3>
              <p className="font-cinzel text-xs font-bold text-[#E5C158] uppercase mb-2">
                PORTO ALEGRE/RS
              </p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body font-light">
                {c?.addressPortoAlegre || 'Av. Cel. Lucas de Oliveira, 1255/502, Bairro Bela Vista, CEP 90440-011, Porto Alegre - RS'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20 text-[11px] text-[#F6E27A] font-semibold">
              Escritório Central
            </div>
          </div>

          {/* Box 3: TELEFONES (Itens 1, 8, 25 e 44: dois números de atendimento) */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6 text-[#E5C158]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-white mb-2 uppercase animate-title-reveal">
                TELEFONES
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300 font-sans-body">
                <p className="font-semibold text-white text-sm">
                  (51) 99808-8998
                </p>
                <p className="font-semibold text-slate-300 text-sm">
                  (51) 99807-8998
                </p>
                <p className="text-[11px] text-slate-300 pt-1">
                  Se preferir, ligue para a ALDO LEÃO ADVOCACIA ESTRATÉGICA
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
              <button
                onClick={() => handleWhatsApp(officialWhatsApp)}
                className="w-full py-2.5 px-3 rounded-lg bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>AGENDAR NO WHATSAPP</span>
              </button>
            </div>
          </div>

          {/* Box 4: E-MAILS (Itens 45 e V: sem links clicáveis e sem botão Enviar E-mail) */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6 text-[#E5C158]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-white mb-3 uppercase animate-title-reveal">
                E-MAILS
              </h3>
              <div className="space-y-3 text-xs text-slate-300 font-sans-body">
                <div>
                  <span className="font-semibold text-white block">Geral:</span>
                  <span className="text-[#F6E27A] text-[11px] break-all select-all font-medium">
                    {c?.emailPrimary || 'aldoleaoadvocacia@gmail.com'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-white block">Holding Familiar:</span>
                  <span className="text-[#F6E27A] text-[11px] block break-all select-all font-medium">
                    {c?.emailHolding1 || 'aldoleao.planejamento@gmail.com'}
                  </span>
                  <span className="text-[#F6E27A] text-[11px] block break-all mt-0.5 select-all font-medium">
                    {c?.emailHolding2 || 'holdingfamiliarbr@gmail.com'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-white block">Academia Leão Ferreira:</span>
                  <span className="text-[#F6E27A] text-[11px] break-all select-all font-medium">
                    {c?.emailAcademia || 'academialeaoferreira@gmail.com'}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20 text-[11px] text-slate-300 font-medium">
              Entre em contato enviando um e-mail, para o setor que deseja atendimento
            </div>
          </div>
        </div>

        {/* Box WHATSAPP BUSINESS com animação de abertura (Item 46 e 6) */}
        <div className="mb-14 p-6 rounded-2xl bg-gradient-to-r from-[#071122] via-[#0A1B38] to-[#071122] border border-[#25D366]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left card-hover-interactive">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366] text-black flex items-center justify-center shrink-0 shadow-lg">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white uppercase animate-title-reveal">
                WHATSAPP BUSINESS
              </h3>
              <p className="text-xs text-slate-300">
                Atendimento Rápido, com um de nossos Advogados Especialistas
              </p>
            </div>
          </div>

          <button
            onClick={() => handleWhatsApp(officialWhatsApp)}
            className="btn-gold-luxury group px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(37,211,102,0.4)] shrink-0"
          >
            <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span>FALAR NO WHATSAPP</span>
          </button>
        </div>

        {/* FORMULÁRIO DE CONTATO (Item 10, 47 e Item 6) */}
        <div className="max-w-3xl mx-auto rounded-2xl border-2 border-[#D4AF37]/50 bg-[#071122] p-6 sm:p-10 shadow-2xl text-left mb-16">
          <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white uppercase tracking-wider animate-title-reveal">
              FORMULÁRIO DE CONTATO
            </h3>
            <p className="text-xs text-[#E5C158] mt-1 font-medium">
              {c?.formPrompt || 'Preencha os campos abaixo para o seu atendimento estratégico por um de nossos Advogados especialistas.'}
            </p>
          </div>

          {formSent ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366] mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-cinzel text-lg font-bold text-white">
                Mensagem Encaminhada com Sucesso
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Sua demanda foi recebida pelo Dr. Aldo Leão e retornaremos brevemente.
              </p>
              <button
                onClick={() => setFormSent(false)}
                className="text-xs text-[#F6E27A] hover:underline cursor-pointer"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Nome Completo (sem asterisco conforme Itens 10 e 47) */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder={c?.formNamePlaceholder || 'Nome Completo'}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* WhatsApp e Telefone (WhatsApp sem asterisco conforme Itens 10 e 47) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(DDD) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(DDD) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* E-mail */}
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

              {/* Área de Atuação e Tipo de Consulta (Item 10 e 60) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Área de Atuação
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Advocacia Estratégica">Advocacia Estratégica</option>
                    <option value="Planejamento Patrimonial">Planejamento Patrimonial</option>
                    <option value="Direito Imobiliário">Direito Imobiliário</option>
                    <option value="Direito Empresarial">Direito Empresarial</option>
                    <option value="Direito Civil">Direito Civil</option>
                    <option value="Relações de Consumo e Direito">Relações de Consumo e Direito</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {c?.formConsultationLabel || 'Tipo de Consulta'}
                  </label>
                  <select
                    value={urgencia}
                    onChange={(e) => setUrgencia(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Urgente">Urgente</option>
                    <option value="Consulta Inicial">Consulta Inicial</option>
                    <option value="Sessão de Viabilidade (Holding)">Sessão de Viabilidade (Holding)</option>
                  </select>
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Mensagem
                </label>
                <textarea
                  rows={3}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Escreva sua mensagem ou resumo da demanda..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Botão ENVIAR */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-gold-luxury group w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span>ENVIAR</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Rodapé da Seção Contato com Logomarca sem cortes e Textos do Item 48 */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-[#D4AF37]/25 flex flex-col items-center text-center">
          <div className="mb-4">
            <Logo size="md" />
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans-body leading-relaxed font-light mb-3 max-w-2xl">
            A história da <strong className="text-[#F6E27A] font-bold">Aldo Leão Advocacia Estratégica</strong> começou em 1908 e perpassa Três Gerações de Excelência Jurídica, preservando os valores éticos, primazia técnica e o compromisso permanente com a proteção jurídica dos interesses de seus clientes.
          </p>
          <p className="text-xs sm:text-sm text-[#E5C158] font-sans-body leading-relaxed font-semibold max-w-2xl">
            Desde 1986, esse legado jurídico familiar centenário é representado pela terceira geração, tendo o Dr. Aldo Leão implementado a Advocacia Estratégica, unindo tradição jurídica, inovação e inteligência estratégica para oferecer soluções jurídicas avançadas e de alta performance.
          </p>

          {/* Links de Política de Privacidade e Termos de Uso e Cookies (Item 28/10 Dr. Aldo) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 mt-2 border-t border-[#D4AF37]/20 text-xs font-semibold">
            <button
              type="button"
              onClick={onOpenPrivacyPolicy}
              className="text-[#E5C158] hover:text-[#F6E27A] hover:underline underline-offset-2 transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-[#E5C158] hover:text-[#F6E27A] hover:underline underline-offset-2 transition-colors cursor-pointer"
            >
              Termos de Uso e Cookies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
