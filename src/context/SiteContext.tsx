import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteConfig,
  ConsultationRequest,
  LeadStatus,
  PracticeArea,
  ExcellenceSolution,
  Publication,
  DigitalBook,
  CaseStudy,
  HoldingLandingConfig
} from '../types';
import realPartnerImg from '../assets/images/aldo_leao_portrait_real_1791572566625.jpg';
import { cleanAndFormatPhone, getCleanWhatsAppDigits } from '../utils/phoneUtils';
import { OFFICIAL_PUBLICATIONS_2024_2025 } from '../data/officialPublications2024_2025';
import { saveSiteConfigToFirebase, subscribeToSiteConfig, saveLeadToFirebase } from '../lib/firebase';

const DEFAULT_PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'holding-40',
    number: '01',
    title: 'Planejamento Patrimonial 4.0',
    subtitle: 'Proteção Patrimonial e Empresarial',
    description: 'Estruturamos soluções jurídicas avançadas e personalizadas para proteger, organizar e perpetuar patrimônios e empresas por meio do ecossistema de Holding Familiar, governança, planejamento sucessório e inteligência jurídica estratégica.',
    badge: '01',
    isHoldingLandingLink: true
  },
  {
    id: 'imobiliario',
    number: '02',
    title: 'Direito Imobiliário',
    subtitle: 'Gestão Jurídica de Ativos Imobiliários',
    description: 'Atuação especializada e estratégica em due diligence, contratos, distratos, investimentos imobiliários, regularização de imóveis, incorporação e proteção patrimonial, proporcionando máxima segurança às operações.',
    badge: '02'
  },
  {
    id: 'empresarial',
    number: '03',
    title: 'Direito Empresarial',
    subtitle: 'Governança Corporativa & Societário',
    description: 'Soluções jurídicas empresariais estratégicas voltadas à governança corporativa, estruturação societária, prevenção de riscos, compliance, conformidade normativa e fortalecimento da segurança jurídica dos negócios.',
    badge: '03'
  },
  {
    id: 'civil',
    number: '04',
    title: 'Direito Civil',
    subtitle: 'Contratos Estratégicos, Família e Sucessões.',
    description: 'Assessoria jurídica e advocacia estratégica em contratos de alta complexidade, distratos, responsabilidade civil, obrigações, Direito de Família e Sucessões, com foco na prevenção, segurança jurídica e perpetuação patrimonial.',
    badge: '04'
  },
  {
    id: 'consumo',
    number: '05',
    title: 'Relações de Consumo',
    subtitle: 'Compliance Consumerista & Mitigação de Passivos',
    description: 'Desenvolvimento de estratégias preventivas em compliance consumerista, mitigação de riscos, prevenção de prejuízos financeiros (multas, indenizações) e adequação rigorosa das relações de consumo para empresas.',
    badge: '05'
  }
];

const DEFAULT_EXCELLENCE_SOLUTIONS: ExcellenceSolution[] = [
  {
    id: 'advocacia-estrategica',
    number: '01',
    title: 'Advocacia Estratégica',
    subtitle: 'EXCELÊNCIA & INTELIGÊNCIA JURÍDICA',
    description: 'Muito mais do que solucionar conflitos, a Advocacia Estratégica antecipa riscos, protege patrimônios, fortalece empresas e transforma decisões jurídicas em vantagem competitiva por meio de soluções inteligentes, preventivas e legais.',
    extendedText: 'Atuação preventiva voltada à proteção patrimonial, segurança jurídica e decisões corporativas estratégicas de alta performance.'
  },
  {
    id: 'planejamento-patrimonial-40',
    number: '02',
    title: 'Planejamento Patrimonial 4.0',
    subtitle: 'HOLDING FAMILIAR',
    description: 'Uma solução jurídica de vanguarda desenvolvida por especialistas para proteger, organizar e perpetuar patrimônios e empresas (holding e subsidiária), evitando a alta perda patrimonial e financeira dos herdeiros no inventário.',
    extendedText: 'Estruturação societária destinada à proteção, organização e perpetuação do patrimônio familiar e das empresas.',
    isLandingLink: true
  },
  {
    id: 'inteligencia-juridica',
    number: '03',
    title: 'Inteligência Jurídica',
    subtitle: 'ESTRATÉGIAS AVANÇADAS COM A INTELIGÊNCIA DE ESPECIALISTAS',
    description: 'A Inteligência Jurídica utiliza análise estratégica, planejamento e visão preventiva para reduzir riscos, perdas patrimoniais e financeiras, ampliando a segurança das decisões patrimoniais e empresariais.',
    extendedText: 'Estratégias jurídicas voltadas à prevenção de imprevistos e mitigação de vulnerabilidades com apoio integral a conselhos e famílias empresárias.'
  },
  {
    id: 'auditoria-juridica',
    number: '04',
    title: 'Auditoria Jurídica',
    subtitle: 'Diagnóstico & Identificação de Vulnerabilidades',
    description: 'Toda estrutura patrimonial ou empresarial possui vulnerabilidades que nem sempre são percebidas. A Auditoria Jurídica identifica esses riscos antes que eles produzam consequências danosas.',
    extendedText: 'Mapeamento preventivo de passivos ocultos, contingências fiscais, contratuais e societárias com plano de saneamento imediato.'
  },
  {
    id: 'arbitragem',
    number: '05',
    title: 'Arbitragem',
    subtitle: 'RESOLUÇÃO EXTRAJUDICIAL DE CONFLITOS',
    description: 'Método privado de solução de conflitos que proporciona maior agilidade, confidencialidade e segurança jurídica com parecer de especialistas, reduzindo os impactos danosos e a morosidade do Judiciário.',
    extendedText: 'Atuação em câmaras arbitrais de prestígio para disputas societárias, contratuais e patrimoniais de alta envergadura.'
  },
  {
    id: 'gestao-imobiliaria',
    number: '06',
    title: 'Gestão Jurídica Imobiliária',
    subtitle: 'MITIGAÇÃO DE RISCOS E VALORIZAÇÃO DE ATIVOS',
    description: 'Estruturação jurídica de ativos imobiliários para compradores e vendedores imobiliários, investidores, construtoras e incorporadoras com foco na prevenção de riscos e prejuízos.',
    extendedText: 'Atuação estratégica em due diligence aquisitiva, regularização fundiária, loteamentos e operações imobiliárias estruturadas.'
  },
  {
    id: 'gestao-empresarial',
    number: '07',
    title: 'Gestão Jurídica Empresarial',
    subtitle: 'SUPORTE JURÍDICO PARA MAXIMIZAÇÃO DE RESULTADOS, COM SEGURANÇA',
    description: 'Estruturação jurídica de empresas e processos, governança corporativa, conformidade normativa, sucessão empresarial e suporte jurídico especializado à tomada de decisão executiva.',
    extendedText: 'Soluções desenvolvidas para fortalecer negócios, mitigar passivos trabalhistas e tributários e impulsionar a longevidade corporativa.'
  },
  {
    id: 'gestao-juridica-40',
    number: '08',
    title: 'Gestão Jurídica 4.0',
    subtitle: 'Organizacional & Judicial',
    description: 'Integração entre tecnologia, inteligência jurídica, gestão estratégica e inovação aplicada à advocacia de vanguarda.',
    extendedText: 'Diagnóstico Situacional Estratégico com auditoria de informações, mapeamento de vulnerabilidades e condução judicial combativa.'
  },
  {
    id: 'gestao-projetos',
    number: '09',
    title: 'Gestão Estratégica de Projetos',
    subtitle: 'SUPORTE AVANÇADO PARA PROJETOS EXITOSOS',
    description: 'Planejamento, organização, conformidade normativa e acompanhamento jurídico rigoroso de projetos patrimoniais, societários e de expansão empresarial durante todas as etapas de implantação.',
    extendedText: 'Estruturação jurídica de novos projetos, compliance preventivo e validação de contratos e marcos regulatórios.'
  },
  {
    id: 'gestao-documental',
    number: '10',
    title: 'Gestão Jurídica Documental',
    subtitle: 'SEGURANÇA JURÍDICA QUE EVITA PREJUÍZOS E DANOS',
    description: 'Gestão Jurídica de documentos, organização, elaboração, análise, alteração, padronização e administração jurídica estratégica documental.',
    extendedText: 'Padronização de minutas, contratos, acórdãos e governança eletrônica de arquivos estratégicos com rigor e segurança jurídica.'
  },
  {
    id: 'gestao-negocios',
    number: '11',
    title: 'Gestão Estratégica de Negócios',
    subtitle: 'ASSESSORIA QUE FACILITA DECISÕES COM REDUÇÃO DOS RISCOS',
    description: 'Suporte jurídico especializado para decisões empresariais, patrimoniais, sucessórias corporativas, investimentos, expansão de negócios, financiamentos, planejamento, reorganização e proteção de ativos, estruturação jurídica de negócios.',
    extendedText: 'Apoio em modelagens contratuais, parcerias societárias e operações de crescimento de patrimônios e corporações.'
  },
  {
    id: 'gestao-administrativa',
    number: '12',
    title: 'Gestão Jurídica Administrativa',
    subtitle: 'Eficiência Operacional & Compliance',
    description: 'Consultoria jurídica estratégica de processos administrativos voltada à organização, conformidade legal, redução de despesas e segurança operacional.',
    extendedText: 'Aperfeiçoamento dos fluxos administrativos, compliance regulatório e blindagem contra inconformidades institucionais.'
  },
  {
    id: 'consulta-digital',
    number: '13',
    title: 'Consulta Digital Brasil',
    subtitle: 'ATENDIMENTO DIGITAL COM A EXCELÊNCIA DO PRESENCIAL',
    description: 'Atendimento jurídico especializado 100% digital, em todo o Brasil, com a mesma excelência centenária do atendimento presencial, com máxima confidencialidade e conforto.',
    extendedText: 'Agendamento prévio com hora marcada e atendimento via videoconferência segura diretamente com Dr. Aldo Leão.'
  },
  {
    id: 'academia-leao-ferreira',
    number: '14',
    title: 'Academia Leão Ferreira',
    subtitle: 'CENTRO DE ESTUDOS SUPERIORES COM "EXPERTISE" CENTENÁRIA',
    description: 'Centro de produção e difusão do conhecimento jurídico especializado de vanguarda, que reúne palestras de especialistas, a publicação de artigos e livros jurídicos digitais com o propósito de compartilhar a cultura e o conhecimento jurídico.',
    extendedText: 'Produção bibliográfica de vanguarda, livros jurídicos digitais gratuitos e palestras de alta relevância com Dr. Aldo Leão.'
  }
];

const DEFAULT_PUBLICATIONS: Publication[] = OFFICIAL_PUBLICATIONS_2024_2025;

