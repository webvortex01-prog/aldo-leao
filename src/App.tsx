import React, { useState } from 'react';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { NationalDigitalPresence } from './components/NationalDigitalPresence';
import { CentennialLegacy } from './components/CentennialLegacy';
import { ProfessionalExperienceCounter } from './components/ProfessionalExperienceCounter';
import { Selo40AnosSection } from './components/Selo40AnosSection';
import { HeadJuridico } from './components/HeadJuridico';
import { PracticeAreas } from './components/PracticeAreas';
import { ExcellenceSolutions } from './components/ExcellenceSolutions';
import { AcademiaLeaoSection } from './components/AcademiaLeaoSection';
import { DigitalConsultationCTA } from './components/DigitalConsultationCTA';
import { HoldingFamiliarSection } from './components/HoldingFamiliarSection';
import { PublicationsSection } from './components/PublicationsSection';
import { DigitalBooksSection } from './components/DigitalBooksSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { UrgentHotlineFloat } from './components/UrgentHotlineFloat';
import { FloatingQuickNav } from './components/FloatingQuickNav';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { ExemplarTutorialModal } from './components/ExemplarTutorialModal';
import { HoldingLandingPage } from './components/HoldingLandingPage';

function AppContent() {
  const [currentView, setCurrentView] = useState<'site' | 'admin' | 'holding-landing'>('site');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [presetArea, setPresetArea] = useState<string>('Planejamento Patrimonial 4.0');
  const [presetUrgency, setPresetUrgency] = useState<string>('media');
  const [presetValue, setPresetValue] = useState<string>('R$ 2M - R$ 5M');

  const handleOpenConsultation = (area?: string) => {
    if (area) setPresetArea(area);
    setIsConsultationOpen(true);
  };

  const handleOpenAdmin = () => {
    // Exige login e senha para acessar o Editor de Sites (Admin)
    setIsAdminAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAdminAuthOpen(false);
    setCurrentView('admin');
  };

  // View: Editor de Sites (CMS Live)
  if (currentView === 'admin') {
    return <AdminDashboard onBackToSite={() => setCurrentView('site')} />;
  }

  // View: Landing Page Exclusiva de Holding Familiar 4.0
  if (currentView === 'holding-landing') {
    return (
      <HoldingLandingPage
        onBackToSite={() => setCurrentView('site')}
        onOpenAdmin={handleOpenAdmin}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    );
  }

  // View: Portal Institucional Completo com Ordem Rigorosa dos Itens 3 a 14
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans-body selection:bg-[#D4AF37]/30 selection:text-[#F6E27A]">
      {/* Top Bar with Navigation & Admin */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAdmin={handleOpenAdmin}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenLandingPage={() => setCurrentView('holding-landing')}
      />

      {/* Main Page Flow adhering to Dr. Aldo Leão specifications */}
      <main className="flex-grow">
        {/* 1. Página Home: Hero Slider com Slide 1 (Tradição 1908) e Slide 2 (Holding 4.0) */}
        <HeroSlider
          onOpenConsultation={() => handleOpenConsultation()}
          onGoToLandingPage={() => setCurrentView('holding-landing')}
        />

        {/* 2. Página PRESENÇA NACIONAL DIGITAL (Item 4) */}
        <NationalDigitalPresence />

        {/* 3. Página O LEGADO CENTENÁRIO (Item 5) */}
        <CentennialLegacy />

        {/* Deslocado para o final da página O LEGADO CENTENÁRIO abaixo da linha do tempo (Item 5) */}
        <ProfessionalExperienceCounter />
        <Selo40AnosSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 4. Página HEAD JURÍDICO (Item 6) */}
        <HeadJuridico
          onOpenConsultation={() => handleOpenConsultation()}
          onGoToLandingPage={() => setCurrentView('holding-landing')}
        />

        {/* 5. Página ÁREAS DE ATUAÇÃO (Item 7) */}
        <PracticeAreas
          onGoToLandingPage={() => setCurrentView('holding-landing')}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 6. Página SOLUÇÕES DE EXCELÊNCIA (Item 8) & ACADEMIA LEÃO (Item 16) */}
        <ExcellenceSolutions
          onGoToLandingPage={() => setCurrentView('holding-landing')}
          onOpenConsultation={() => handleOpenConsultation()}
        />
        <AcademiaLeaoSection onOpenConsultation={(topic) => handleOpenConsultation(topic)} />

        {/* 7. Página AGENDE A SUA CONSULTA DIGITAL (Item 9) */}
        <DigitalConsultationCTA
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 8. Página PLANEJAMENTO PATRIMONIAL 4.0 (Item 10) */}
        <HoldingFamiliarSection
          onGoToLandingPage={() => setCurrentView('holding-landing')}
        />

        {/* 9. Página PUBLICAÇÕES (Item 11) */}
        <PublicationsSection />

        {/* 10. Página LIVROS DIGITAIS (Item 12) */}
        <DigitalBooksSection
          onOpenConsultation={(area) => handleOpenConsultation(area)}
        />

        {/* 11. Página LOCALIZAÇÃO (Item 13) */}
        <LocationSection />
      </main>

      {/* 12. Página RODAPÉ (Item 14) */}
      <Footer 
        onOpenAdmin={handleOpenAdmin} 
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenLandingPage={() => setCurrentView('holding-landing')}
      />

      {/* Rodapé Fixo Centralizado (Item 1) */}
      <UrgentHotlineFloat onOpenConsultation={() => handleOpenConsultation()} />

      {/* Mini Menu Flutuante com Emojis & Hamburguinho (Bottom Right) */}
      <FloatingQuickNav
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAdmin={handleOpenAdmin}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenLandingPage={() => setCurrentView('holding-landing')}
      />

      {/* Modal de Autenticação / Login para Editor de Sites (Admin) */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        title="Editor de Sites · Acesso Restrito"
      />

      {/* Priority Strategic Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        presetArea={presetArea}
        presetUrgency={presetUrgency}
        presetValue={presetValue}
      />

      {/* Exemplar Project Tutorial Modal */}
      <ExemplarTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onGoToAdmin={() => {
          setIsTutorialOpen(false);
          handleOpenAdmin();
        }}
        onGoToDiagnostic={() => {
          setIsTutorialOpen(false);
          const el = document.getElementById('areas-atuacao');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
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
