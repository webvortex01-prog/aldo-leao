import React from 'react';
import { X, ShieldCheck, Scale, FileText, Lock, AlertCircle, Award } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal: Política de Privacidade e Tratamento de Dados (LGPD - Lei Federal nº 13.709/2018)
 */
export const PrivacyPolicyModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#071122] rounded-2xl border border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-10 max-h-[90vh] overflow-y-auto text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Fechar Política de Privacidade"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#D4AF37]/25 pb-5 mb-6 text-left">
          <div className="flex items-center gap-2 text-xs text-[#E5C158] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Conformidade com a Lei Federal nº 13.709/2018 (LGPD)</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">
            POLÍTICA DE PRIVACIDADE & <span className="gold-text-gradient">PROTEÇÃO DE DADOS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-2 font-sans-body">
            Última atualização: Outubro de 2026 · ALDO LEÃO ADVOCACIA ESTRATÉGICA (Fundada em 1908)
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body text-left">
          <section>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] mb-2">
              1. COMPROMISSO INSTITUCIONAL E SIGILO PROFISSIONAL
            </h3>
            <p>
              A <strong>ALDO LEÃO ADVOCACIA ESTRATÉGICA</strong>, sob liderança titular do <strong>Dr. Aldo Leão Ferreira Filho</strong>, 
              trata a privacidade, a confidencialidade e a segurança das informações de seus clientes e consulentes com a máxima rigidez ética 
              e técnica. A atuação do escritório submete-se cumulativamente à <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong>, 
              ao <strong>Estatuto da Advocacia e da OAB (Lei nº 8.906/1994, art. 7º, inciso II)</strong>, ao <strong>Código de Ética e Disciplina da OAB</strong> 
              e ao <strong>Provimento nº 205/2021 do Conselho Federal da OAB</strong>.
            </p>
            <p className="mt-2 text-slate-200">
              Todas as comunicações, dados cadastrais e documentos remetidos ao escritório gozam da garantia constitucional e legal do <strong>Sigilo Profissional da Advocacia</strong>, 
              sendo categoricamente vedada a cessão, compartilhamento, comercialização ou monetização de dados com quaisquer terceiros.
            </p>
          </section>

          <section>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] mb-2">
              2. DADOS COLETADOS E HIPÓTESES LEGAIS DE TRATAMENTO
            </h3>
            <p>
              Em estrita consonância com os princípios da <em>finalidade</em>, <em>adequação</em> e <em>necessidade</em> (art. 6º da LGPD), 
              o escritório coleta exclusivamente os dados indispensáveis para o relacionamento institucional e pré-atendimento jurídico:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-300">
              <li><strong>Dados de identificação e contato:</strong> Nome completo, telefone/WhatsApp, endereço de e-mail e empresa/denominação social.</li>
              <li><strong>Dados temáticos do caso:</strong> Breve descrição do histórico fático ou área de interesse (Planejamento Patrimonial 4.0, Holding Familiar, Direito Imobiliário, Direito Empresarial ou Relações de Consumo).</li>
              <li><strong>Dados de navegação técnica:</strong> Endereço IP, data e hora de acesso, estritamente para segurança da informação e prevenção a ataques cibernéticos (Marco Civil da Internet - Lei nº 12.965/2014).</li>
            </ul>
            <p className="mt-2">
              O tratamento funda-se no <strong>consentimento expresso do titular (art. 7º, I da LGPD)</strong>, na <strong>execução de procedimentos preliminares a contrato a pedido do titular (art. 7º, V)</strong> 
              e no <strong>exercício regular de direitos em processos administrativos ou judiciais (art. 7º, VI)</strong>.
            </p>
          </section>

          <section>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] mb-2">
              3. UTILIZAÇÃO DE COOKIES E TECNOLOGIAS DE SEGURANÇA
            </h3>
            <p>
              O portal utiliza apenas cookies essenciais para estabilidade técnica, autenticação do ambiente de editor restrito, balanceamento de carga e prevenção contra fraude. 
              Não utilizamos cookies intrusivos de rastreamento cross-site para comercialização publicitária comportamental com redes externas.
            </p>
          </section>

          <section>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] mb-2">
              4. DIREITOS DOS TITULARES DE DADOS (ART. 18 DA LGPD)
            </h3>
            <p>
              O usuário pode a qualquer momento exercer seus direitos assegurados pelo art. 18 da Lei nº 13.709/2018, incluindo:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Confirmação da existência de tratamento e acesso aos dados pessoais.</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.</li>
              <li>Revogação do consentimento, ressalvadas as hipóteses de guarda obrigatória por dever legal ou regulatório.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] mb-2">
              5. CANAL DO ENCARREGADO DE PROTEÇÃO DE DADOS (DPO)
            </h3>
            <p>
              Para qualquer solicitação, esclarecimento ou exercício de direitos de privacidade, nosso Encarregado pelo Tratamento de Dados (DPO) 
              está disponível pelo canal oficial de comunicação:
            </p>
            <div className="mt-3 p-3.5 rounded-xl bg-[#0B1A35] border border-[#D4AF37]/30 text-xs">
              <p className="text-white font-semibold">Gabinete de Governança e Privacidade</p>
              <p className="text-[#E5C158] mt-0.5">E-mail: aldoleao.adv@gmail.com</p>
              <p className="text-slate-300 mt-0.5">WhatsApp Institucional: +55 (51) 99808-8998</p>
              <p className="text-slate-400 text-[11px] mt-1">Sede Central: Av. Borges de Medeiros, 2105, 14º andar, Praia de Belas, Porto Alegre/RS.</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="btn-gold-luxury px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
          >
            Compreendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Modal: Termos de Uso e Propriedade Intelectual (Lei nº 9.610/98 e Lei nº 9.279/96)
 */