const DEFAULT_DIGITAL_BOOKS: DigitalBook[] = [
  {
    id: 'livro-planejamento-patrimonial-4-0',
    title: 'Planejamento Patrimonial 4.0 & o Alto Custo da Omissão',
    author: 'Dr. Aldo Leão',
    area: 'Planejamento Patrimonial & Sucessório',
    description: 'Guia definitivo e prático sobre como constituir a Holding Familiar em vida, eliminar o inventário judicial e evitar a perda de até 40% do patrimônio com ITCMD progressivo, honorários e litígios entre herdeiros.',
    pages: '168 páginas',
    year: '2026',
    publicationMonth: 12,
    publicationOrder: 1,
    isbn: '978-65-89412-01-4',
    format: 'Livro Digital (PDF)',
    downloadAvailable: true,
    downloadCount: '3.420 downloads',
    badge: 'Mais Recente',
    coverImage: '/img/livros/livro-planejamento-patrimonial-4-0.jpeg',
    chapters: [
      'Capítulo 1: O Custo Oculto da Morte e a Guilhotina Tributária do Inventário',
      'Capítulo 2: A Arquitetura da Holding Familiar: Célula Cofre, Operacional e Veículo',
      'Capítulo 3: Doação de Quotas com Reserva de Usufruto e Cláusulas Restritivas',
      'Capítulo 4: Cláusula de Reversão, Impenhorabilidade, Incomunicabilidade e Inalienabilidade',
      'Capítulo 5: Golden Share e Acordo de Sócios: Mantendo o Poder Político em Vida',
      'Capítulo 6: O Cronograma em 4 Etapas: Diagnóstico, Modelagem, Registro e Governança'
    ],
    sampleExcerpt: 'Deixar para resolver a sucessão após a morte não é um ato de prudência, mas de transferência cruel de conflitos e custas escorchantes aos seus filhos. O inventário consome em média de 20% a 40% de todo o patrimônio acumulado por uma vida de trabalho...'
  },
  {
    id: 'livro-voce-tem-patrimonio',
    title: 'Você Tem Patrimônio e Deseja Protegê-lo Juridicamente?',
    author: 'Dr. Aldo Leão',
    area: 'Proteção e Blindagem Patrimonial Ética',
    description: 'Manual de estratégias jurídicas preventivas para empresários, produtores rurais, médicos e investidores de alto patrimônio. Como blindar bens de forma lícita antes do surgimento de crises ou passivos.',
    pages: '132 páginas',
    year: '2024',
    publicationMonth: 10,
    publicationOrder: 2,
    isbn: '978-65-89412-03-8',
    format: 'Livro Digital (PDF)',
    downloadAvailable: true,
    downloadCount: '2.140 downloads',
    badge: 'Disponível para Download',
    coverImage: '/img/livros/livro-voce-tem-patrimonio.jpeg',
    chapters: [
      'Capítulo 1: A Linha Divisória entre Planejamento Lícito e Fraude à Execução',
      'Capítulo 2: Desconsideração da Personalidade Jurídica: Aplicação do art. 50 do Código Civil',
      'Capítulo 3: Proteção de Ativos do Agronegócio e Maquinários Produtivos',
      'Capítulo 4: Riscos Médicos e Profissionais: Responsabilidade Civil Individual e Patrimônio Familiar',
      'Capítulo 5: Segregação Patrimonial Estratégica e Blindagem Internacional Lícita'
    ],
    sampleExcerpt: 'Proteger o patrimônio não é ocultar bens; é estruturá-los legalmente antes que qualquer risco iminente se materialize. O empresário de sucesso não espera a crise chegar para pensar na segurança de sua família...'
  },
  {
    id: 'livro-mercado-de-carbono',
    title: 'Mercado de Carbono: Construindo um Futuro Sustentável',
    author: 'Dr. Aldo Leão',
    area: 'Direito Ambiental e Sustentabilidade Corporativa',
    description: 'Guia jurídico especializado sobre créditos de carbono, certificações internacionais, governança ESG e monetização sustentável para produtores rurais e empresas.',
    pages: '140 páginas',
    year: '2024',
    publicationMonth: 6,
    publicationOrder: 3,
    isbn: '978-65-89412-07-6',
    format: 'Livro Digital (PDF)',
    downloadAvailable: true,
    downloadCount: '1.870 downloads',
    badge: 'Disponível para Download',
    coverImage: '/img/livros/livro-mercado-de-carbono.jpeg',
    chapters: [
      'Capítulo 1: Marcos Regulatórios do Mercado Regulado e Voluntário de Carbono no Brasil',
      'Capítulo 2: Titularidade dos Créditos em Terras Produtivas e de Preservação',
      'Capítulo 3: Estruturação Contratual de Projetos de Redução de Emissões (REDD+)',
      'Capítulo 4: Tributação e Tratamento Contábil de Ativos Ambientais',
      'Capítulo 5: Integração ESG e a Valorização Patrimonial Sustentável'
    ],
    sampleExcerpt: 'A descarbonização da economia não é apenas um compromisso ecológico, mas uma das maiores avenidas de valorização patrimonial e segurança regulatória da década...'
  },
  {
    id: 'livro-sindico-prospero',
    title: 'Síndico Próspero: Administrando o Condomínio com Alta Performance',
    author: 'Dr. Aldo Leão',
    area: 'Direito Condominial & Governança',
    description: 'Manual de governança jurídica condominial, mitigação de passivos trabalhistas, cobrança ágil de inadimplência e segurança decisória para síndicos e administradoras.',
    pages: '198 páginas',
    year: '2023',
    publicationMonth: 11,
    publicationOrder: 4,
    isbn: '978-65-89412-05-2',
    format: 'Livro Digital (PDF)',
    downloadAvailable: true,
    downloadCount: '1.980 downloads',
    badge: 'Disponível para Download',
    coverImage: '/img/livros/livro-sindico-prospero.jpeg',
    chapters: [
      'Capítulo 1: Responsabilidade Civil e Criminal do Síndico na Gestão do Condomínio',
      'Capítulo 2: Assembleias Gerais Inatacáveis: Edital, Quórum e Impugnações',
      'Capítulo 3: Cobrança Extrajudicial e Execução Rápida de Despesas Condominiais',
      'Capítulo 4: Terceirização de Serviços e o Risco de Responsabilidade Subsidiária',
      'Capítulo 5: Obras Estruturais, Contratos de Manutenção e Prestação de Contas'
    ],
    sampleExcerpt: 'A administração de condomínios modernos se assemelha à gestão de médias empresas. A falta de amparo jurídico transforma a nobre função do síndico em um polo passivo de litígios e cobranças indenizatórias...'
  },
  {
    id: 'livro-holding-familiar-e-imobiliaria',
    title: 'Holding Familiar e Imobiliária',
    author: 'Dr. Aldo Leão',
    area: 'Direito Societário e Imobiliário',
    description: 'A modelagem jurídica completa para integralização de bens imóveis no capital social de pessoa jurídica, segregação patrimonial de riscos de locação e economia tributária de até 60% na tributação de aluguéis e vendas.',
    pages: '144 páginas',
    year: '2023',
    publicationMonth: 4,
    publicationOrder: 5,
    isbn: '978-65-89412-02-1',
    format: 'Livro Digital (PDF)',
    downloadAvailable: true,
    downloadCount: '2.890 downloads',
    badge: 'Disponível para Download',
    coverImage: '/img/livros/livro-holding-familiar-e-imobiliaria.jpeg',
    chapters: [
      'Capítulo 1: A Tributação de Imóveis: Pessoa Física (27,5%) vs. Holding Imobiliária (11,33% a 14,53%)',
      'Capítulo 2: Integralização de Imóveis a Valor Histórico do IRPF sem Ganho de Capital',
      'Capítulo 3: Imunidade de ITBI: Estratégias Jurisprudenciais Pós-Tema 796 do STF',
      'Capítulo 4: Blindagem Operacional: Célula de Locação vs. Célula de Propriedade',
      'Capítulo 5: Venda de Imóveis por Empresa Patrimonial e o Lucro Presumido'
    ],
    sampleExcerpt: 'A exploração de imóveis para locação na pessoa física chega à alíquota esmagadora de 27,5% no IRPF, além da exposição direta a ações cíveis e trabalhistas. A Holding Imobiliária profissionaliza a gestão e reduz legalmente a carga para cerca de 11,33%...'
  },
  {
    id: 'livro-sete-cuidados-compra-imovel',
    title: 'Sete Cuidados na Compra do Imóvel',
    author: 'Dr. Aldo Leão',
    area: 'Direito Imobiliário & Due Diligence',
    description: 'Checklist prático e indispensável para Due Diligence imobiliária de alta precisão. Como blindar compradores e investidores contra penhoras ocultas, ações de fraude contra credores e nulidades registrais.',
    pages: '116 páginas',
    year: '2022',
    publicationMonth: 9,
    publicationOrder: 6,
    isbn: '978-65-89412-04-5',
    format: 'Livro Digital (PDF)',
    downloadAvailable: true,
    downloadCount: '3.110 downloads',
    badge: 'Disponível para Download',
    coverImage: '/img/livros/livro-sete-cuidados-compra-imovel.jpeg',
    chapters: [
      'Capítulo 1: A Matrícula Atualizada e o Histórico Vintenário do Imóvel',
      'Capítulo 2: Certidões de Feitos Ajuizados de Alienantes Anteriores',
      'Capítulo 3: Passivos Fiscais e Trabalhistas Não Averbados',
      'Capítulo 4: Imóveis em Condomínio: Dívidas Propter Rem e Quitação Real',
      'Capítulo 5: Regularidade Urbanística, Ambiental e Habite-se',
      'Capítulo 6: O Perigo da Fraude Contra Credores e o Enunciado 375 do STJ',
      'Capítulo 7: Redação Contratual Protetiva e Registro Imediato da Escritura'
    ],
    sampleExcerpt: 'A certidão negativa do Registro de Imóveis é apenas o primeiro passo. Mais de 38% dos compradores desavisados enfrentam constrições judiciais por passivos do antigo proprietário que poderiam ter sido evitados com uma auditoria jurídica prévia...'
  },
  {
    id: 'livro-lgpd-primeira-condenacao',
    title: 'LGPD: A Primeira Condenação no Brasil por Compartilhamento Ilegal de Dados',
    author: 'Dr. Aldo Leão',
    area: 'Proteção de Dados & Compliance Digital',
    description: 'Análise dogmática e processual detalhada da primeira decisão condenatória sob a Lei Geral de Proteção de Dados (Lei 13.709/2018), com manual de adequação corporativa.',
    pages: '154 páginas',
    year: '2021',
    publicationMonth: 8,
    publicationOrder: 7,
    isbn: '978-65-89412-06-9',
    format: 'Livro Digital (PDF)',
    downloadAvailable: true,
    downloadCount: '2.450 downloads',
    badge: 'Disponível para Download',
    coverImage: '/img/livros/livro-lgpd-primeira-condenacao.jpeg',
    chapters: [
      'Capítulo 1: O Caso Paradigmático e os Fundamentos da Decisão Condenatória',
      'Capítulo 2: O Compartilhamento Não Autorizado com Parceiros Comerciais e o Dano Moral',
      'Capítulo 3: O Dano Moral In Re Ipsa na Violação de Dados Pessoais',
      'Capítulo 4: Políticas de Privacidade, Termos de Consentimento e Legítimo Interesse',
      'Capítulo 5: O Plano de Resposta a Incidentes e Relatório de Impacto (RIPD)'
    ],
    sampleExcerpt: 'A primeira condenação judicial por violação à LGPD no Brasil marcou o encerramento da fase de complacência no tratamento de dados. Empresas que não estruturam sua governança digital respondem objetivamente por vazamentos...'
  },
  {
    id: 'livro-dividas-bancarias-covid',
    title: 'Como resolver as dívidas bancárias em tempos de Covid-19?',
    author: 'Dr. Aldo Leão',
    area: 'Direito Bancário e Recuperação Financeira',
    description: 'Estratégias jurídicas avançadas para renegociação, revisão de contratos bancários, suspensão de execuções e preservação da saúde financeira empresarial e familiar.',
    pages: '128 páginas',
    year: '2020',
    publicationMonth: 5,
    publicationOrder: 8,
    isbn: '978-65-89412-08-3',
    format: 'Livro Digital (PDF)',
    downloadAvailable: true,
    downloadCount: '3.120 downloads',
    badge: 'Disponível para Download',
    coverImage: '/img/livros/livro-dividas-bancarias-covid.jpeg',
    chapters: [
      'Capítulo 1: O Cenário Extraordinário e a Teoria da Imprevisão nos Contratos Bancários',
      'Capítulo 2: Juros Abusivos e Tarifas Ilegais: Como Identificar e Reaver Valores',
      'Capítulo 3: Suspensão de Ações de Busca e Apreensão e Execuções Fiscais/Bancárias',
      'Capítulo 4: Negociação Direta com Instituições Financeiras e Termos de Acordo Seguros',
      'Capítulo 5: Blindagem do Capital de Giro e Proteção dos Ativos Familiares do Fiador'
    ],
    sampleExcerpt: 'A reestruturação do passivo bancário exige postura técnica, base em jurisprudência consolidada dos Tribunais Superiores e ação preventiva antes da consolidação de penhoras...'
  }
];

