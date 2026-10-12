import React from 'react';
import { ArrowLeft, ShieldCheck, FileEdit } from 'lucide-react';
import { Logo } from '../Logo';
import { CmsEditor } from './CmsEditor';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  return (
    <div className="min-h-screen bg-[#040810] text-slate-100 flex flex-col font-sans-body">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#071122]/95 border-b border-[#D4AF37]/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Logo size="sm" />
            <div className="hidden sm:block border-l border-slate-700 pl-4">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold font-cinzel block">
                Gabinete Jurídico Dr. Aldo Leão
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <FileEdit className="w-3 h-3 text-[#D4AF37]" />
                Editor de Sites (CMS Live) · Edição em Tempo Real
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sessão Admin Ativa</span>
            </div>

            <button
              onClick={onBackToSite}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 border border-[#D4AF37]/50 bg-[#0A1730] hover:bg-[#0E1F3D] hover:text-[#F6E27A] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              title="Voltar ao portal principal"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container - Visual Site Editor (CMS Live) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow space-y-6">
        <CmsEditor />
      </main>
    </div>
  );
};
