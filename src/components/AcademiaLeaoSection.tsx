import React, { useState } from 'react';
import { 
  GraduationCap, 
  MessageSquare, 
  Mic2,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Building2,
  FileText,
  User,
  CreditCard,
  Send,
  X,
  CheckCircle2
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface AcademiaLeaoSectionProps {
  onOpenConsultation?: (topic?: string) => void;
  onBackToSite?: () => void;
}

export const AcademiaLeaoSection: React.FC<AcademiaLeaoSectionProps> = ({ onOpenConsultation, onBackToSite }) => {
  const { siteConfig } = useSite();
  const al = siteConfig.academiaLeao;
  const [modalOpen, setModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Form states per Item II
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [entidade, setEntidade] = useState('');
  const [assunto, setAssunto] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [observacao, setObservacao] = useState('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const officialPhone = '5551998088998';

  const handleWhatsAppAcademia = () => {
    const msg = encodeURIComponent(
      'Olá Dr. Aldo Leão, gostaria de falar com a ACADEMIA LEÃO FERREIRA sobre conferências, palestras e publicações jurídicas.'
    );
    window.open(`https://wa.me/${officialPhone}?text=${msg}`, '_blank');
  };

  const handleAgendarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `🏛️ *SOLICITAÇÃO DE AGENDAMENTO DE CONFERÊNCIA / EVENTO*\n` +
      `*ACADEMIA LEÃO FERREIRA*\n\n` +
      `👤 *Nome Completo:* ${nome}\n` +
      (cpf ? `💳 *CPF:* ${cpf}\n` : '') +
      (entidade ? `🏢 *Entidade/Empresa:* ${entidade}\n` : '') +
      (assunto ? `📌 *Assunto do Evento:* ${assunto}\n` : '') +
      (local ? `📍 *Local:* ${local}\n` : '') +
      (data ? `📅 *Data Prevista:* ${data}\n` : '') +
      (hora ? `⏰ *Hora:* ${hora}\n` : '') +
      (observacao ? `📝 *Observação:* ${observacao}\n` : '') +
      `\nSolicito informações e viabilidade de agenda para conferência/palestra com o Dr. Aldo Leão.`
    );
    window.open(`https://wa.me/${officialPhone}?text=${msg}`, '_blank');
    setFormSent(true);
  };

  return (
    <section id="academia-leao" className="py-16 md:py-24 bg-[#050B14] relative border-t border-[#D4AF37]/30 overflow-hidden min-h-screen">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#0E1F3D]/40 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Voltar button */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (onBackToSite) {
                onBackToSite();
                window.scrollTo({ top: 0, behavior: 'instant' });
              } else {
                const el = document.getElementById('solucoes-excelencia');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="btn-secondary-luxury inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-xs font-semibold text-[#F6E27A] hover:bg-[#1A365D] hover:text-white transition-all cursor-pointer shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        </div>

        {/* 1. Card inicial em dourado: apenas "CENTRO DE ESTUDOS JURÍDICOS SUPERIORES" */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1F3D]/90 border border-[#D4AF37]/60 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <GraduationCap className="w-4 h-4 text-[#F6E27A]" />
            <span>{al?.kicker || 'CENTRO DE ESTUDOS JURÍDICOS SUPERIORES'}</span>
          </div>

          {/* 2. Título da página: ACADEMIA LEÃO FERREIRA */}
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mt-5 mb-6 [text-wrap:balance]">
            ACADEMIA <span className="gold-text-gradient">LEÃO FERREIRA</span>
          </h1>

          {/* 3. Texto que consta do projeto */}
          <div className="space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light text-center sm:text-justify mb-8">
            <p>
              {al?.paragraph1 || 'Centro de Estudos Jurídicos Superiores da Aldo Leão Advocacia Estratégica, dedicado à produção e difusão do conhecimento jurídico especializado.'}
            </p>
            <p>
              {al?.paragraph2 || 'A Academia realiza a publicação de artigos jurídicos, de livros digitais, promove a realização de palestras, cursos, treinamentos, mentorias, workshops e seminários especializados.'}
            </p>
            <p className="font-normal text-white">
              {al?.paragraph3 || 'Nossa missão é transformar o conhecimento jurídico especializado em uma ferramenta de evolução pessoal e transformação.'}
            </p>
          </div>

          {/* 4. Frase em dourado: CONFERENCISTA E PALESTRANTE NACIONAL */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mt-4 mb-3">
            <Mic2 className="w-4 h-4 text-[#F6E27A]" />
            <span>{al?.phraseGold || 'CONFERENCISTA E PALESTRANTE NACIONAL'}</span>
          </div>

          {/* 5. Texto em branco */}
          <p className="text-sm sm:text-base text-white font-sans-body max-w-2xl mx-auto mb-6 leading-relaxed">
            {al?.speakerText || 'O Dr. Aldo Leão é presença marcante em congressos, seminários, mentorias, workshops, fóruns empresariais e imobiliários e palestras.'}
          </p>

          {/* 6. Botão dourado "FALAR COM A ACADEMIA" (whatsapp) */}
          <div className="flex justify-center mb-10">
            <button
              onClick={handleWhatsAppAcademia}
              className="btn-gold-luxury group px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>{al?.btnWhatsApp || 'FALAR COM A ACADEMIA'}</span>
            </button>
          </div>
        </div>

        {/* 7. Box da imagem com título PLANEJAMENTO PATRIMONIAL 4.0 & O ALTO CUSTO DA OMISSÃO (Item II) */}
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 bg-[#071122] shadow-2xl mb-8">
          <div className="p-4 bg-gradient-to-r from-[#0E1F3D] to-[#071122] border-b border-[#D4AF37]/30 flex items-center justify-center text-center">
            <span className="font-cinzel text-xs sm:text-sm md:text-base font-bold text-[#F6E27A] uppercase tracking-wider">
              {al?.lectureBoxTitle || 'PLANEJAMENTO PATRIMONIAL 4.0 & O ALTO CUSTO DA OMISSÃO'}
            </span>
          </div>
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src={al?.lecturePhotoUrl || '/img/palestra-1.jpg'}
              alt={al?.lectureBoxTitle || 'Dr. Aldo Leão em conferência presencial'}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/palestra.jpg.jpeg';
              }}
            />
          </div>
          {/* Texto branco abaixo da imagem conforme Item II */}
          <div className="p-4 bg-[#070F1E] text-center text-xs sm:text-sm text-white font-normal leading-relaxed">
            {al?.lectureCaption || 'Dr. Aldo Leão em conferência presencial sobre Planejamento Patrimonial 4.0 & o Alto Custo da Omissão'}
          </div>
        </div>

        {/* 8. Texto em dourado e Botão AGENDAR CONFERÊNCIA abaixo do box (Item II) */}
        <div className="max-w-3xl mx-auto text-center space-y-5 pt-4">
          <p className="text-sm sm:text-base text-[#F6E27A] font-medium leading-relaxed max-w-2xl mx-auto [text-wrap:balance]">
            {al?.ctaPrompt || 'Para solicitar a realização de uma Conferência, Palestra, Seminário, Mentoria ou Workshop a ser ministrado pelo Dr. Aldo Leão, clique no botão abaixo.'}
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => {
                setFormSent(false);
                setModalOpen(true);
              }}
              className="btn-gold-luxury group px-9 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Mic2 className="w-4 h-4 text-[#050B14] group-hover:scale-110 transition-transform" />
              <span>{al?.ctaButtonText || 'AGENDAR CONFERÊNCIA'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL FORMULÁRIO AGENDAR CONFERÊNCIA (Item II) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#071122] rounded-2xl border-2 border-[#D4AF37]/60 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/30 pb-4 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-[#E5C158] font-bold block mb-1">
                ACADEMIA LEÃO FERREIRA · EVENTOS & CONFERÊNCIAS
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white uppercase">
                AGENDAR CONFERÊNCIA
              </h3>
              <p className="text-xs text-[#E5C158] mt-1 font-medium">
                Preencha os dados abaixo para solicitar conferência, palestra, seminário, mentoria ou workshop com o Dr. Aldo Leão.
              </p>
            </div>

            {formSent ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-cinzel text-xl font-bold text-white uppercase">
                  Solicitação Enviada com Sucesso
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Os dados foram direcionados com sucesso para o WhatsApp oficial da Academia Leão Ferreira. O Dr. Aldo Leão retornará em breve.
                </p>
                <button
                  onClick={() => {
                    setFormSent(false);
                    setModalOpen(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer shadow"
                >
                  Concluir
                </button>
              </div>
            ) : (
              <form onSubmit={handleAgendarSubmit} className="space-y-4">
                {/* Nome Completo */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Nome Completo <span className="text-[#D4AF37]">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome completo do solicitante / responsável"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* CPF e Entidade/Empresa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>CPF</span>
                    </label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      placeholder="000.000.000-00"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>Entidade / Empresa</span>
                    </label>
                    <input
                      type="text"
                      value={entidade}
                      onChange={(e) => setEntidade(e.target.value)}
                      placeholder="Empresa, Associação, OAB, Universidade..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Assunto do Evento */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Mic2 className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Assunto do Evento <span className="text-[#D4AF37]">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    placeholder="Ex: Planejamento Patrimonial 4.0, Holding Familiar, Governança..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Local */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Local</span>
                  </label>
                  <input
                    type="text"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    placeholder="Cidade/UF ou Auditório / Formato Online"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Data e Hora */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>Data</span>
                    </label>
                    <input
                      type="text"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      placeholder="DD/MM/AAAA ou Mês Previsto"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>Hora</span>
                    </label>
                    <input
                      type="text"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      placeholder="Ex: 09:30hs ou Turno Manhã"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Observação */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Observação</span>
                  </label>
                  <textarea
                    rows={3}
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    placeholder="Informações adicionais sobre o formato, público estimado ou demandas específicas..."
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
        </div>
      )}
    </section>
  );
};