const DEFAULT_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    value: 'R$ 164.000',
    category: 'patrimonial',
    title: 'Economia Tributária Direta em Estruturação de Holding Familiar 4.0',
    tribunal: 'Planejamento em Vida',
    challenge: 'Família empresária com patrimônio imobiliário de R$ 1.5M enfrentaria R$ 297 mil em custas, impostos e honorários de inventário.',
    solution: 'Modelagem de Holding Familiar com integralização e doação com reserva de usufruto e regras de governança.',
    result: 'Redução de 55,21% dos custos sucessórios, preservando R$ 164.000,00 e garantindo a harmonia familiar.'
  },
  {
    id: 'case-2',
    value: 'R$ 420.000.000',
    category: 'tributario',
    title: 'Anulação de Auto de Infração Fiscal e Exclusão de Multas Qualificadas',
    tribunal: 'CARF · Conselho Administrativo de Recursos Fiscais',
    challenge: 'Empresa do agronegócio autuada por suposto ganho de capital em reorganização societária.',
    solution: 'Demonstração contábil-jurídica de propósito negocial legítimo e descaracterização de simulação.',
    result: 'Vitória unânime com cancelamento integral do débito de R$ 420 milhões.'
  },
  {
    id: 'case-3',
    value: 'R$ 850.000.000',
    category: 'patrimonial',
    title: 'Reorganização Sucessória e Governança de Grupo Agroindustrial Familiar',
    tribunal: 'Estruturação Preventiva Extrajudicial',
    challenge: 'Disputa potencial entre herdeiros da 2ª e 3ª gerações sobre gestão de terras produtivas e ativos logísticos.',
    solution: 'Elaboração de Acordo de Sócios, Conselho de Família e Holding Patrimonial com Golden Share.',
    result: 'Perpetuação dos negócios sem paralisação operacional e preservação de 100% dos ativos familiares.'
  },
  {
    id: 'case-4',
    value: 'Trancamento de Ação',
    category: 'penal',
    title: 'Trancamento de Inquérito Policial por Inexistência de Justa Causa',
    tribunal: 'STJ · Superior Tribunal de Justiça (Brasília)',
    challenge: 'Executivos de companhia de infraestrutura indiciados sob alegação indevida de crimes tributários.',
    solution: 'Habeas Corpus originário comprovando a ausência de dolo e a atipicidade da conduta empresarial.',
    result: 'Concessão da ordem pelo STJ, com encerramento das investigações e salvaguarda da honra dos dirigentes.'
  },
  {
    id: 'case-5',
    value: 'R$ 115.000.000',
    category: 'societario',
    title: 'Defesa e Repactuação em Dissolução Parcial de Sociedade Limitada',
    tribunal: 'Câmara de Arbitragem Empresarial',
    challenge: 'Exclusão litigiosa de sócio minoritário com pedido de apuração de haveres por fluxo de caixa descontado.',
    solution: 'Condução estratégica arbitral demonstrando critérios contratuais de liquidação pelo valor patrimonial contábil.',
    result: 'Acordo confidencial homologado com economia de R$ 68M para os fundadores remanescentes.'
  }
];

