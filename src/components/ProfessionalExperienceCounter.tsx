import React, { useState, useEffect } from 'react';
import { Scale, Award, Shield } from 'lucide-react';
import partnerImg from '../assets/images/partner_aldo_leao_1791570173885.jpg';

export const ProfessionalExperienceCounter: React.FC = () => {
  const currentYear = 2026;
  const targetYears = currentYear - 1986; // 40 anos
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800; // 1.8s
    const stepTime = Math.abs(Math.floor(duration / targetYears));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= targetYears) {
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [targetYears]);

  return (
    <section className="py-16 bg-[#050B14] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/35 bg-gradient-to-r from-[#071122] via-[#0B1A35] to-[#071122] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Image with the Gold Box Counter */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Background Photo */}
                <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 aspect-[4/3] bg-[#0A1730]">
                  <img
                    src={partnerImg}
                    alt="Experiência Profissional Dr. Aldo Leão"
                    className="w-full h-full object-cover object-top opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent" />
                </div>

                {/* THE GOLDEN COUNTER BOX (Exact specification from PDF Page 15) */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 p-6 rounded-xl bg-gradient-to-br from-[#F6E27A] via-[#E5C158] to-[#D4AF37] border-2 border-white shadow-[0_10px_35px_rgba(212,175,55,0.4)] text-left min-w-[200px]">
                  {/* Scales of Justice Icon in White */}
                  <div className="mb-2">
                    <Scale className="w-7 h-7 text-white stroke-[2.2]" />
                  </div>

                  {/* Counter Number (0 to 40) */}
                  <div className="font-cinzel text-5xl font-black text-white leading-none tracking-tight tabular-nums drop-shadow-sm">
                    {count}
                  </div>

                  {/* Label: ANOS / Dr. Aldo Leão */}
                  <div className="mt-2 text-white font-bold leading-tight">
                    <p className="text-base tracking-wider uppercase font-cinzel">ANOS</p>
                    <p className="text-xs uppercase tracking-wider font-sans">Dr. Aldo Leão</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Context & Credibility */}
            <div className="md:col-span-7 md:pl-6 text-left">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-2">
                <span>EXPERIÊNCIA PROFISSIONAL COMPROVADA</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                Quatro Décadas de Excelência Jurídica e Liderança Estratégica
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
                Iniciada em 1986, a atuação do <strong className="text-white font-medium">Dr. Aldo Leão</strong> na terceira
                geração jurídica da família consolidou uma das carreiras mais respeitadas na proteção patrimonial e empresarial
                do país, unindo rigor acadêmico, prática forense de alto escalão e visão de vanguarda.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <p className="font-cinzel text-xl font-bold text-[#F6E27A] tabular-nums">1986 – 2026</p>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Atuação Ininterrupta</p>
                </div>
                <div>
                  <p className="font-cinzel text-xl font-bold text-white tabular-nums">3ª Geração</p>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Tradição Familiar Centenária</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
