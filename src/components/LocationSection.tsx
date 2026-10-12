import React from 'react';
import { Scale, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const LocationSection: React.FC = () => {
  const { siteConfig } = useSite();

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const text = encodeURIComponent(
      'Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de falar com um Advogado especialista.'
    );
    window.open(`https://wa.me/55${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="localizacao" className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-3">
            <Scale className="w-4 h-4 text-[#F6E27A]" />
            <span>SEDE INSTITUCIONAL & ATENDIMENTO NACIONAL</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            SEDE & <span className="gold-text-gradient">LOCALIZAÇÃO</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body">
            Atendimento presencial e digital com sede em Porto Alegre - RS e atuação em todo o território nacional.
          </p>
        </div>

        {/* 4 Boxes Grid as per Item 13 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Box 1: Atendimento Presencial */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6 text-[#E5C158]" />
              </div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white mb-2">
                Atendimento Presencial
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Com hora marcada para garantir confidencialidade, tranquilidade e atenção privativa a cada caso estratégico.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20 text-[11px] text-[#E5C158] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>De 2ª à 6ª: 08h30–11h30 · 13h30–18h30</span>
            </div>
          </div>

          {/* Box 2: Porto Alegre - RS */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6 text-[#E5C158]" />
              </div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white mb-2">
                Porto Alegre - RS
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Av. Cel. Lucas de Oliveira, 1255 / Sala 502<br />
                Bairro Bela Vista · CEP 90440-011<br />
                Porto Alegre - RS
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20 text-[11px] text-[#E5C158] font-semibold">
              <span>Sede Central Dr. Aldo Leão</span>
            </div>
          </div>

          {/* Box 3: Telefones (Sem 51 3228 1000) */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6 text-[#E5C158]" />
              </div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white mb-2">
                Linhas Telefônicas
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300 font-sans-body">
                <p className="font-semibold text-white">
                  (51) 998.088.998 <span className="text-[#25D366] text-[10px] font-bold">· WhatsApp</span>
                </p>
                <p className="font-semibold text-white">
                  (51) 998.078.998 <span className="text-[#25D366] text-[10px] font-bold">· WhatsApp</span>
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
              <button
                onClick={() => handleWhatsApp('51998088998')}
                className="w-full py-2 px-3 rounded-lg bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Chamar no WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Box 4: E-mail aldoleao@hotmail.com */}
          <div className="p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6 text-[#E5C158]" />
              </div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white mb-2">
                E-mail Oficial
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Contato institucional e envio de documentos para análise prévia:
              </p>
              <p className="text-xs font-bold text-[#F6E27A] mt-2 break-all">
                aldoleao@hotmail.com
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
              <a
                href="mailto:aldoleao@hotmail.com"
                className="w-full py-2 px-3 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-semibold hover:bg-[#1A365D] hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Enviar E-mail</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