export const DEFAULT_HOLDING_LANDING: HoldingLandingConfig = {
  heroEyebrow: 'HOLDING FAMILIAR',
  heroTitle: 'PLANEJAMENTO',
  heroSubtitle: 'O INVENTÁRIO ACARRETA ALTA PERDA PATRIMONIAL E FINANCEIRA AOS HERDEIROS',
  heroParagraph1: 'Muitas famílias somente descobrem a elevada perda patrimonial e o alto custo do processo de inventário quando já é tarde.',
  heroParagraph2: 'Além dos tributos, honorários, despesas cartorárias, registros imobiliários e demais custos sucessórios, o inventário frequentemente fomenta conflitos familiares, disputas pelo patrimônio e divergências entre os herdeiros.',
  heroParagraph3: 'A prática forense demonstra que, em muitos inventários, a necessidade de liquidez imediata leva os herdeiros à venda acelerada de bens, com deságio médio de 20% em relação ao respectivo valor de mercado, o que só faz aumentar a alta perda dos herdeiros.',
  heroParagraph4: 'Além disso, o ITCMD – Imposto de Transmissão Causa Mortis e Doação terá a sua alíquota máxima de 8%, majorada para 18% (Projeto de Resolução do Senado Federal N. 57/19) ou 20% (CONFAZ) ou 30% (Governo Federal) onerando ainda mais o inventário para os herdeiros.',
  heroParagraph5: 'O resultado prático é a elevada perda patrimonial e financeira dos herdeiros, causada pelo inventário, justamente no momento mais delicado para a família, quando ela mais necessita de tranquilidade, segurança jurídica, estabilidade, paz e organização.',
  heroBtnViabilidade: 'AGENDAR SESSÃO DE VIABILIDADE',
  heroBtnCustos: 'CUSTOS: INVENTÁRIO X PLANEJAMENTO 4.0',
  showcaseTitle: 'Estruturação e Proteção do Patrimônio Familiar',
  showcaseText: 'Blindagem preventiva de ativos, governança societária e planejamento sucessório em vida, garantindo a perpetuação do legado e evitando a perda de até 40% do patrimônio no inventário.',
  showcaseBadge: 'Patrimônio, Empresas & Família',
  problemsTitle: 'ALGUNS PROBLEMAS DO INVENTÁRIO',
  problemsSubtitle: 'DIAGNÓSTICO PREVENTIVO',
  problemsList: [
    'Morosidade judicial do processo',
    'Alta perda patrimonial e financeira dos herdeiros',
    'Elevado custo do processo',
    'Venda rápida de bens, com deságio médio 20% para quitar o inventário',
    'Conflitos entre os herdeiros e familiares',
    'Aumento iminente do ITCMD de 8% para até 30%',
    'Indisponibilidade de bens até a partilha no final do inventário'
  ],
  strategyKicker: 'ARQUITETURA JURÍDICA ESTRATÉGICA',
  strategyTitle: 'O PLANEJAMENTO PATRIMONIAL 4.0 EVITA O INVENTÁRIO E PERPETUA O SEU LEGADO',
  strategyParagraph1: 'O Planejamento Patrimonial 4.0 via Holding Familiar consiste na engenharia jurídica societária (empresas) e patrimonial avançada e legal, voltada à estruturação, organização e proteção, realizada em vida e extrajudicialmente, que proporciona a perpetuação do seu legado, através do planejamento estratégico, que evita o inventário e seus prejuízos aos herdeiros.',
  strategyParagraph2: 'A Holding Familiar possibilita centralizar e profissionalizar a gestão dos bens e empresas; planejar e executar a sucessão empresarial; reduzir os tributos; proteger o patrimônio e as empresas; planejar em vida, a perpetuação do seu legado, para as futuras gerações.',
  strategyParagraph3: 'Cada estrutura societária e patrimonial é minuciosamente planejada e executada de forma personalizada, conforme os objetivos, as necessidades e as situações existentes (família, patrimônio, empresas, ativos, passivos e etc.).',
  advantagesTitle: 'VANTAGENS EXCLUSIVAS DO PLANEJAMENTO 4.0 (HOLDING FAMILIAR)',
  advantagesList: [
    'Proteção jurídica patrimonial e empresarial',
    'Planejamento sucessório empresarial',
    'Planejamento patrimonial e empresarial',
    'Expressiva economia tributária',
    'Evita os problemas do inventário',
    'Governança profissional',
    'Otimização da gestão',
    'Facilita a internacionalização patrimonial',
    'Conformidade legal',
    'Segurança jurídica',
    'Gestão estratégica de ativos',
    'Estruturação e captação de investimentos',
    'Harmonia e paz familiar',
    'Otimização de investimento (taxas maiores)',
    'Pleno controle do doador (pais) das cotas sociais aos filhos',
    'Cláusulas protetivas na doação das cotas aos filhos',
    'Acordo de sócios',
    'Captação de recursos para a empresa com investidores'
  ],
  tableKicker: 'ESTUDO COMPARATIVO',
  tableTitle: 'CUSTOS: INVENTÁRIO X HOLDING FAMILIAR',
  tableSubtitle: 'A título de exemplo, consideramos um patrimônio adquirido por R$ 1.000.000,00, com valor de mercado atual de R$ 1.500.000,00, tem um ganho de capital de R$ 500.000,00.',
  itcmdInventario: 'R$ 75.000,00 (5%)',
  itcmdHolding: 'R$ 60.000,00 (4%)',
  honorariosInventario: 'R$ 120.000,00 (8%)',
  honorariosHolding: 'R$ 70.000,00',
  custasInventario: 'R$ 12.000,00',
  custasHolding: 'R$ 0,00',
  certidoesInventario: 'R$ 3.000,00',
  certidoesHolding: 'R$ 0,00',
  ganhoCapitalInventario: 'R$ 75.000,00',
  ganhoCapitalHolding: 'R$ 0,00',
  registroInventario: 'R$ 12.000,00',
  registroHolding: 'R$ 3.000,00',
  totalInventario: 'R$ 297.000,00',
  totalHolding: 'R$ 133.000,00',
  economiaValor: 'R$ 164.000,00',
  economiaPercentual: '55,21%',
  ctaBoxTitle: 'FAÇA O SEU PLANEJAMENTO 4.0',
  ctaBoxText: 'Agende, hoje mesmo, o seu Diagnóstico de Viabilidade e saiba porque o PLANEJAMENTO PATRIMONIAL 4.0 VIA HOLDING FAMILIAR é a sua melhor opção para perpetuar o seu legado.',
  ctaBoxBtnViabilidade: 'AGENDAR DIAGNÓSTICO DE VIABILIDADE',
  ctaBoxBtnWhatsApp: 'AGENDAR PELO WHATSAPP',
  targetTitle: 'PARA QUEM É A HOLDING FAMILIAR?',
  targetSubtitle: 'PERFIL E ABRANGÊNCIA',
  targetIntro: 'O PLANEJAMENTO PATRIMONIAL 4.0 foi desenvolvido para quem já tem ou pretende adquirir patrimônio, já tem ou pretende ter filhos e para:',
  targetList: [
    'Empresários',
    'Proprietários de bens (ativos)',
    'Pais',
    'Famílias empresárias',
    'Investidores imobiliários',
    'Autônomos',
    'Profissionais de atividades de risco',
    'Agronegócio (Produtores Rurais)'
  ],
  drAldoKicker: 'ADVOCACIA ESTRATÉGICA DESDE 1986',
  drAldoTitle: 'Dr. ALDO LEÃO',
  drAldoPhotoUrl: '/img/palestra-1.jpg',
  drAldoCaption: 'Conferência e Liderança em Planejamento Patrimonial 4.0',
  drAldoBio1: 'Desde 1986, o Dr. Aldo Leão conduz a terceira geração do legado jurídico familiar iniciado em 1908 pelo Prof. Dr. Arnaldo da Silva Ferreira.',
  drAldoBio2: 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA representa a convergência entre a tradição jurídica centenária de três gerações e a inovação tecnológica da advocacia estratégica.',
  drAldoBio3: 'Com uma trajetória de mais de 40 anos de Excelência Jurídica, unimos o rigor técnico do Direito à inteligência jurídica na gestão patrimonial e empresarial para a perpetuação do seu legado.',
  drAldoBio4: 'O Dr. Aldo Leão possui extensa produção jurídica, com mais de uma centena de Artigos Jurídicos e Livros Digitais publicados, com uma reconhecida trajetória profissional, liderança jurídica e docência superior, que lhe rendeu convites para realização de palestras sobre temas jurídicos importantes.',
  faqKicker: 'DÚVIDAS',
  faqTitle: 'PERGUNTAS FREQUENTES',
  faqs: [
    {
      q: 'Como ocorre o atendimento da ALDO LEÃO ADVOCACIA ESTRATÉGICA?',
      a: 'Rompendo as fronteiras geográficas de um país continental, para levar a Excelência Jurídica Centenária a clientes de todo o território nacional, desde 2020 o nosso atendimento é realizado 100% digital, para clientes de todo o território nacional, com a mesma excelência jurídica, confidencialidade e segurança do atendimento presencial.'
    },
    {
      q: 'O que é a Holding Familiar (Planejamento Patrimonial 4.0)?',
      a: 'É uma estrutura societária e patrimonial especializada, avançada e inteligente utilizada para proteger juridicamente, organizar e bem administrar o patrimônio e o negócio familiar, planejando em vida para evitar a alta perda patrimonial e financeira dos herdeiros no inventário (em média 40%).'
    },
    {
      q: 'Quem pode fazer o Planejamento Patrimonial 4.0?',
      a: 'Em tese, qualquer pessoa física ou jurídica, que possui ou pretende adquirir patrimônio, já tem ou pretende ter filhos, já tem ou pretende casar ou ter uma união estável, Startups e etc., dependendo do resultado do Diagnóstico de Viabilidade.'
    },
    {
      q: 'A Holding Familiar (Planejamento Patrimonial 4.0) elimina o inventário?',
      a: 'Sim, a estruturação do ecossistema societário e patrimonial da Holding Familiar, feita por advogados especialistas, evita a alta perda patrimonial e financeira dos herdeiros no inventário (em média 40% do patrimônio).'
    },
    {
      q: 'O Planejamento Patrimonial 4.0 é exclusividade dos ricos?',
      a: 'Não. Qualquer pessoa que possua ou pretenda adquirir patrimônio e ter herdeiros, deve realizar, hoje e em vida, o seu Planejamento Patrimonial 4.0, dadas as vantagens exclusivas desta modelagem societária e patrimonial avançada e inteligente, que evita o aumento do ITCMD de 8% para 16% (Projeto de Resolução do Senado Federal N. 57/19), 20% (CONFAZ) ou 30% (Governo Federal). Cada projeto é desenvolvido de forma personalizada, considerando as características e os objetivos específicos de cada cliente e família.'
    },
    {
      q: 'Como saber se o Planejamento Patrimonial 4.0 é indicado para mim?',
      a: 'Agendando, agora mesmo, o seu Diagnóstico de Viabilidade com um especialista da ALDO LEÃO ADVOCACIA ESTRATÉGICA para evitar o aumento da carga tributária provocado pela reforma.'
    },
    {
      q: 'Há algum suporte após a entrega do ecossistema Holding Familiar?',
      a: 'Sim. O Escritório disponibiliza a contratação do serviço de Suporte Jurídico e Administrativo Profissional para assegurar a tranquilidade e a perpetuação do legado familiar.'
    },
    {
      q: 'Como ocorre o Planejamento Patrimonial 4.0 via Holding Familiar?',
      a: 'O planejamento, a estruturação e a implantação do ecossistema Holding Familiar é feito em três fases obrigatórias e sequenciais:\n\n1. DIAGNÓSTICO DE VIABILIDADE: Coleta de informações e documentos com análise completa e confidencial da situação familiar, patrimonial, jurídica, financeira e empresarial. É o ponto de partida do Planejamento Patrimonial 4.0.\n\n2. MODELAGENS ESTRUTURAIS: A seguir, são apresentadas as três melhores opções estruturais do sistema Holding Familiar, para a escolha pelo cliente (família) da modelagem que melhor atende as suas necessidades e objetivos.\n\n3. IMPLANTAÇÃO DA MODELAGEM: É a última fase do Planejamento Patrimonial 4.0, que culmina com a entrega do ecossistema societário e patrimonial (Holding Familiar).\n\nSUPORTE JURÍDICO-ADMINISTRATIVO: Opcionalmente, após a entrega do sistema Holding Familiar, disponibilizamos a contratação da solução de excelência relativa ao suporte jurídico-administrativo.'
    }
  ],
  doubtTitle: 'ALGUMA DÚVIDA?',
  doubtText: 'Se tiver dúvida, entre em contato com um especialista da ALDO LEÃO ADVOCACIA ESTRATÉGICA.',
  doubtBtnText: 'FALAR COM O ESPECIALISTA',
  footerCopyright: '© ALDO LEÃO ADVOCACIA ESTRATÉGICA – TODOS OS DIREITOS RESERVADOS'
};