export const TermsOfUseModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#071122] rounded-2xl border border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-10 max-h-[90vh] overflow-y-auto text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Fechar Termos de Uso"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#D4AF37]/25 pb-5 mb-6 text-left">
          <div className="flex items-center gap-2 text-xs text-[#E5C158] font-bold uppercase tracking-wider mb-2">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <span>Direitos Autorais (Lei 9.610/98) & Propriedade Industrial (Lei 9.279/96)</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">
            TERMOS DE USO & <span className="gold-text-gradient">PROPRIEDADE INTELECTUAL</span>
          </h2>
          <p className="text-xs text-slate-400 mt-2 font-sans-body">
            Acordo Jurídico Vinculante · ALDO LEÃO ADVOCACIA ESTRATÉGICA
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body text-left">
          <section>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] mb-2">
              1. TITULARIDADE EXCLUSIVA DE CONTEÚDO E DIREITOS AUTORAIS
            </h3>
            <p>
              Todo o conjunto deste website — abrangendo sua identidade visual, código-fonte, arquitetura de software, design de interface, 
              marca nominativa e figurativa <strong>"ALDO LEÃO ADVOCACIA ESTRATÉGICA"</strong>, insígnias centenárias, textos doutrinários, 
              artigos jurídicos, compilações jurisprudenciais, e-books, tutoriais e cartilhas de Planejamento Patrimonial 4.0 — constitui 
              <strong>obra intelectual protegida pela Lei de Direitos Autorais (Lei nº 9.610/1998)</strong> e pela <strong>Lei da Propriedade Industrial (Lei nº 9.279/1996)</strong>.
            </p>
            <p className="mt-2 text-slate-200">
              A autoria dos artigos técnicos e obras doutrinárias pertence personalissimamente ao <strong>Dr. Aldo Leão Ferreira Filho</strong>. 
              É terminantemente vedada a reprodução total ou parcial, redistribuição, engenharia reversa, raspagem automatizada de dados (data scraping), 
              alimentação de modelos de inteligência artificial sem autorização expressa, modificação ou aproveitamento comercial não autorizado, sob pena das sanções 
              civis indenizatórias e medidas criminais cabíveis (art. 184 do Código Penal).
            </p>
          </section>

          <section>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] mb-2">
              2. LICENÇAS E ELEMENTOS VISUAIS
            </h3>
            <p>
              As fotografias oficiais do Dr. Aldo Leão são de sua titularidade e consentimento expressos. As ilustrações artísticas, ambientações conceituais 
              de arquitetura e imagens de apoio foram concebidas e licenciadas exclusivamente para uso do escritório sob licença comercial proprietária. 
              Qualquer utilização desautorizada em materiais promocionais ou sites de terceiros configura violação a direitos autorais e direito de imagem (art. 5º, X da CF/88 e art. 20 do Código Civil).
            </p>
          </section>

          <section>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] mb-2">
              3. CARÁTER INFORMATIVO E LIMITAÇÃO DE RESPONSABILIDADE TÉCNICA
            </h3>
            <p>
              As publicações, artigos e notícias disponibilizados neste portal possuem finalidade <strong>estritamente educativa, cultural e informativa</strong>. 
              Eles refletem o estado da arte do Direito e a doutrina especializada no momento de sua elaboração, não constituindo parecer jurídico formal, 
              orientação decisória nem promessa de ganho ou êxito de causa.
            </p>
            <p className="mt-2">
              Casos concretos dependem impreterivelmente de exame documental minucioso, análise de viabilidade jurídica personalizada e formalização de 
              contrato de prestação de serviços advocatícios, nos termos do Código de Ética e Disciplina da OAB.
            </p>
          </section>

          <section>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] mb-2">
              4. FORO DE ELEIÇÃO
            </h3>
            <p>
              Para dirimir quaisquer controvérsias oriundas da utilização deste portal e de seus conteúdos, fica eleito o <strong>Foro Central da Comarca de Porto Alegre/RS</strong>, 
              com expressa renúncia a qualquer outro, por mais privilegiado que seja.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="btn-gold-luxury px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
          >
            Compreendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Modal: Aviso Legal & Ética da Advocacia (Provimento nº 205/2021 do CFOAB)
 */
