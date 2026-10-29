import React, { useState } from 'react';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { NationalDigitalPresence } from './components/NationalDigitalPresence';
import { CentennialLegacy } from './components/CentennialLegacy';
import { HeadJuridico } from './components/HeadJuridico';
import { PracticeAreas } from './components/PracticeAreas';
import { ExcellenceSolutions } from './components/ExcellenceSolutions';
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
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { ExemplarTutorialModal } from './components/ExemplarTutorialModal';
import { HoldingLandingPage } from './components/HoldingLandingPage';
import { AcademiaLeaoSection } from './components/AcademiaLeaoSection';
import { GestaoJuridicaPage } from './components/GestaoJuridicaPage';
import { PrivacyPolicyModal, TermsOfUseModal, OabDisclaimerModal } from './components/LegalModals';

function AppContent() {
  const [currentView, setCurrentView] = useState<'site' | 'admin' | 'admin-login' | 'holding-landing' | 'academia' | 'gestao-juridica'>('site');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isOabDisclaimerOpen, setIsOabDisclaimerOpen] = useState(false);
  const [presetArea, setPresetArea] = useState<string>('Planejamento Patrimonial 4.0');
  const [presetUrgency, setPresetUrgency] = useState<string>('media');
  const [presetValue, setPresetValue] = useState<string>('R$ 2M - R$ 5M');

  // Suporte a rotas diretas via URL ou hash (/admin, /gestao, /editor, /estatisticas, /1208/)
  React.useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // 1. Rota Exclusiva da Página GESTÃO JURÍDICA 4.0 (/gestao-juridica, #gestao-juridica, #gestao-40)
      if (
        path.includes('gestao-juridica') || 
        hash.includes('gestao-juridica') || 
        hash.includes('gestao-40') ||
        path.includes('gestao-40')
      ) {
        setCurrentView('gestao-juridica');
        return;
      }

      // 2. Rota Secreta de Administração e Estatísticas (Link exclusivo para Dr. Aldo e RD)
      const isAdminRoute = 
        path.includes('admin') || 
        path.includes('editor') || 
        path.includes('estatisticas') ||
        path === '/gestao' ||
        path === '/gestao/' ||
        hash.includes('admin') || 
        hash.includes('editor') || 
        hash.includes('estatisticas') ||
        hash === '#gestao';

      if (isAdminRoute) {
        const sessionToken = sessionStorage.getItem('aldo_auth_session');
        if (sessionToken) {
          setCurrentView('admin');
        } else {
          setCurrentView('admin-login');
        }
        return;
      }

      // 2. Rota da Landing Page Exclusiva de Holding Familiar 4.0 (/1208/ ou #1208)
      if (
        path.includes('1208') || 
        path.includes('landing') || 
        path.includes('holding-landing') || 
        hash.includes('1208') || 
        hash.includes('holding-landing') ||
        hash.includes('holding')
      ) {
        setCurrentView('holding-landing');
        return;
      }

      // 3. Rota da Academia Leão Ferreira
      if (path.includes('academia') || hash.includes('academia')) {
        setCurrentView('academia');
        return;
      }
    };

    checkRoute();

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  // Efeito Global de Scroll Reveal Suave para Elementos ao Rolar a Página
  React.useEffect(() => {
    const revealVisibleNow = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll, .reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale'
      );
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 30) {
          el.classList.add('revealed');
        }
      });
    };

    revealVisibleNow();

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(
        '.reveal-on-scroll, .reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale'
      ).forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      }
    );

    const observeAll = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll, .reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale'
      );
      targets.forEach((el) => observer.observe(el));
    };

    observeAll();
    const t1 = setTimeout(observeAll, 300);
    const t2 = setTimeout(revealVisibleNow, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, [currentView]);

  const handleOpenConsultation = (area?: string) => {
    if (area) setPresetArea(area);
    setIsConsultationOpen(true);
  };

  const handleOpenAdmin = () => {
    const sessionToken = sessionStorage.getItem('aldo_auth_session');
    if (sessionToken) {
      setCurrentView('admin');
    } else {
      setCurrentView('admin-login');
    }
  };

  const handleAuthSuccess = () => {
    setIsAdminAuthOpen(false);
    setCurrentView('admin');
  };

  const handleBackToSite = () => {
    if (window.location.pathname !== '/' || window.location.hash) {
      window.history.pushState(null, '', '/');
    }
    setCurrentView('site');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('aldo_auth_session');
    if (window.location.pathname !== '/' || window.location.hash) {
      window.history.pushState(null, '', '/');
    }
    setCurrentView('site');
  };

  const handleOpenGestaoJuridica = () => {
    window.history.pushState(null, '', '#gestao-juridica');
    setCurrentView('gestao-juridica');
  };

  // View: Login Administrativo Seguro (Gatekeeper de Cibersegurança)
  if (currentView === 'admin-login') {
    return (
      <AdminLoginPage
        onSuccess={handleAuthSuccess}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // View: Editor de Sites & Estatísticas (CMS Live + Canvas)
  if (currentView === 'admin') {
    return (
      <AdminDashboard 
        onBackToSite={handleBackToSite} 
        onLogout={handleLogout}
      />
    );
  }

  // View: Landing Page Exclusiva de Holding Familiar 4.0
  if (currentView === 'holding-landing') {
    return (
      <HoldingLandingPage
        onBackToSite={handleBackToSite}
        onOpenAdmin={handleOpenAdmin}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    );
  }

  // View: Página Completa GESTÃO JURÍDICA 4.0
  if (currentView === 'gestao-juridica') {
    return (
      <GestaoJuridicaPage
        onBackToSite={handleBackToSite}
        onOpenConsultation={() => handleOpenConsultation('Gestão Jurídica 4.0')}
      />
    );
  }

  // View: Página Completa da ACADEMIA LEÃO FERREIRA (Item VIII)
  if (currentView === 'academia') {
    return (
      <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans-body selection:bg-[#D4AF37]/30 selection:text-[#F6E27A]">
        <AcademiaLeaoSection 
          onBackToSite={() => setCurrentView('site')}
          onOpenConsultation={(topic) => handleOpenConsultation(topic || 'Academia Leão Ferreira')}
        />
        <Footer 
          onOpenAdmin={handleOpenAdmin} 
          onOpenTutorial={() => setIsTutorialOpen(true)}
          onOpenLandingPage={() => setCurrentView('holding-landing')}
        />
        <UrgentHotlineFloat onOpenConsultation={() => handleOpenConsultation()} />
      </div>
    );
  }

  // View: Portal Institucional Completo com Ordem Rigorosa dos Itens 3 a 14
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden overflow-x-clip bg-[#050B14] text-slate-100 flex flex-col font-sans-body selection:bg-[#D4AF37]/30 selection:text-[#F6E27A]">
      {/* Top Bar with Navigation & Admin */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAdmin={handleOpenAdmin}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenLandingPage={() => setCurrentView('holding-landing')}
      />

      {/* Main Page Flow adhering to Dr. Aldo Leão specifications */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden overflow-x-clip">
        {/* 1. Página Home: Hero Slider com Slide 1 (Tradição 1908) e Slide 2 (Holding 4.0) */}
        <HeroSlider
          onOpenConsultation={() => handleOpenConsultation()}
          onGoToLandingPage={() => setCurrentView('holding-landing')}
        />

        {/* 2. Página PRESENÇA NACIONAL DIGITAL (Item 4 e Item 30) */}
        <NationalDigitalPresence />

        {/* 3. Página O LEGADO CENTENÁRIO com 40 Anos e Selo (Item 5, 31, 32, 33, 34) */}
        <CentennialLegacy />

        {/* 4. Página HEAD JURÍDICO com Contador 40 Anos no final (Item 6, 21, 35) */}
        <HeadJuridico
          onOpenConsultation={() => handleOpenConsultation()}
          onGoToLandingPage={() => setCurrentView('holding-landing')}
        />

        {/* 5. Página ÁREAS DE ATUAÇÃO (Item 7 e Item 36) */}
        <PracticeAreas
          onGoToLandingPage={() => setCurrentView('holding-landing')}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 6. Página SOLUÇÕES DE EXCELÊNCIA (Item 8, 37 e Item VIII - abre página da Academia Leão Ferreira e Gestão Jurídica 4.0) */}
        <ExcellenceSolutions
          onGoToLandingPage={() => setCurrentView('holding-landing')}
          onOpenConsultation={() => handleOpenConsultation()}
          onGoToAcademia={() => setCurrentView('academia')}
          onGoToGestaoJuridica={handleOpenGestaoJuridica}
        />

        {/* 7. Página AGENDE A SUA CONSULTA DIGITAL (Item 8 e 9 do PDF) */}
        <DigitalConsultationCTA
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 8. Página PLANEJAMENTO PATRIMONIAL 4.0 (HOLDING FAMILIAR) */}
        <HoldingFamiliarSection
          onGoToLandingPage={() => setCurrentView('holding-landing')}
        />

        {/* 9. Página PUBLICAÇÕES JURÍDICAS (Artigos & Notícias Unificados) */}
        <PublicationsSection />

        {/* 10. Página LIVROS DIGITAIS (Item 12 e Item 41) */}
        <DigitalBooksSection
          onOpenConsultation={(area) => handleOpenConsultation(area)}
        />

        {/* 11. Página CONTATO (Item 13 e Item 42) */}
        <LocationSection 
          onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
          onOpenTerms={() => setIsTermsOpen(true)}
        />
      </main>

      {/* 12. Página RODAPÉ (Item 14 e Item 42) */}
      <Footer 
        onOpenAdmin={handleOpenAdmin} 
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenLandingPage={() => setCurrentView('holding-landing')}
        onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenOabDisclaimer={() => setIsOabDisclaimerOpen(true)}
      />

      {/* Modais de Conformidade Legal, LGPD e Ética OAB */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <TermsOfUseModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
      <OabDisclaimerModal
        isOpen={isOabDisclaimerOpen}
        onClose={() => setIsOabDisclaimerOpen(false)}
      />

      {/* Rodapé Fixo Centralizado com Balança Dourada (Item 1, 24, 43) */}
      <UrgentHotlineFloat onOpenConsultation={() => handleOpenConsultation()} />

      {/* Mini Menu Flutuante com Emojis & Hamburguinho (Bottom Right) */}
      <FloatingQuickNav
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAdmin={handleOpenAdmin}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenLandingPage={() => setCurrentView('holding-landing')}
      />

      {/* Modal de Autenticação / Login para Estatísticas e Editor de Sites (Item 2) */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        title="ESTATÍSTICAS · Acesso Restrito"
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