const DEFAULT_CONFIG: SiteConfig = {
  navbar: {
    logoTitle: 'Aldo Leão',
    logoSubtitle: 'Advocacia Estratégica',
    logoImageUrl: '/img/logo.png',
    btnConsultation: 'Consulta Digital',
    oabNumber: 'OAB/RS 48.452'
  },
  hero: {
    heroImageUrl: '/img/novofundohero.jpg',
    heroImageMobileUrl: '/img/novofundohero_mobile.jpg',
    heroSlide2ImageUrl: '/img/holding-family-hero-bg.jpg',
    heroSlide2ImageMobileUrl: '/img/holding-family-mobile.jpg',
    kicker: 'ALDO LEÃO',
    kickerSub: 'ADVOCACIA ESTRATÉGICA',
    titlePart1: 'TRADIÇÃO JURÍDICA',
    titleHighlight: 'DESDE 1908',
    titlePart2: '· MAIS DE UM SÉCULO DE EXCELÊNCIA',
    description: 'Desde 1908, o escritório de advocacia mais antigo do Brasil une tradição jurídica, experiência e inovação na proteção e perpetuação de legados familiares. Com sede em Porto Alegre e atuação digital em todo o território nacional, o Dr. Aldo Leão representa a terceira geração da família na Advocacia Estratégica (1986), sendo referência em Planejamento Patrimonial 4.0 via Holding Familiar, Proteção Patrimonial e Sucessão Empresarial.',
    tagline: 'EXCELÊNCIA JURÍDICA CENTENÁRIA EM TRÊS GERAÇÕES',
    foundingYear: '1908',
    experienceYears: '40 Anos',
    oabNumber: 'OAB/RS 48.452',
    yearsExperience: '40 Anos',
    assetsPreserved: 'R$ 2.4B+',
    cta1Text: 'AGENDAR CONSULTA DIGITAL',
    cta2Text: 'CONHEÇA O PLANEJAMENTO 4.0',
    badgeYear: '1908',
    badgeText: 'O Escritório Mais Antigo do Brasil'
  },
  contact: {
    sectionKicker: 'ATENDIMENTO DIGITAL EM TODO O BRASIL',
    sectionTitle: 'CONTATO',
    introGold: 'Escolha o canal de relacionamento com a ALDO LEÃO ADVOCACIA ESTRATÉGICA da sua preferência para o seu atendimento digital em todo o Brasil.',
    whatsappNumber: '5551998088998',
    phonePrimary: '(51) 99808-8998',
    phoneSecondary: '(51) 99807-8998',
    emailPrimary: 'aldoleaoadvocacia@gmail.com',
    emailHolding1: 'aldoleao.planejamento@gmail.com',
    emailHolding2: 'holdingfamiliarbr@gmail.com',
    emailAcademia: 'academialeaoferreira@gmail.com',
    emailSecondary: 'aldoleao.planejamento@gmail.com',
    emailHolding: 'holdingfamiliarbr@gmail.com',
    formPrompt: 'Preencha os campos abaixo para o seu atendimento estratégico por um de nossos Advogados especialistas.',
    formNamePlaceholder: 'Nome Completo',
    formConsultationLabel: 'Tipo de Consulta',
    addressPortoAlegre: 'Av. Cel. Lucas de Oliveira, 1255/502, Bairro Bela Vista, CEP 90440-011, Porto Alegre - RS',
    officeHours: 'De 2a à 6a feira, das 08:30/11:30hs e das 13:30/18:30hs.',
    boxVirtualTitle: 'ATENDIMENTO VIRTUAL BRASIL',
    boxVirtualText: 'Nosso atendimento em todo o território nacional é feito com hora marcada, mediante prévio agendamento pelo WhatsApp, de 2a à 6a feira, das 08:30/11:30hs e das 13:30/18:30hs.',
    spAddress: 'Av. Cel. Lucas de Oliveira, 1255/502, Bairro Bela Vista, CEP 90440-011, Porto Alegre - RS',
    bsbAddress: 'Atendimento Virtual Especializado com Hora Marcada em Todo o Brasil',
    cwbAddress: 'Escritório Digital Brasil · Atendimento em Todo o Território Nacional',
    spPhone: '(51) 99808-8998',
    bsbPhone: '(51) 99807-8998',
    cwbPhone: '(51) 99808-8998',
    email: 'aldoleaoadvocacia@gmail.com'
  },
  founder: {
    sectionKicker: 'ADVOCACIA ESTRATÉGICA DESDE 1986',
    sectionSubtitle: 'LIDERANÇA JURÍDICA E TRADIÇÃO DE VANGUARDA',
    sectionTitle: 'HEAD',
    sectionHighlight: 'JURÍDICO',
    name: 'Dr. ALDO LEÃO',
    fullName: 'Dr. Aldo Leão',
    title: 'EXCELÊNCIA JURÍDICA CENTENÁRIA',
    credentials: 'Desde 1986 · Terceira Geração · Mais de 40 Anos de Excelência Jurídica',
    photoUrl: '/img/dr-aldo-portrait.jpg',
    secondaryPhotoUrl: '/img/dr-aldo-reuniao.jpg',
    bioParagraph1: 'Desde 1986, o Dr. Aldo Leão conduz a terceira geração de um legado jurídico familiar iniciado em 1908 pelo Prof. Dr. Arnaldo da Silva Ferreira.',
    bioParagraph2: 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA representa a convergência perfeita entre a tradição institucional centenária e a inovação tecnológica da advocacia avançada.',
    bioParagraph3: 'Com uma trajetória de mais de quatro décadas dedicada à Excelência Jurídica, o Dr. Aldo Leão une o rigor técnico do Direito à inteligência estratégica na gestão patrimonial e empresarial, estruturando soluções voltadas à segurança, à proteção e à perpetuação de ativos familiares e corporativos.',
    bioParagraph4: 'Sua sólida atuação profissional é marcada por uma expressiva contribuição acadêmica e intelectual.',
    bioParagraph5: 'O Dr. Aldo Leão possui extensa produção jurídica, com mais de uma centena de artigos e livros digitais publicados, além de reconhecida experiência em docência superior e palestras sobre temas fundamentais do Direito.',
    bioParagraph6: 'Sob sua liderança, o escritório consolida um modelo de atendimento de altíssimo padrão, unindo a sabedoria de um histórico centenário à agilidade da Gestão Jurídica 4.0. no Planejamento Patrimonial avançado.',
    signatureImageUrl: '/img/assinatura-gold.png',
    saibaMaisBtn: 'SAIBA MAIS',
    btnConsultation: 'AGENDAR CONSULTA VIRTUAL',
    btnLivros: 'LIVROS DIGITAIS',
    counterTitle: 'ADVOCACIA ESTRATÉGICA DE EXCELÊNCIA',
    counterSub: 'Desde 1986 · Terceira Geração de Tradição Jurídica Familiar Centenária',
    counterYears: 40,
    counterSuffix: 'Anos+',
    modalBio1: 'Advogado atuante há mais de quatro décadas, líder da terceira geração da advocacia familiar iniciada em 1908. Especialista em Planejamento Patrimonial 4.0 via Holding Familiar, Proteção Patrimonial e Sucessão Empresarial.',
    modalBio2: 'Possui ampla experiência acadêmica e forense, tendo publicado mais de 100 artigos jurídicos especializados e 6 livros jurídicos digitais com foco em proteção patrimonial e segurança jurídica.',
    specialties: [
      'Planejamento Patrimonial 4.0 (via Holding Familiar)',
      'Direito Imobiliário e Gestão de Ativos',
      'Direito Empresarial e Societário',
      'Direito Civil, Família e Sucessões',
      'Relações de Consumo e Direito'
    ],
    differentials: [
      '40 + Anos de Advocacia Estratégica num legado jurídico centenário',
      'Autor de Livros e Artigos Jurídicos Publicados',
      'Referência nacional em Planejamento Patrimonial via Holding Familiar',
      'Atendimento e processos 100% digitais no Brasil'
    ],
    curriculumTrajectoryP1: 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA representa a convergência entre a tradição jurídica centenária de três gerações e a inovação da Advocacia Estratégica.',
    curriculumTrajectoryP2: 'Desde 1986, o Dr. Aldo Leão dá continuidade a um legado jurídico familiar iniciado em 1908 por seu avô paterno, o Prof. Dr. Arnaldo da Silva Ferreira, construindo uma trajetória de mais de quatro décadas de reconhecida relevância jurídica nacional.',
    curriculumTrajectoryP3: 'Com rigor técnico, excelência e inteligência jurídica, o escritório atua na estruturação de soluções jurídicas estratégicas e personalizadas, especialmente voltadas à proteção e gestão do patrimônio e da empresa, com visão de longo prazo e foco na perpetuação de legados.',
    curriculumTrajectoryP4: 'A trajetória do Dr. Aldo Leão reúne ainda extensa produção jurídica, com mais de uma centena de artigos publicados, além de livros digitais publicados, docência superior e destacada atuação em palestras, congressos, seminários, mentorias e workshops, além do exercício de funções de relevância jurídica, acadêmica e institucional.',
    curriculumTrajectoryP5: 'Tradição, inteligência jurídica e estratégia para proteger e perpetuar o seu patrimônio e empresa para as futuras gerações.',
    curriculumLeadershipItems: [
      '40 + Anos de Advocacia Estratégica (1986)',
      'Escritório de Advocacia mais antigo do Brasil (3ª Geração)',
      'Referência em Planejamento Patrimonial e Empresarial 4.0 (Holding Familiar)',
      'Proteção Jurídica Patrimonial',
      'Direito Imobiliário & Ativos',
      'Direito Empresarial & Sucessão Corporativa',
      'Direito Civil',
      'Relações de Consumo'
    ],
    curriculumTrajectoryItems: [
      'Advogado Estratégico',
      'Gestor Jurídico Patrimonial',
      'Gestor Jurídico Empresarial',
      'Palestrante e Coach Jurídico',
      'Procurador Municipal (20 Municípios no RS)',
      'Procurador do Banco do Brasil S/A',
      'Membro da Associação Nacional dos Gestores Ambientais',
      'Membro do Instituto dos Advogados do RS',
      'Presidente da Associação Brasileira do Meio Ambiente',
      'Assessor Jurídico da Assembleia Legislativa do RS',
      'Conselheiro do DMAE (Águas e Esgotos de POA)',
      'Diretor do Depto. de Direito Empresarial do IARGS',
      'Conselheiro do CONDECON POA (Defesa do Consumidor)',
      'Membro da 3ª Comissão de Ética e Disciplina da OABRS'
    ],
    curriculumLiteratureItems: [
      'Autor de mais de uma centena de Artigos Jurídicos Publicados',
      'Autor de Livros Digitais Publicados:'
    ],
    curriculumBooksList: [
      'Planejamento Patrimonial 4.0 & o Alto Risco da Omissão',
      'Holding Familiar e Imobiliária',
      'Você tem Patrimônio e deseja protegê-lo juridicamente?',
      'Os Sete Cuidados na Compra do Imóvel',
      'Síndico Próspero: Administrando o Condomínio em Alta Performance',
      'Mercado de Carbono: Construindo um Futuro Sustentável',
      'LGPD: A Primeira Condenação no Brasil por Compartilhamento Ilegal de Dados',
      'Como Resolver as Dívidas Bancárias em Tempos de COVID-19?'
    ],
    curriculumDocenciaItems: [
      'Prof. da Faculdade de Direito da UNISINOS',
      'Prof. da Escola Superior de Estudos Jurídicos do IARGS',
      'Prof. da Escola Superior de Advocacia da OABRS',
      'Prof. do Centro de Estudos do Trabalho – CETRA',
      'Prof. da Faculdade de Direito das Faculdades Reunidas São Judas Tadeu',
      'Prof. da Academia Leão Ferreira'
    ],
    differences: [
      'Terceira geração do legado jurídico familiar iniciado em 1908 pelo Prof. Dr. Arnaldo da Silva Ferreira.',
      'Mais de quatro décadas de advocacia estratégica ininterrupta do Dr. Aldo Leão (desde 1986).',
      'Referência nacional em Holding Familiar e Planejamento Patrimonial 4.0.',
      'Atuação nacional por meio de atendimento jurídico 100% digital, seguro, confidencial e resolutivo.'
    ]
  },
  practiceAreas: DEFAULT_PRACTICE_AREAS,
  excellenceSolutions: DEFAULT_EXCELLENCE_SOLUTIONS,
  publications: DEFAULT_PUBLICATIONS,
  digitalBooks: DEFAULT_DIGITAL_BOOKS,
  caseStudies: DEFAULT_CASE_STUDIES,
  slide2: {
    eyebrow: 'HOLDING FAMILIAR',
    title: 'PLANEJAMENTO',
    titleHighlight: 'PATRIMONIAL 4.0',
    paragraph1: 'Proteja, organize e perpetue o seu legado com a inteligência jurídica e a segurança estratégica de nossos especialistas.',
    paragraph2: 'A Holding Familiar é a solução jurídica de vanguarda para a proteção do patrimônio e da/s empresa/s, com vistas à sua perpetuação.',
    paragraph3: 'Com expertise centenária, a ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve avançadas modelagens empresariais e patrimoniais personalizadas para você e sua família.',
    paragraph4: 'Agende hoje, o seu Diagnóstico de Viabilidade e saiba porque o Planejamento Patrimonial 4.0 via Holding Familiar é a solução jurídica inteligente e eficaz para a perpetuação do seu legado.',
    callout1: 'QUE LEGADO VOCÊ VAI DEIXAR AOS SEUS HERDEIROS? A Alta Perda Patrimonial do Inventário ou o Planejamento Patrimonial 4.0 que evita o Inventário?',
    callout2: 'EVITE A ALTA PERDA PATRIMONIAL E FINANCEIRA DOS SEUS FILHOS NO INVENTÁRIO.',
    buttonText: 'Planejamento Patrimonial 4.0',
    boxTitle: 'O INVENTÁRIO GERA UMA ALTA PERDA PATRIMONIAL DOS HERDEIROS NO INVENTÁRIO',
    boxText: 'O inventário gera uma Alta Perda Patrimonial e Financeira dos herdeiros em média de 40% do Patrimônio Inventário, em média, que é evitada pelo Planejamento Patrimonial 4.0, que vai aumentar por causa do aumento do ITCMD.',
    rightCardTitle: 'Comparativo de Custos entre o processo de Inventário e o Planejamento Patrimonial 4.0 via Holding Familiar',
    rightCardSub: 'Você conhece o Alto Custo do processo de Inventário para os seus herdeiros? Os números são incontestáveis.',
    rightCardText: 'Em média a Perda Patrimonial e Financeira dos herdeiros é de 40% do Patrimônio Inventariado, a qual vai aumentar com a majoração da alíquota do ITCMD de 8% para 16% (Projeto de Resolução do Senado Federal N. 57/19), 20% (Confaz) ou 30% (Governo Federal).',
    rightCardBtn: 'VER OS CUSTOS',
    badgeTitle: 'Aldo Leão Advocacia Estratégica',
    badgeSubtitle: 'Desde 1908 · Tradição Jurídica Centenária',
    badgeYears: '118 Anos',
    sampleAcquisition: 'R$ 1.000.000,00',
    sampleMarket: 'R$ 1.500.000,00',
    sampleCapitalGain: 'R$ 500.000,00',
    inventoryTotal: 'R$ 297.000,00',
    holdingTotal: 'R$ 133.000,00',
    savingsAmount: 'R$ 164.000,00',
    savingsPercentage: '55,21%'
  },
  nationalPresence: {
    kicker: 'ATENDIMENTO JURÍDICO DE EXCELÊNCIA EM TODO O BRASIL',
    title: 'PRESENÇA NACIONAL',
    titleHighlight: 'DIGITAL',
    paragraph1: 'Com sede em Porto Alegre, a Advocacia Estratégica Dr. Aldo Leão rompe as fronteiras geográficas para levar a Excelência Jurídica Centenária a clientes de todo o território nacional.',
    paragraph2: 'Por meio de uma infraestrutura tecnológica de última geração e de processos 100% digitais, disponibilizamos uma advocacia estratégica moderna, segura e eficiente, proporcionando atendimento virtual com a mesma qualidade, proximidade e excelência do atendimento presencial.',
    paragraph3: 'Nosso modelo de atuação elimina deslocamentos desnecessários, otimiza o tempo dos clientes e amplia o acesso a soluções jurídicas especializadas, sem abrir mão da segurança, da confidencialidade e da excelência profissional.',
    quoteBox: 'EXPERIMENTE A ADVOCACIA ESTRATÉGICA DO FUTURO, HOJE.',
    card1Text: 'Atuação Digital no Brasil',
    card2Text: 'Infraestrutura Tecnológica de última geração',
    card3Text: 'Comodidade, Segurança, Confidencialidade, Sigilo e Economia para cada cliente.',
    badgeStatus: 'Atendimento 100% Digital Ativo',
    badgeStates: '27 Estados',
    mapImageUrl: '/img/presencadigital.jpeg'
  },
  centennialLegacy: {
    goldKicker: 'O ESCRITÓRIO DE ADVOCACIA MAIS ANTIGO DO BRASIL',
    title: 'O LEGADO',
    titleHighlight: 'CENTENÁRIO',
    subtitle: 'DESDE 1908',
    paragraph1: 'A história da Aldo Leão Advocacia Estratégica começou em 1908 e atravessa mais de um século de dedicação ao Direito, preservando valores éticos, excelência técnica e compromisso permanente com a proteção dos interesses de seus clientes.',
    paragraph2: 'Desde 1986, esse legado jurídico centenário é representado pela terceira geração da família, unindo tradição jurídica, inovação e inteligência estratégica para oferecer soluções jurídicas de alta performance.',
    signatureImageUrl: '/img/assinatura-gold.png',
    buttonText: 'Saiba Mais',
    card40Title: '40 Anos + de Excelência Jurídica na Advocacia Estratégica',
    card40Kicker: 'ADVOCACIA ESTRATÉGICA DE EXCELÊNCIA',
    card40Text: 'Iniciada em 1986, a atuação do Dr. Aldo Leão na terceira geração de advogados da família, consolidou uma das trajetórias mais respeitadas na proteção patrimonial e empresarial no país, unindo o rigor acadêmico, a experiência de mais de quatro décadas e a inteligência jurídica na prestação de serviços de vanguarda.',
    events: [
      {
        year: '1908',
        title: 'Fundação do Escritório',
        lawyers: ['Prof. Dr. Arnaldo da Silva Ferreira'],
        description: 'Precursor da advocacia empresarial no RS e fundador do escritório de advocacia mais antigo do Brasil.'
      },
      {
        year: '1935',
        title: 'CONTINUIDADE DO LEGADO JURÍDICO',
        lawyers: ['Dr. Mário de Castilhos Ferreira', 'Dr. Ney de Castilhos Ferreira'],
        description: 'Expansão da atuação jurídica de excelência técnica no cenário nacional.'
      },
      {
        year: '1951',
        title: 'Consolidação Institucional',
        lawyers: ['Prof. Dr. Aldo Leão Ferreira'],
        description: 'Procurador do Estado do RS e Professor Universitário, unindo a academia à prática jurídica.'
      },
      {
        year: '1986',
        title: 'Advocacia Estratégica',
        lawyers: ['Prof. Dr. Aldo Leão Ferreira Filho'],
        description: 'Início da terceira geração familiar, inovando ao estruturar a moderna Advocacia Estratégica e o Planejamento Patrimonial 4.0 (Holding Familiar).'
      },
      {
        year: '2020',
        title: 'Presença Nacional Digital',
        lawyers: ['Aldo Leão Advocacia Estratégica'],
        description: 'Atuação 100% digital em todo o território nacional, com alta tecnologia, segurança e a mesma excelência centenária.'
      }
    ],
    sub1908: 'Prof. Dr. Arnaldo da Silva Ferreira',
    sub1935: 'Dr. Mário de Castilhos Ferreira e Dr. Ney de Castilhos Ferreira',
    sub1951: 'Prof. Dr. Aldo Leão Ferreira',
    sub1986: 'Prof. Dr. Aldo Leão Ferreira Filho'
  },
  holdingFamiliar: {
    sectionKicker: 'PLANEJAMENTO PATRIMONIAL E EMPRESARIAL 4.0',
    sectionTitle: 'HOLDING',
    sectionHighlight: 'FAMILIAR',
    paragraph1: 'O Planejamento Patrimonial e Empresarial 4.0 via Holding Familiar representa uma nova geração de soluções jurídicas avançadas e especializadas voltadas à proteção patrimonial, estruturação e organização societária, governança familiar e sucessão empresarial.',
    paragraph2: 'Muito além da constituição de uma empresa, trata-se de uma modelagem jurídica personalizada, desenvolvida por advogados especialistas, para proteger o patrimônio, fortalecer a gestão dos ativos e assegurar sua perpetuação para as futuras gerações.',
    paragraph3: 'Cada modelagem estrutural é concebida de forma individualizada, considerando as características do patrimônio, da empresa, da família e dos objetivos do cliente (família).',
    cardImageUrl: '/img/holding-familiar-1.jpg',
    cardTitle: 'ESTRUTURAÇÃO E PROTEÇÃO PATRIMONIAL',
    cardText: 'Organização societária de especialistas para proteger e perpetuar o seu patrimônio e negócio para as futuras gerações.',
    cardBadge: 'PLANEJAMENTO 4.0',
    boxWhatIsTitle: 'O QUE É O PLANEJAMENTO 4.0?',
    boxWhatIsHeading: 'Metodologia Jurídica Estratégica Multidisciplinar',
    boxWhatIsText: 'Desenvolvida para organizar, proteger e perpetuar patrimônios e empresas por meio de soluções preventivas, reduzindo riscos jurídicos, sucessórios e tributários. Sua estrutura integra instrumentos de Direito Societário, Direito Empresarial, Direito Civil, Direito Imobiliário e Governança Familiar.',
    boxWhyTitle: 'Por Que Planejar em Vida?',
    boxWhyText: 'Permite que decisões patrimoniais e empresariais sejam tomadas de forma organizada, estratégica e com segurança jurídica, eliminando brigas entre herdeiros, a alta perda patrimonial e financeira do inventário (média 40% do patrimônio inventariado), partilha das cotas sociais em divórcios e dissoluções de uniões estáveis, a venda forçada e rápida de bens com deságio para quitar o inventário.',
    benefitsTitle: 'Principais Benefícios da Holding Familiar',
    benefits: [
      'Proteção Jurídica Patrimonial',
      'Planejamento Sucessório Corporativo',
      'Governança Familiar Estruturada',
      'Redução Expressiva da Carga Tributária',
      'Evita a Perda Financeira do Inventário',
      'Segurança e Continuidade dos Negócios',
      'Gestão Estratégica dos Ativos',
      'Harmonia e Preservação da Paz Familiar'
    ],
    tableTitle: 'INVENTÁRIO x HOLDING FAMILIAR',
    tableSubtitle: 'A título de exemplo, consideramos um patrimônio adquirido por R$ 1.000.000,00, com valor de mercado atual de R$ 1.500.000,00, tem um ganho de capital de R$ 500.000,00.',
    tableSavingsText: 'R$ 164.000,00 (correspondente a 55,21%)'
  },
  practiceAreasHeader: {
    kicker: 'SOLUÇÕES JURÍDICAS DE ALTA PERFORMANCE',
    title: 'ÁREAS DE',
    titleHighlight: 'ATUAÇÃO',
    description: 'Com a solidez de um legado jurídico iniciado em 1908 e a experiência de mais de quatro décadas da terceira geração da família na advocacia, a ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve soluções jurídicas avançadas e personalizadas, unindo inteligência estratégica, prevenção de riscos e excelência técnica para proteger patrimônios, fortalecer empresas e preservar legados. Nossa atuação concentra-se nas seguintes áreas:'
  },
  excellenceSolutionsHeader: {
    kicker: 'INTELIGÊNCIA JURÍDICA, ESTRATÉGIA E INOVAÇÃO',
    title: 'SOLUÇÕES DE',
    titleHighlight: 'EXCELÊNCIA',
    description1: 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve soluções jurídicas inovadoras que integram tradição jurídica centenária, inteligência estratégica e gestão, proporcionando proteção patrimonial e empresarial, segurança jurídica, eficiência organizacional e perpetuação de patrimônios, empresas e legados familiares.',
    description2: 'A excelência jurídica resulta da combinação entre o conhecimento técnico centenário, experiência profissional e visão estratégica.'
  },
  publicationsSection: {
    kicker: 'NOTÍCIAS E ARTIGOS JURÍDICOS',
    titleWhite: 'PUBLICAÇÕES',
    titleGold: 'JURÍDICAS',
    paragraph1: 'A produção de conhecimento jurídico faz parte da tradição centenária da ALDO LEÃO ADVOCACIA ESTRATÉGICA.',
    paragraph2: 'Aqui você encontra as notícias importantes e os artigos jurídicos de especialistas em linguagem clara e acessível.',
    paragraph3: 'Nosso compromisso é compartilhar o conhecimento especializado para que você fique atualizado com as novas tendências do cenário jurídico nacional, que impactam a sua vida e o seu legado.'
  },
  booksSection: {
    goldKicker: 'Acervo de Livros Digitais Publicados',
    titleWhite: 'LIVROS',
    titleGold: 'DIGITAIS',
    paragraph1: 'A produção intelectual sempre fez parte da tradição da ALDO LEÃO ADVOCACIA ESTRATÉGICA.',
    paragraph2: 'Nesta página reunimos os livros digitais publicados por especialistas, para compartilhar GRATUITAMENTE o conhecimento jurídico com soluções estratégicas e boas práticas.',
    paragraph3: 'Cada obra publicada pela Academia Leão Ferreira representa nosso compromisso permanente com a excelência jurídica, a inovação e a difusão do conhecimento especializado.'
  },
  digitalConsultation: {
    sectionKicker: 'ATENDIMENTO DIGITAL EM TODO O BRASIL',
    sectionTitle: 'AGENDE SUA',
    sectionHighlight: 'CONSULTA DIGITAL',
    description: 'Agende a sua Consulta Jurídica Digital com a ALDO LEÃO ADVOCACIA ESTRATÉGICA e descubra as soluções jurídicas avançadas e inteligentes para a sua necessidade. Nosso atendimento virtual no Brasil é realizado de forma personalizada, com segurança digital, confidencialidade e a mesma excelência do atendimento presencial.',
    point1: 'Agendamento prévio da consulta',
    point2: 'Consulta com hora marcada',
    btnSchedule: 'AGENDAR CONSULTA VIRTUAL',
    btnWhatsApp: 'Agendar pelo WhatsApp',
    bgImageUrl: '/img/dr-aldo-reuniao.jpg'
  },
  footer: {
    textCol1Paragraph1: 'A história da Aldo Leão Advocacia Estratégica começou em 1908 e atravessa mais de um século de dedicação ao Direito, preservando valores éticos, excelência técnica e compromisso permanente com a proteção dos interesses de seus clientes.',
    textCol1Paragraph2: 'Desde 1986, esse legado jurídico centenário é representado pela terceira geração da família, unindo tradição jurídica, inovação e inteligência estratégica para oferecer soluções jurídicas de alta performance.',
    copyrightText: 'Aldo Leão Advocacia Estratégica · Tradição Jurídica Centenária Desde 1908. Todos os direitos reservados.',
    oabDisclaimer: 'Provimento nº 205/2021 do Conselho Federal da OAB · Inscrição OAB/RS 48.452.'
  },
  urgentHotline: {
    badge: 'Plantão Urgente',
    title: 'Atendimento em Todo o Brasil',
    phoneText: '(51) 99808-8998',
    oabText: 'OAB/RS 48.452'
  },
  academiaLeao: {
    kicker: 'CENTRO DE ESTUDOS JURÍDICOS SUPERIORES',
    title: 'ACADEMIA LEÃO FERREIRA',
    paragraph1: 'Centro de Estudos Jurídicos Superiores da Aldo Leão Advocacia Estratégica, dedicado à produção e difusão do conhecimento jurídico especializado.',
    paragraph2: 'A Academia realiza a publicação de artigos jurídicos, de livros digitais, promove a realização de palestras, cursos, treinamentos, mentorias, workshops e seminários especializados.',
    paragraph3: 'Nossa missão é transformar o conhecimento jurídico especializado em uma ferramenta de evolução pessoal e transformação.',
    phraseGold: 'CONFERENCISTA E PALESTRANTE NACIONAL',
    speakerText: 'O Dr. Aldo Leão é presença marcante em congressos, seminários, mentorias, workshops, fóruns empresariais e imobiliários e palestras.',
    btnWhatsApp: 'FALAR COM A ACADEMIA',
    lectureBoxTitle: 'PLANEJAMENTO PATRIMONIAL 4.0 & O ALTO CUSTO DA OMISSÃO',
    lecturePhotoUrl: '/img/palestra-1.jpg',
    lectureCaption: 'Dr. Aldo Leão em conferência presencial sobre Planejamento Patrimonial 4.0 & o Alto Custo da Omissão',
    ctaPrompt: 'Para solicitar a realização de uma Conferência, Palestra, Seminário, Mentoria ou Workshop a ser ministrado pelo Dr. Aldo Leão, clique no botão abaixo.',
    ctaButtonText: 'AGENDAR CONFERÊNCIA'
  },
  articleSignature: {
    enabled: true,
    line1: 'Núcleo de Comunicação',
    line1Color: '#FFFFFF',
    line2: 'ALDO LEÃO ADVOCACIA ESTRATÉGICA',
    line2Color: '#D4AF37',
    line3: 'Excelência Jurídica Desde 1908',
    line3Color: '#F8F8F8',
    buttonText: 'AGENDAR CONSULTA',
    buttonTextColor: '#050B14',
    whatsappNumber: '',
    whatsappMessage: 'Olá! Estava lendo uma publicação no portal da Aldo Leão Advocacia Estratégica e gostaria de agendar uma consulta jurídica.'
  },
  holdingLanding: DEFAULT_HOLDING_LANDING
};

