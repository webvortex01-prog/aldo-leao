import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, FileEdit, Sparkles, LogOut } from 'lucide-react';
import { Logo } from '../Logo';
import { CmsEditor } from './CmsEditor';
import { VisualCanvasEditor } from './VisualCanvasEditor';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onLogout }) => {
  const [editorMode, setEditorMode] = useState<'canvas' | 'form'>('canvas');

  // Modo 1: Editor Visual Estilo Canva (Navegação ao vivo pelo site com clique para editar)
  if (editorMode === 'canvas') {
    return (
      <VisualCanvasEditor
        onSwitchToFormMode={() => setEditorMode('form')}
        onBackToSite={onBackToSite}
        onLogout={onLogout}
      />
    );
  }

  // Modo 2: Editor Estruturado por Abas e Formulários Completos
  return (
    <div className="min-h-screen bg-[#040810] text-slate-100 flex flex-col font-sans-body">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#071122]/95 border-b border-[#D4AF37]/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Logo size="sm" />
            <div className="hidden sm:block border-l border-slate-700 pl-4">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold font-cinzel block">
                Estatísticas & Editor de Sites · Dr. Aldo Leão
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <FileEdit className="w-3 h-3 text-[#D4AF37]" />
                Painel Administrativo, Estatísticas e Edição em Tempo Real
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Botão de Alternar para o Modo Canva */}
            <button
              onClick={() => setEditorMode('canvas')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-[#D4AF37] to-[#F6E27A] hover:brightness-110 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              title="Abrir Editor Visual Interativo Estilo Canva"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modo Visual (Estilo Canva)</span>
            </button>

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

            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 border border-rose-500/40 bg-rose-950/40 hover:bg-rose-900/60 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Encerrar Sessão Segura"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container - Visual Site Editor (CMS Live) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow space-y-6">
        <CmsEditor onSwitchToCanvasMode={() => setEditorMode('canvas')} />
      </main>
    </div>
  );
};
