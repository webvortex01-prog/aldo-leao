import React, { useState, useEffect, useRef } from 'react';
import { Scale, Award, Shield } from 'lucide-react';

export const ProfessionalExperienceCounter: React.FC = () => {
  const currentYear = 2026;
  const targetYears = currentYear - 1986; // 40 anos
  const [count, setCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    // Animação rápida e fluida de 0 a 40 (cerca de 850ms a 1000ms)
    const duration = 900;
    const stepTime = Math.max(16, Math.floor(duration / targetYears));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= targetYears) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, targetYears]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-[#050B14] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/35 bg-gradient-to-r from-[#071122] via-[#0B1A35] to-[#071122] p-6 sm:p-10 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Photo of Dr. Aldo without the yellow box */}
            <div className="md:col-span-5 relative flex flex-col items-center">
              <div className="relative w-full max-w-sm">
                <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 aspect-[4/3] bg-[#0A1730] shadow-2xl">
                  <img
                    src="/img/dr-aldo-foco.jpg"
                    alt="Dr. Aldo Leão - 40 Anos de Advocacia Estratégica"
                    className="w-full h-full object-cover object-top opacity-95 hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/DraldoFOCO.jpg.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-40" />
                </div>
              </div>
            </div>

            {/* Right Column: Context & Credibility */}
            <div className="md:col-span-7 md:pl-4 lg:pl-6 text-left mt-2 md:mt-0">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-2">
                <span>ADVOCACIA ESTRATÉGICA DE EXCELÊNCIA</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                40 Anos + de Excelência Jurídica na Advocacia Estratégica
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
                Iniciada em 1986, a atuação do <strong className="text-white font-medium">Dr. Aldo Leão</strong> na terceira
                geração jurídica da família consolidou uma das trajetórias mais respeitadas na proteção patrimonial e empresarial
                do país, unindo rigor acadêmico, prática forense de alto escalão e inteligência jurídica.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div className="p-3 rounded-lg bg-[#050B14]/60 border border-[#D4AF37]/30 sm:bg-transparent sm:border-0 sm:p-0">
                  <p className="font-cinzel text-base sm:text-lg font-bold text-[#F6E27A]">Desde 1986 Advocacia Estratégica</p>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Atuação Contínua de Excelência</p>
                </div>
                <div className="p-3 rounded-lg bg-[#050B14]/60 border border-[#D4AF37]/30 sm:bg-transparent sm:border-0 sm:p-0">
                  <p className="font-cinzel text-base sm:text-lg font-bold text-white">3ª Geração Tradição Jurídica Familiar Centenária</p>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Desde 1908 no Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