const INITIAL_LEADS: ConsultationRequest[] = [
  {
    id: 'lead-001',
    fullName: 'Dr. Roberto Alcântara',
    company: 'Indústria Química Alcantara S/A',
    email: 'roberto.alcantara@alcantarasa.com.br',
    phone: '(51) 98765-4321',
    area: 'Planejamento Patrimonial 4.0',
    urgency: 'imediata',
    estimatedValue: 'R$ 14.500.000',
    summary: 'Solicito ao escritório ALDO LEÃO ADVOCACIA ESTRATÉGICA o agendamento do meu DIAGNÓSTICO DE VIABILIDADE para conhecer o Planejamento Patrimonial 4.0.',
    ndaAccepted: true,
    createdAt: '2026-10-10T08:15:00.000Z',
    status: 'novo',
    internalNotes: 'Caso de alta relevância societária e patrimonial. Contato inicial pré-agendado via WhatsApp do Dr. Aldo Leão.',
    source: 'Landing Page /1208/'
  },
  {
    id: 'lead-002',
    fullName: 'Família Silveira & Filhos',
    company: 'Silveira Agropecuária & Grãos',
    email: 'silveira.holding@agroflorestal.com.br',
    phone: '(51) 99654-1122',
    area: 'Planejamento Patrimonial 4.0',
    urgency: 'media',
    estimatedValue: 'R$ 38.000.000',
    summary: 'Estruturação de Holding Familiar para 3 herdeiros e 12 mil hectares no RS/MT. Desejamos evitar o processo de inventário e os conflitos sucessórios.',
    ndaAccepted: true,
    createdAt: '2026-10-09T16:30:00.000Z',
    status: 'reuniao_agendada',
    internalNotes: 'Reunião de Diagnóstico de Viabilidade agendada. Minuta preliminar de holding sob análise.',
    source: 'Holding Familiar 4.0'
  },
  {
    id: 'lead-003',
    fullName: 'Marcelo Vianna',
    company: 'Nexus Imóveis e Participações',
    email: 'marcelo@nexusimoveis.com.br',
    phone: '(51) 99123-8899',
    area: 'Direito Imobiliário',
    urgency: 'imediata',
    estimatedValue: 'R$ 8.200.000',
    summary: 'Due diligence e regularização de carteira imobiliária de 14 imóveis urbanos antes da integralização em sociedade patrimonial.',
    ndaAccepted: true,
    createdAt: '2026-10-08T14:10:00.000Z',
    status: 'em_analise',
    internalNotes: 'Auditoria de certidões em andamento pelo gabinete.',
    source: 'Áreas de Atuação'
  }
];

