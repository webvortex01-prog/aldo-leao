import React, { useState } from 'react';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { ProfessionalExperienceCounter } from './components/ProfessionalExperienceCounter';
import { CentennialLegacy } from './components/CentennialLegacy';
import { InstitutionalQuote } from './components/InstitutionalQuote';
import { PracticeAreas } from './components/PracticeAreas';
import { HoldingFamiliarSection } from './components/HoldingFamiliarSection';
import { ExcellenceSolutions } from './components/ExcellenceSolutions';
import { StrategicAssessment } from './components/StrategicAssessment';
import { HeadJuridico } from './components/HeadJuridico';
import { CaseStudies } from './components/CaseStudies';
import { DigitalBooksSection } from './components/DigitalBooksSection';
import { PublicationsSection } from './components/PublicationsSection';
import { NationalDigitalPresence } from './components/NationalDigitalPresence';
import { DigitalConsultationCTA } from './components/DigitalConsultationCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { UrgentHotlineFloat } from './components/UrgentHotlineFloat';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ExemplarTutorialModal } from './components/ExemplarTutorialModal';
import { HoldingLandingPage } from './components/HoldingLandingPage';

function AppContent() {
  const [currentView, setCurrentView] = useState<'site' | 'admin' | 'holding-landing'>('site');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(true);
  const [presetArea, setPresetArea] = useState<string>('Planejamento Patrimonial 4.0');
  const [presetUrgency, setPresetUrgency] = useState<string>('media');
  const [presetValue, setPresetValue] = useState<string>('R$ 2M - R$ 5M');

  const handleOpenConsultation = (area?: string) => {
    if (area) setPresetArea(area);
    setIsConsultationOpen(true);
  };

  const handleStrategySelected = (data: { area: string; urgency: string; estimatedValue: string }) => {
    setPresetArea(data.area);
    setPresetUrgency(data.urgency);
    setPresetValue(data.estimatedValue);
    setIsConsultationOpen(true);
  };

  const handleScrollToDiagnostic = () => {
    const el = document.getElementById('diagnostico');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // View: Gabinete Admin (CRM + CMS)
  if (currentView === 'admin') {
    return <AdminDashboard onBackToSite={() => setCurrentView('site')} />;
  }

  // View: Landing Page Exclusiva de Holding Familiar 4.0
  if (currentView === 'holding-landing') {
    return (
      <HoldingLandingPage
        onBackToSite={() => setCurrentView('site')}
        onOpenAdmin={() => setCurrentView('admin')}
      />
    );
  }

  // View: Portal Institucional Completo
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans-body selection:bg-[#D4AF37]/30 selection:text-[#F6E27A]">
      {/* Top Bar with 3-Zone Contract, Landing Page direct access & Admin Access */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAdmin={() => setCurrentView('admin')}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenLandingPage={() => setCurrentView('holding-landing')}
      />

      {/* Main Page Flow adhering to the PDF specifications */}
      <main className="flex-grow">
        {/* 1. Hero Slider com Slide 1 (Tradição 1908 - 118 anos) e Slide 2 (Holding 4.0) */}
        <HeroSlider
          onOpenConsultation={() => handleOpenConsultation()}
          onGoToLandingPage={() => setCurrentView('holding-landing')}
        />

        {/* 2. Caixa Dourada de Experiência Profissional (40 Anos Dr. Aldo Leão, 1986-2026) */}
        <ProfessionalExperienceCounter />

        {/* 3. O Legado Centenário (1908 1ª Geração Arnaldo Ferreira, 2ª Geração, 3ª Geração Aldo Leão Filho) */}
        <CentennialLegacy />

        {/* 4. Citação Institucional de Impacto ("Patrimônios podem ser construídos em uma vida...") */}
        <InstitutionalQuote />

        {/* 5. As 5 Áreas de Atuação Estratégicas do PDF */}
        <PracticeAreas
          onGoToLandingPage={() => setCurrentView('holding-landing')}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 6. Holding Familiar 4.0 + Tabela Comparativa de Custos (Inventário x Holding - Economia de R$ 164.000,00) */}
        <HoldingFamiliarSection
          onGoToLandingPage={() => setCurrentView('holding-landing')}
        />

        {/* 7. As 14 Soluções de Excelência da Aldo Leão Advocacia Estratégica */}
        <ExcellenceSolutions
          onGoToLandingPage={() => setCurrentView('holding-landing')}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 8. Diagnóstico de Risco Interativo & Consulta Preliminar */}
        <StrategicAssessment onSelectStrategy={handleStrategySelected} />

        {/* 9. Head Jurídico (Dr. Aldo Leão Ferreira Filho, PUC-RS, Unisinos, 20 Municípios, Livros e Modal) */}
        <HeadJuridico
          onOpenConsultation={() => handleOpenConsultation()}
          onGoToLandingPage={() => setCurrentView('holding-landing')}
        />

        {/* 10. Histórico de Grandes Vitórias & Precedentes */}
        <CaseStudies />

        {/* 11. Livros do Dr. Aldo Leão (6 Livros, sendo 4 para Download Imediato em PDF e Aquisição) */}
        <DigitalBooksSection
          onOpenConsultation={(area) => handleOpenConsultation(area)}
        />

        {/* 12. Publicações Jurídicas (Artigos e Notícias com busca, filtro e leitor) */}
        <PublicationsSection />

        {/* 12. Presença Nacional Digital (Atendimento 100% digital a partir de Porto Alegre) */}
        <NationalDigitalPresence />

        {/* 13. Agende Sua Consulta Jurídica Digital */}
        <DigitalConsultationCTA
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 14. Canais de Contato & Sede Porto Alegre */}
        <ContactSection
          initialArea={presetArea}
          initialUrgency={presetUrgency}
          initialValue={presetValue}
        />
      </main>

      {/* Footer com Sede Porto Alegre, Horário, CFOAB e Links */}
      <Footer 
        onOpenAdmin={() => setCurrentView('admin')} 
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

      {/* Floating 24/7 Hotline Widget */}
      <UrgentHotlineFloat onOpenConsultation={() => handleOpenConsultation()} />

      {/* Priority Strategic Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        presetArea={presetArea}
        presetUrgency={presetUrgency}
        presetValue={presetValue}
      />

      {/* Grand Onboarding / Exemplar Project Tutorial Modal */}
      <ExemplarTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onGoToAdmin={() => {
          setIsTutorialOpen(false);
          setCurrentView('admin');
        }}
        onGoToDiagnostic={handleScrollToDiagnostic}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