export const OabDisclaimerModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#071122] rounded-2xl border border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-10 max-h-[90vh] overflow-y-auto text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Fechar Aviso Legal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#D4AF37]/25 pb-5 mb-6 text-left">
          <div className="flex items-center gap-2 text-xs text-[#E5C158] font-bold uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4 text-[#D4AF37]" />
            <span>Código de Ética da Advocacia & Provimento nº 205/2021 CFOAB</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">
            AVISO LEGAL & <span className="gold-text-gradient">COMPLIANCE ÉTICO OAB</span>
          </h2>
          <p className="text-xs text-slate-400 mt-2 font-sans-body">
            Postura Institucional Centenária · Respeito Irrestrito às Normas da OAB
          </p>
        </div>

        {/* Content */}
        <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body text-left">
          <div className="p-4 rounded-xl bg-[#0B1A35]/80 border border-[#D4AF37]/40 flex items-start gap-3">
            <Award className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-200 leading-relaxed">
              A <strong>ALDO LEÃO ADVOCACIA ESTRATÉGICA</strong>, fundada em 1908 e atualmente liderada pelo Dr. Aldo Leão Ferreira Filho (Advogado desde 1986, OAB/RS, membro do IARGS), 
              reafirma que a publicidade veiculada neste portal é de caráter puramente informativo, sóbrio e acadêmico.
            </p>
          </div>

          <section>
            <h3 className="font-cinzel text-sm font-bold text-[#F6E27A] mb-2">
              1. FINALIDADE MERAMENTE INFORMATIVA E EDUCATIVA
            </h3>
            <p>
              Nos termos do <strong>art. 39 do Código de Ética e Disciplina da OAB</strong> e do <strong>Provimento nº 205/2021 do Conselho Federal da OAB</strong>, 
              o presente website destina-se a divulgar a história secular do escritório, as áreas de atuação jurídica especializada e análises dogmáticas 
              sobre legislação e jurisprudência dos Tribunais Superiores.
            </p>
          </section>

          <section>
            <h3 className="font-cinzel text-sm font-bold text-[#F6E27A] mb-2">
              2. VEDAÇÃO À CAPTAÇÃO INDEVIDA E À MERCANTILIZAÇÃO
            </h3>
            <p>
              Não realizamos consultas jurídicas vinculantes de balcão, não praticamos mercantilização da profissão e não veiculamos promessas de resultado. 
              A advocacia é atividade de meio, não de resultado, pautada na aplicação da melhor técnica e da ética profissional.
            </p>
          </section>

          <section>
            <h3 className="font-cinzel text-sm font-bold text-[#F6E27A] mb-2">
              3. ATENDIMENTO NACIONAL DIGITAL COM RIGOROSO SIGILO
            </h3>
            <p>
              O agendamento de consultas jurídicas digitais obedece aos mais altos padrões de segurança cibernética e sigilo profissional 
              (art. 7º, II do Estatuto da OAB).
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="btn-gold-luxury px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