interface SiteContextType {
  siteConfig: SiteConfig;
  leads: ConsultationRequest[];
  addLead: (lead: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  resetSiteConfigToDefault: () => void;
}

const CURRENT_CONFIG_KEY = 'aldoleao_site_config_v25';

const normalizeContactConfig = (rawContact: any) => {
  const c = { ...DEFAULT_CONFIG.contact, ...(rawContact || {}) };
  if (!c.boxVirtualText || !c.boxVirtualText.includes('08:30/11:30hs') || c.boxVirtualText.includes('2ª')) {
    c.boxVirtualText = DEFAULT_CONFIG.contact.boxVirtualText;
  }
  return c;
};

const normalizeFounderConfig = (rawFounder: any) => {
  const f = { ...DEFAULT_CONFIG.founder, ...(rawFounder || {}) };
  if (!f.sectionSubtitle || f.sectionSubtitle === 'ADVOCACIA ESTRATÉGICA') {
    f.sectionSubtitle = DEFAULT_CONFIG.founder.sectionSubtitle;
  }
  if (!f.title || f.title === 'ADVOCACIA ESTRATÉGICA') {
    f.title = DEFAULT_CONFIG.founder.title;
  }
  if (!f.btnConsultation || f.btnConsultation === 'AGENDAR CONSULTA DIGITAL') {
    f.btnConsultation = DEFAULT_CONFIG.founder.btnConsultation;
  }
  // Atualiza textos legados da biografia para o novo texto oficial do Dr. Aldo Leão
  if (
    !f.bioParagraph1 ||
    f.bioParagraph1.includes('terceira geração do legado jurídico familiar') ||
    !f.bioParagraph2 ||
    f.bioParagraph2.includes('tradição jurídica centenária de três gerações') ||
    f.bioParagraph2.includes('Com uma trajetória de mais de 40 anos')
  ) {
    f.bioParagraph1 = DEFAULT_CONFIG.founder.bioParagraph1;
    f.bioParagraph2 = DEFAULT_CONFIG.founder.bioParagraph2;
    f.bioParagraph3 = DEFAULT_CONFIG.founder.bioParagraph3;
    f.bioParagraph4 = DEFAULT_CONFIG.founder.bioParagraph4;
    f.bioParagraph5 = DEFAULT_CONFIG.founder.bioParagraph5;
    f.bioParagraph6 = DEFAULT_CONFIG.founder.bioParagraph6;
  }
  return f;
};

// Purga de chaves antigas de cache para garantir que todos os navegadores carreguem a versão mais recente
try {
  const legacyKeys = [
    'aldoleao_site_config',
    'aldoleao_site_config_v1',
    'aldoleao_site_config_v2',
    'aldoleao_site_config_v3',
    'aldoleao_site_config_v4',
    'aldoleao_site_config_v5',
    'aldoleao_site_config_v6',
    'aldoleao_site_config_v7',
    'aldoleao_site_config_v8',
    'aldoleao_site_config_v9',
    'aldoleao_site_config_v10',
    'aldoleao_site_config_v11',
    'aldoleao_site_config_v12',
    'aldoleao_site_config_v13',
    'aldoleao_site_config_v14',
    'aldoleao_site_config_v15',
    'aldoleao_site_config_v20',
    'aldoleao_site_config_v21',
    'aldoleao_site_config_v22',
    'aldoleao_site_config_v23',
    'aldoleao_site_config_v24'
  ];
  legacyKeys.forEach(k => localStorage.removeItem(k));
} catch (e) {
  // Ignora erros em ambientes restritos
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const heroConfig = { ...DEFAULT_CONFIG.hero, ...(parsed.hero || {}) };
        if (heroConfig.heroImageUrl && (heroConfig.heroImageUrl.includes('logo') || heroConfig.heroImageUrl === '')) {
          heroConfig.heroImageUrl = '/img/dr-aldo-1.jpg';
        }
        const navbarConfig = { ...DEFAULT_CONFIG.navbar, ...(parsed.navbar || {}) };
        if (!navbarConfig.logoImageUrl) {
          navbarConfig.logoImageUrl = '/img/logo.png';
        }

        const contactConfig = normalizeContactConfig(parsed.contact);
        contactConfig.phonePrimary = cleanAndFormatPhone(contactConfig.phonePrimary, '(51) 99808-8998');
        contactConfig.phoneSecondary = cleanAndFormatPhone(contactConfig.phoneSecondary, '(51) 99807-8998');
        contactConfig.spPhone = cleanAndFormatPhone(contactConfig.spPhone, '(51) 99808-8998');
        contactConfig.bsbPhone = cleanAndFormatPhone(contactConfig.bsbPhone, '(51) 99807-8998');
        contactConfig.cwbPhone = cleanAndFormatPhone(contactConfig.cwbPhone, '(51) 99808-8998');
        contactConfig.whatsappNumber = getCleanWhatsAppDigits(contactConfig.whatsappNumber, '5551998088998');

        const practiceAreas = (parsed.practiceAreas && Array.isArray(parsed.practiceAreas) && parsed.practiceAreas.length > 0)
          ? parsed.practiceAreas.map((pa: any, i: number) => ({
            ...pa,
            number: pa.number || `0${i + 1}`,
            badge: pa.badge || `0${i + 1}`
          }))
          : DEFAULT_PRACTICE_AREAS;

        // Preserva os livros salvos pelo usuário, mantendo capas customizadas e livros novos adicionados
        const digitalBooks = (parsed.digitalBooks && Array.isArray(parsed.digitalBooks) && parsed.digitalBooks.length > 0)
          ? parsed.digitalBooks.map((savedBook: any) => {
            const defaultMatch = DEFAULT_DIGITAL_BOOKS.find(b => b.id === savedBook.id);
            return {
              ...(defaultMatch || {}),
              ...savedBook,
              coverImage: savedBook.coverImage || defaultMatch?.coverImage || ''
            };
          })
          : DEFAULT_DIGITAL_BOOKS;

        // Assegura que as frases douradas oficiais de Soluções de Excelência estejam sempre atualizadas (Itens 30 a 37 e 59)
        const excellenceSolutions = DEFAULT_EXCELLENCE_SOLUTIONS.map(defSol => {
          const userSol = (parsed.excellenceSolutions || []).find((s: any) => s.id === defSol.id || s.number === defSol.number);
          return {
            ...defSol,
            ...(userSol || {}),
            subtitle: defSol.subtitle // Garante sempre o subtítulo dourado oficial atualizado
          };
        });

        const centennialLegacy = { ...DEFAULT_CONFIG.centennialLegacy, ...(parsed.centennialLegacy || {}) };
        if (centennialLegacy.events && centennialLegacy.events.length > 0) {
          centennialLegacy.events = centennialLegacy.events.map((ev: any) =>
            (ev.title?.toLowerCase().includes('presença nacional digital') && ev.year === '2026')
              ? { ...ev, year: '2020' }
              : ev
          );
        }

        // Assegura que publicações editadas pelo usuário sejam mantidas com fidelidade
        const publications = (parsed.publications && Array.isArray(parsed.publications) && parsed.publications.length > 0)
          ? parsed.publications
          : DEFAULT_PUBLICATIONS;

        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          navbar: navbarConfig,
          hero: heroConfig,
          contact: contactConfig,
          practiceAreas,
          excellenceSolutions,
          digitalBooks,
          publications,
          founder: normalizeFounderConfig(parsed.founder),
          slide2: { ...DEFAULT_CONFIG.slide2, ...(parsed.slide2 || {}) },
          nationalPresence: { ...DEFAULT_CONFIG.nationalPresence, ...(parsed.nationalPresence || {}) },
          centennialLegacy,
          holdingFamiliar: { ...DEFAULT_CONFIG.holdingFamiliar, ...(parsed.holdingFamiliar || {}) },
          practiceAreasHeader: { ...DEFAULT_CONFIG.practiceAreasHeader, ...(parsed.practiceAreasHeader || {}) },
          excellenceSolutionsHeader: { ...DEFAULT_CONFIG.excellenceSolutionsHeader, ...(parsed.excellenceSolutionsHeader || {}) },
          publicationsSection: { ...DEFAULT_CONFIG.publicationsSection, ...(parsed.publicationsSection || {}) },
          booksSection: { ...DEFAULT_CONFIG.booksSection, ...(parsed.booksSection || {}) },
          digitalConsultation: { ...DEFAULT_CONFIG.digitalConsultation, ...(parsed.digitalConsultation || {}) },
          footer: { ...DEFAULT_CONFIG.footer, ...(parsed.footer || {}) },
          urgentHotline: { ...DEFAULT_CONFIG.urgentHotline, ...(parsed.urgentHotline || {}) },
          academiaLeao: { ...DEFAULT_CONFIG.academiaLeao, ...(parsed.academiaLeao || {}) },
          articleSignature: { ...DEFAULT_CONFIG.articleSignature, ...(parsed.articleSignature || {}) },
          holdingLanding: { ...DEFAULT_HOLDING_LANDING, ...(parsed.holdingLanding || {}) },
        };
      }
    } catch (e) {
      console.error('Error loading site config:', e);
    }
    return DEFAULT_CONFIG;
  });

  const [leads, setLeads] = useState<ConsultationRequest[]>(() => {
    try {
      const saved = localStorage.getItem('aldoleao_leads_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading leads:', e);
    }
    return INITIAL_LEADS;
  });

  // Sincronização em tempo real na nuvem via Firebase Firestore
  useEffect(() => {
    const unsubscribe = subscribeToSiteConfig((cloudConfig) => {
      if (cloudConfig && typeof cloudConfig === 'object') {
        setSiteConfig(prev => {
          // Merge seguro para não perder nenhuma chave oficial
          const updated: SiteConfig = {
            ...prev,
            ...cloudConfig,
            navbar: { ...(prev.navbar || {}), ...(cloudConfig.navbar || {}) },
            hero: { ...(prev.hero || {}), ...(cloudConfig.hero || {}) },
            slide2: { ...(prev.slide2 || {}), ...(cloudConfig.slide2 || {}) },
            contact: normalizeContactConfig({ ...(prev.contact || {}), ...(cloudConfig.contact || {}) }),
            founder: normalizeFounderConfig({ ...(prev.founder || {}), ...(cloudConfig.founder || {}) }),
            nationalPresence: { ...(prev.nationalPresence || {}), ...(cloudConfig.nationalPresence || {}) },
            centennialLegacy: { ...(prev.centennialLegacy || {}), ...(cloudConfig.centennialLegacy || {}) },
            holdingFamiliar: { ...(prev.holdingFamiliar || {}), ...(cloudConfig.holdingFamiliar || {}) },
            digitalConsultation: { ...(prev.digitalConsultation || {}), ...(cloudConfig.digitalConsultation || {}) },
            footer: { ...(prev.footer || {}), ...(cloudConfig.footer || {}) },
            academiaLeao: { ...(prev.academiaLeao || {}), ...(cloudConfig.academiaLeao || {}) },
            holdingLanding: { ...(prev.holdingLanding || {}), ...(cloudConfig.holdingLanding || {}) },
            practiceAreas: (cloudConfig.practiceAreas && cloudConfig.practiceAreas.length > 0)
              ? cloudConfig.practiceAreas
              : prev.practiceAreas,
            excellenceSolutions: (cloudConfig.excellenceSolutions && cloudConfig.excellenceSolutions.length > 0)
              ? cloudConfig.excellenceSolutions
              : prev.excellenceSolutions,
            digitalBooks: (cloudConfig.digitalBooks && cloudConfig.digitalBooks.length > 0)
              ? cloudConfig.digitalBooks
              : prev.digitalBooks,
            publications: (cloudConfig.publications && cloudConfig.publications.length > 0)
              ? cloudConfig.publications
              : prev.publications,
          };
          if (
            !cloudConfig.contact?.boxVirtualText ||
            !cloudConfig.contact.boxVirtualText.includes('08:30/11:30hs') ||
            cloudConfig.contact.boxVirtualText.includes('2ª')
          ) {
            saveSiteConfigToFirebase(updated).catch(() => {});
          }
          return updated;
        });
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Salva no localStorage local para carregamento instantâneo offline
  useEffect(() => {
    try {
      localStorage.setItem(CURRENT_CONFIG_KEY, JSON.stringify(siteConfig));
    } catch (e) {
      console.error('Error persisting site config:', e);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('aldoleao_leads_v2', JSON.stringify(leads));
    } catch (e) {
      console.error('Error persisting leads:', e);
    }
  }, [leads]);

  const addLead = (leadData: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>) => {
    const newLead: ConsultationRequest = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'novo',
      internalNotes: ''
    };
    setLeads(prev => [newLead, ...prev]);
    // Registra lead na nuvem Firebase Firestore
    saveLeadToFirebase(newLead).catch(err => {
      console.warn('[Firebase] Não foi possível sincronizar o lead na nuvem:', err);
    });
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status } : lead));
  };

  const updateLeadNotes = (id: string, internalNotes: string) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, internalNotes } : lead));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setSiteConfig(prev => {
      const merged = { ...prev, ...newConfig };
      // Sincroniza imediatamente na nuvem Firebase Firestore
      saveSiteConfigToFirebase(merged).catch(err => {
        console.warn('[Firebase] Não foi possível sincronizar alterações na nuvem:', err);
      });
      return merged;
    });
  };

  const resetSiteConfigToDefault = () => {
    setSiteConfig(DEFAULT_CONFIG);
    saveSiteConfigToFirebase(DEFAULT_CONFIG).catch(err => {
      console.warn('[Firebase] Não foi possível sincronizar reset na nuvem:', err);
    });
  };

  return (
    <SiteContext.Provider
      value={{
        siteConfig,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadNotes,
        deleteLead,
        updateSiteConfig,
        resetSiteConfigToDefault
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
