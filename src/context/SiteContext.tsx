import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SiteConfig, 
  ConsultationRequest, 
  LeadStatus, 
  PracticeArea, 
  ExcellenceSolution, 
  Publication, 
  DigitalBook,
  CaseStudy
} from '../types';
import realPartnerImg from '../assets/images/aldo_leao_portrait_real_1791572566625.jpg';

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
    badge: 'Imóveis'
  },
  {
    id: 'empresarial',
    number: '03',
    title: 'Direito Empresarial',
    subtitle: 'Governança Corporativa & Societário',
    description: 'Soluções jurídicas empresariais estratégicas voltadas à governança corporativa, estruturação societária, prevenção de riscos, compliance, conformidade normativa e fortalecimento da segurança jurídica dos negócios.',
    badge: 'EMPRESARIAL'
  },
  {
    id: 'civil',
    number: '04',
    title: 'Direito Civil',
    subtitle: 'Contratos Estratégicos, Família e Sucessões.',
    description: 'Assessoria jurídica e advocacia estratégica em contratos de alta complexidade, distratos, responsabilidade civil, obrigações, Direito de Família e Sucessões, com foco na prevenção, segurança jurídica e perpetuação patrimonial.',
    badge: 'Direito Civil'
  },
  {
    id: 'consumo',
    number: '05',
    title: 'Relações de Consumo',
    subtitle: 'Compliance Consumerista & Mitigação de Passivos',
    description: 'Desenvolvimento de estratégias preventivas em compliance consumerista, mitigação de riscos, prevenção de prejuízos financeiros (multas, indenizações) e adequação rigorosa das relações de consumo para empresas.',
    badge: 'Consumidor'
  }
];

const DEFAULT_EXCELLENCE_SOLUTIONS: ExcellenceSolution[] = [
  {
    id: 'advocacia-estrategica',
    number: '01',
    title: 'Advocacia Estratégica',
    subtitle: 'Prevenção & Vantagem Competitiva',
    description: 'Muito mais do que solucionar conflitos, a Advocacia Estratégica antecipa riscos, protege patrimônios, fortalece empresas e transforma decisões jurídicas em vantagem competitiva por meio de soluções inteligentes, preventivas e legais.',
    extendedText: 'Atuação preventiva voltada à proteção patrimonial, segurança jurídica e decisões corporativas estratégicas de alta performance.'
  },
  {
    id: 'planejamento-patrimonial-40',
    number: '02',
    title: 'Planejamento Patrimonial 4.0',
    subtitle: 'Holding Familiar & Sucessão em Vida',
    description: 'Uma solução jurídica de vanguarda desenvolvida por especialistas para proteger, organizar e perpetuar patrimônios e empresas (holding e subsidiária), evitando a alta perda patrimonial e financeira dos herdeiros no inventário.',
    extendedText: 'Estruturação societária destinada à proteção, organização e perpetuação do patrimônio familiar e das empresas.',
    isLandingLink: true
  },
  {
    id: 'inteligencia-juridica',
    number: '03',
    title: 'Inteligência Jurídica',
    subtitle: 'Análise Estratégica & Apoio Decisório',
    description: 'A Inteligência Jurídica utiliza análise estratégica, planejamento e visão preventiva para reduzir riscos, perdas patrimoniais e financeiras, transformando informações em decisões assertivas.',
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
    subtitle: 'Resolução Extrajudicial Rápida & Confidencial',
    description: 'Método privado de solução de conflitos que proporciona maior agilidade, confidencialidade e segurança jurídica com parecer de especialistas, reduzindo os impactos danosos e a morosidade do Judiciário.',
    extendedText: 'Atuação em câmaras arbitrais de prestígio para disputas societárias, contratuais e patrimoniais de alta envergadura.'
  },
  {
    id: 'gestao-imobiliaria',
    number: '06',
    title: 'Gestão Jurídica Imobiliária',
    subtitle: 'Proteção & Valorização de Ativos Imobiliários',
    description: 'Estruturação jurídica de ativos imobiliários para compradores, vendedores, investidores, construtoras e incorporadoras com foco na blindagem de riscos e valorização patrimonial.',
    extendedText: 'Atuação estratégica em due diligence aquisitiva, regularização fundiária, loteamentos e operações imobiliárias estruturadas.'
  },
  {
    id: 'gestao-empresarial',
    number: '07',
    title: 'Gestão Jurídica Empresarial',
    subtitle: 'Governança & Suporte Estratégico',
    description: 'Estruturação jurídica de empresas e processos, governança corporativa, conformidade normativa, sucessão empresarial e suporte jurídico especializado à tomada de decisão executiva.',
    extendedText: 'Soluções desenvolvidas para fortalecer negócios, mitigar passivos trabalhistas e tributários e impulsionar a longevidade corporativa.'
  },
  {
    id: 'gestao-juridica-40',
    number: '08',
    title: 'Gestão Jurídica 4.0',
    subtitle: 'Organizacional & Judicial',
    description: 'Integração entre tecnologia, inteligência jurídica, gestão estratégica e inovação aplicada à advocacia de vanguarda para empresas de variados portes e famílias com patrimônio consolidado.',
    extendedText: 'Diagnóstico Situacional Estratégico com auditoria de informações, mapeamento de vulnerabilidades e condução judicial combativa.'
  },
  {
    id: 'gestao-projetos',
    number: '09',
    title: 'Gestão Estratégica de Projetos',
    subtitle: 'Acompanhamento do Início à Conclusão',
    description: 'Planejamento, organização, conformidade normativa e acompanhamento jurídico rigoroso de projetos patrimoniais, societários e de expansão empresarial durante todas as etapas de implantação.'
  },
  {
    id: 'gestao-documental',
    number: '10',
    title: 'Gestão Jurídica Documental',
    subtitle: 'Padronização & Segurança da Informação',
    description: 'Gestão jurídica de documentos, organização, elaboração, análise, alteração e padronização jurídica estratégica para garantir segurança da informação e facilidade de gestão.'
  },
  {
    id: 'gestao-negocios',
    number: '11',
    title: 'Gestão Estratégica de Negócios',
    subtitle: 'Suporte a Investimentos & M&A',
    description: 'Suporte jurídico especializado para decisões empresariais, reorganização e proteção de ativos, expansão de negócios, financiamentos e captação de investimentos.'
  },
  {
    id: 'gestao-administrativa',
    number: '12',
    title: 'Gestão Jurídica Administrativa',
    subtitle: 'Eficiência Operacional & Compliance',
    description: 'Consultoria jurídica estratégica de processos administrativos voltada à organização, conformidade legal, redução de despesas e segurança operacional.'
  },
  {
    id: 'consulta-digital',
    number: '13',
    title: 'Consulta Digital Brasil',
    subtitle: 'Atendimento 100% Digital com Hora Marcada',
    description: 'Atendimento jurídico especializado 100% digital, em todo o Brasil, com a mesma excelência centenária do atendimento presencial, com máxima confidencialidade e conforto.'
  },
  {
    id: 'academia-leao-ferreira',
    number: '14',
    title: 'Academia Leão Ferreira',
    subtitle: 'Centro de Estudos Jurídicos Superiores',
    description: 'Órgão cultural da Aldo Leão Advocacia Estratégica dedicado à capacitação, publicação de livros digitais, artigos especializados, mentorias e difusão da alta cultura jurídica.'
  }
];

const DEFAULT_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    type: 'artigo',
    title: 'A Nova Disciplina do ITCMD e o Impacto Imediato na Estruturação de Holdings Familiares',
    area: 'Planejamento Patrimonial',
    date: '10 de Outubro de 2026',
    readTime: '6 min de leitura',
    slug: 'itcmd-holding-familiar',
    excerpt: 'Com a progressividade obrigatória de alíquotas do ITCMD de até 16% em diversos estados, o custo da inércia sucessória tornou-se exponencial. Como antecipar a doação com segurança jurídica.',
    content: `A recente evolução da legislação tributária estadual e os entendimentos firmados no Supremo Tribunal Federal impuseram uma nova realidade às famílias de alto patrimônio no Brasil. A elevação das alíquotas de ITCMD e a taxação progressiva de heranças e doações exigem que patriarcas e matriarcas abandonem a postura passiva.

Ao estruturar uma Holding Familiar com cisão patrimonial e governança antecipada, é possível não apenas mitigar o impacto tributário direto de inventários conturbados, mas assegurar a perpetuidade dos ativos operacionais e imobiliários contra litígios sucessórios e contingências conjugais de herdeiros.

Pontos críticos avaliados pelo Dr. Aldo Leão:
1. Cláusulas de incomunicabilidade e inalienabilidade com eficácia reforçada.
2. Reserva vitalícia de usufruto com poderes irrestritos de administração.
3. Acordo parassocial de quotistas regulando direito de preferência e resolução de impasses.

A inércia não é prudência; é exposição desnecessária de um legado construído ao longo de décadas.`
  },
  {
    id: 'pub-2',
    type: 'noticia',
    title: 'STJ Reconhece Ilegalidade de Redirecionamento de Execução Fiscal sem Prova de Dolo',
    area: 'Direito Empresarial',
    date: '04 de Outubro de 2026',
    readTime: '4 min de leitura',
    slug: 'stj-redirecionamento-fiscal',
    excerpt: 'Decisão unânime da Primeira Seção reafirma que o mero inadimplemento de tributos não autoriza a invasão do patrimônio pessoal dos administradores sob o art. 135 do CTN.',
    content: `Em julgamento histórico, o Superior Tribunal de Justiça consolidou a aplicação estrita das teses firmadas nos Temas 962 e 981. O tribunal determinou a desconstituição de penhoras online realizadas contra pessoas físicas que não exerceram atos de gestão com dolo ou excesso de poderes comprovados.

A decisão reforça a necessidade de blindagem preventiva de ativos lícitos e a relevância de estruturas societárias segregadas para evitar constrangimentos a dirigentes corporativos.`
  },
  {
    id: 'pub-3',
    type: 'artigo',
    title: 'Os Sete Cuidados Jurídicos Fundamentais na Aquisição de Imóveis de Alto Padrão',
    area: 'Direito Imobiliário',
    date: '28 de Setembro de 2026',
    readTime: '7 min de leitura',
    slug: 'cuidados-compra-imovel',
    excerpt: 'Análise minuciosa de certidões, cadeia dominial vintenária, passivos trabalhistas e fiscais ocultos do vendedor para afastar em definitivo o risco de fraude contra credores.',
    content: `A compra de ativos imobiliários exige muito mais do que a simples checagem da matrícula atualizada. A complexidade do sistema jurídico brasileiro impõe a realização de Due Diligence Imobiliária completa, abrangendo certidões de distribuição de feitos cíveis, trabalhistas, federais e ambientais de todos os alienantes anteriores dentro do prazo decadencial.

A assessoria jurídica especializada da Aldo Leão assegura a higidez do investimento e a tranquilidade registral do adquirente.`
  },
  {
    id: 'pub-4',
    type: 'noticia',
    title: 'Governança Familiar: Pesquisa Revela que Apenas 5% das Empresas Sobrevivem à 3ª Geração',
    area: 'Planejamento Patrimonial',
    date: '15 de Setembro de 2026',
    readTime: '5 min de leitura',
    slug: 'governanca-familiar-terceira-geracao',
    excerpt: 'Falta de planejamento sucessório em vida e inexistência de acordo de acionistas respondem pela expressiva taxa de mortalidade empresarial no país.',
    content: `Dados compilados por institutos empresariais confirmam que 90% das empresas no Brasil são de perfil familiar e geram mais de 60% do PIB nacional. No entanto, a desarmonia entre herdeiros e a falta de profissionalização da sucessão geram o colapso dos negócios logo após o falecimento do fundador.

A Aldo Leão Advocacia Estratégica, fundada em 1908 e já consolidada em sua terceira geração desde 1986, exemplifica na prática o poder da continuidade planejada e da advocacia estratégica 4.0.`
  },
  {
    id: 'pub-5',
    type: 'artigo',
    title: 'Compliance Consumerista como Escudo Contra Multas e Danos Reputacionais',
    area: 'Relações de Consumo',
    date: '02 de Setembro de 2026',
    readTime: '5 min de leitura',
    slug: 'compliance-consumerista-mitigacao',
    excerpt: 'Como a revisão preventiva de termos de uso, contratos de adesão e práticas de SAC reduz em até 70% as ações indenizatórias perante os Juizados Especiais Cíveis.',
    content: `Empresas que atuam no varejo e prestação de serviços enfrentam custos crescentes com litígios consumeristas em massa. A implementação de governança e auditoria preventiva nas rotinas de atendimento permite neutralizar causas de pedir recorrentes, blindando o fluxo de caixa corporativo.`
  },
  {
    id: 'pub-6',
    type: 'artigo',
    title: 'Cláusulas Restritivas na Doação com Reserva de Usufruto: Inalienabilidade e Incomunicabilidade',
    area: 'Direito Civil',
    date: '20 de Agosto de 2026',
    readTime: '8 min de leitura',
    slug: 'clausulas-doacao-usufruto',
    excerpt: 'Mecanismos contratuais avançados para garantir que os pais permaneçam com o poder total decisório e que os bens nunca se comuniquem com cônjuges de herdeiros.',
    content: `Na estruturação da Holding Familiar e do Planejamento 4.0, a doação de quotas com reserva de usufruto permite aos genitores manter os direitos políticos, voto qualificado (Golden Share) e percepção integral de dividendos em vida, resguardando o legado com inalienabilidade e impenhorabilidade.`
  },
  {
    id: 'pub-7',
    type: 'noticia',
    title: 'Reforma Tributária e a Tributação Progressiva de Heranças: O Que Muda para Famílias Empresárias',
    area: 'Planejamento Patrimonial',
    date: '10 de Agosto de 2026',
    readTime: '5 min de leitura',
    slug: 'reforma-tributaria-herancas',
    excerpt: 'A Emenda Constitucional da Reforma Tributária fixou a progressividade obrigatória do ITCMD com impacto direto no patrimônio familiar.',
    content: `Com a obrigatoriedade da progressividade do ITCMD em todos os estados da federação, o planejamento sucessório via Holding Familiar tornou-se um imperativo urgente para mitigar custos tributários astronômicos no inventário.`
  },
  {
    id: 'pub-8',
    type: 'artigo',
    title: 'A Proteção Patrimonial de Bens Imóveis Rurais e Agronegócio Familiar',
    area: 'Direito Imobiliário',
    date: '01 de Agosto de 2026',
    readTime: '7 min de leitura',
    slug: 'protecao-patrimonial-rural',
    excerpt: 'Estratégias societárias para segregar riscos da atividade agropecuária e perpetuar fazendas e terras familiares por gerações.',
    content: `O agronegócio envolve riscos climáticos, contratuais e de mercado. A criação de uma holding imobiliária rural segregada da empresa operacional rural resguarda a terra nua de eventuais contingências da produção.`
  },
  {
    id: 'pub-9',
    type: 'noticia',
    title: 'Tribunais Confirmam Validade da Golden Share em Holdings Familiares',
    area: 'Direito Empresarial',
    date: '22 de Julho de 2026',
    readTime: '4 min de leitura',
    slug: 'validade-golden-share',
    excerpt: 'Adoção de ações preferenciais de classe especial garante aos patriarcas o poder de veto em decisões estratégicas fundamentais.',
    content: `A jurisprudência tem referendado a utilização da Golden Share em sociedades empresárias familiares, garantindo que os fundadores preservem o controle e veto sobre venda de ativos e alteração do contrato social.`
  },
  {
    id: 'pub-10',
    type: 'artigo',
    title: 'Contratos Estratégicos e a Prevenção de Conflitos Societários',
    area: 'Direito Civil',
    date: '15 de Julho de 2026',
    readTime: '6 min de leitura',
    slug: 'contratos-estrategicos-prevencao',
    excerpt: 'Como a redação precisa de cláusulas de resolução de impasses (Buy or Sell, Shotgun) pacifica a convivência societária.',
    content: `A previsão de regras claras para a saída de sócios, apuração de haveres e resolução de impasses contratuais previne dissoluções litigiosas prejudiciais aos negócios.`
  },
  {
    id: 'pub-11',
    type: 'noticia',
    title: 'CFOAB Destaca Importância da Advocacia Preventiva na Redução de Litígios Judiciais',
    area: 'Relações de Consumo',
    date: '05 de Julho de 2026',
    readTime: '4 min de leitura',
    slug: 'advocacia-preventiva-oab',
    excerpt: 'Relatório aponta que empresas assessoradas preventivamente têm 80% menos litígios e custos jurídicos.',
    content: `A advocacia preventiva e estratégica consolida-se como o melhor investimento corporativo para empresas que buscam longevidade e segurança jurídica no Brasil.`
  },
  {
    id: 'pub-12',
    type: 'artigo',
    title: 'A Sucessão Digital e a Gestão de Ativos Eletrônicos no Planejamento Patrimonial',
    area: 'Planejamento Patrimonial',
    date: '25 de Junho de 2026',
    readTime: '6 min de leitura',
    slug: 'sucessao-digital-ativos',
    excerpt: 'Como incluir criptoativos, propriedade intelectual digital, marcas e contas no planejamento da Holding Familiar 4.0.',
    content: `A economia digital demanda a inclusão de ativos virtuais, softwares, canais digitais e criptoativos no planejamento sucessório em vida, garantindo transferência segura aos herdeiros.`
  }
];

const DEFAULT_DIGITAL_BOOKS: DigitalBook[] = [
  {
    id: 'livro-1',
    title: 'Planejamento Patrimonial 4.0 & o Alto Risco da Omissão',
    author: 'Dr. Aldo Leão Ferreira Filho',
    area: 'Planejamento Patrimonial & Sucessório',
    description: 'Guia definitivo e prático sobre como constituir a Holding Familiar em vida, eliminar o inventário judicial e evitar a perda de até 40% do patrimônio com ITCMD progressivo, honorários e litígios entre herdeiros.',
    pages: '168 páginas',
    year: '2026',
    isbn: '978-65-89412-01-4',
    format: 'E-Book Digital (PDF) + Edição Impressa',
    downloadAvailable: true,
    downloadCount: '3.420 downloads',
    badge: 'Disponível para Download',
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
    id: 'livro-2',
    title: 'Holding Familiar e Imobiliária',
    author: 'Dr. Aldo Leão Ferreira Filho',
    area: 'Direito Societário e Imobiliário',
    description: 'A modelagem jurídica completa para integralização de bens imóveis no capital social de pessoa jurídica, segregação patrimonial de riscos de locação e economia tributária de até 60% na tributação de aluguéis e vendas.',
    pages: '144 páginas',
    year: '2025',
    isbn: '978-65-89412-02-1',
    format: 'E-Book Digital (PDF) + Edição Impressa',
    downloadAvailable: true,
    downloadCount: '2.890 downloads',
    badge: 'Disponível para Download',
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
    id: 'livro-3',
    title: 'Você tem Patrimônio e deseja protegê-lo juridicamente?',
    author: 'Dr. Aldo Leão Ferreira Filho',
    area: 'Proteção e Blindagem Patrimonial Ética',
    description: 'Manual de estratégias jurídicas preventivas para empresários, produtores rurais, médicos e investidores de alto patrimônio. Como blindar bens de forma lícita antes do surgimento de crises ou passivos.',
    pages: '132 páginas',
    year: '2025',
    isbn: '978-65-89412-03-8',
    format: 'E-Book Digital (PDF) + Edição Impressa',
    downloadAvailable: true,
    downloadCount: '2.140 downloads',
    badge: 'Disponível para Download',
    chapters: [
      'Capítulo 1: A Linha Divisória entre Planejamento Lícito e Fraude à Execução',
      'Capítulo 2: Desconsideração da Personalidade Jurídica: Aplicação do art. 50 do Código Civil',
      'Capítulo 3: Proteção de Ativos do Agronegócio e Maquinários Produtivos',
      'Capítulo 4: Riscos Médicos e Profissionais: Responsabilidade Civil Individual e Patrimônio Familiar',
      'Capítulo 5: Segregação Patrimonial Estratégica e Blindagem Internacional lícita'
    ],
    sampleExcerpt: 'Proteger o patrimônio não é ocultar bens; é estruturá-los legalmente antes que qualquer risco iminente se materialize. O empresário de sucesso não espera a crise chegar para pensar na segurança de sua família...'
  },
  {
    id: 'livro-4',
    title: 'Os Sete Cuidados na Compra do Imóvel',
    author: 'Dr. Aldo Leão Ferreira Filho',
    area: 'Direito Imobiliário & Due Diligence',
    description: 'Checklist prático e indispensável para Due Diligence imobiliária de alta precisão. Como blindar compradores e investidores contra penhoras ocultas, ações de fraude contra credores e nulidades registrais.',
    pages: '116 páginas',
    year: '2024',
    isbn: '978-65-89412-04-5',
    format: 'E-Book Digital (PDF) + Edição Impressa',
    downloadAvailable: true,
    downloadCount: '3.110 downloads',
    badge: 'Disponível para Download',
    chapters: [
      'Cuidado 1: A Matrícula Atualizada e o Histórico Vintenário do Imóvel',
      'Cuidado 2: Certidões de Feitos Ajuizados de Alienantes Anteriores',
      'Cuidado 3: Passivos Fiscais e Trabalhistas Não Averbados',
      'Cuidado 4: Imóveis em Condomínio: Dívidas Propter Rem e Quitação Real',
      'Cuidado 5: Regularidade Urbanística, Ambiental e Habite-se',
      'Cuidado 6: O Perigo da Fraude Contra Credores e o Enunciado 375 do STJ',
      'Cuidado 7: Redação Contratual Protetiva e Registro Imediato da Escritura'
    ],
    sampleExcerpt: 'A certidão negativa do Registro de Imóveis é apenas o primeiro passo. Mais de 38% dos compradores desavisados enfrentam constrições judiciais por passivos do antigo proprietário que poderiam ter sido evitados com uma auditoria jurídica prévia...'
  },
  {
    id: 'livro-5',
    title: 'Síndico Próspero: Administrando o Condomínio em Alta Performance',
    author: 'Dr. Aldo Leão Ferreira Filho',
    area: 'Direito Condominial & Governança',
    description: 'Manual de governança jurídica condominial, mitigação de passivos trabalhistas, cobrança ágil de inadimplência e segurança decisória para síndicos e administradoras.',
    pages: '198 páginas',
    year: '2024',
    isbn: '978-65-89412-05-2',
    format: 'Livro Digital (PDF Gratuito)',
    downloadAvailable: true,
    downloadCount: '1.980 downloads',
    badge: 'Download Gratuito',
    chapters: [
      'Capítulo 1: Responsabilidade Civil e Criminal do Síndico',
      'Capítulo 2: Assembleias Gerais Inatacáveis: Edital, Quórum e Impugnações',
      'Capítulo 3: Cobrança Extrajudicial e Execução Rápida de Despesas Condominiais',
      'Capítulo 4: Terceirização de Serviços e o Risco de Responsabilidade Subsidiária',
      'Capítulo 5: Obras Estruturais e Contratos com Prestadores'
    ],
    sampleExcerpt: 'A administração de condomínios modernos se assemelha à gestão de médias empresas. A falta de amparo jurídico transforma a nobre função do síndico em um polo passivo de litígios e cobranças indenizatórias...'
  },
  {
    id: 'livro-6',
    title: 'LGPD: A Primeira Condenação no Brasil por Compartilhamento Ilegal',
    author: 'Dr. Aldo Leão Ferreira Filho',
    area: 'Proteção de Dados & Compliance Digital',
    description: 'Análise dogmática e processual detalhada da primeira decisão condenatória sob a Lei Geral de Proteção de Dados (Lei 13.709/2018), com manual de adequação corporativa.',
    pages: '154 páginas',
    year: '2024',
    isbn: '978-65-89412-06-9',
    format: 'Livro Digital (PDF Gratuito)',
    downloadAvailable: true,
    downloadCount: '2.450 downloads',
    badge: 'Download Gratuito',
    chapters: [
      'Capítulo 1: O Caso Paradigmático e os Fundamentos da Decisão',
      'Capítulo 2: O Compartilhamento Não Autorizado com Parceiros Comerciais',
      'Capítulo 3: O Dano Moral In Re Ipsa na Violação de Dados Pessoais',
      'Capítulo 4: Políticas de Privacidade, Termos de Consentimento e Legítimo Interesse',
      'Capítulo 5: O Plano de Resposta a Incidentes e Relatório de Impacto (RIPD)'
    ],
    sampleExcerpt: 'A primeira condenação judicial por violação à LGPD no Brasil marcou o encerramento da fase de complacência no tratamento de dados. Empresas que não estruturam sua governança digital respondem objetivamente por vazamentos...'
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

const DEFAULT_CONFIG: SiteConfig = {
  hero: {
    kicker: 'ALDO LEÃO ADVOCACIA ESTRATÉGICA',
    titlePart1: 'TRADIÇÃO JURÍDICA',
    titleHighlight: 'DESDE 1908',
    titlePart2: '· MAIS DE UM SÉCULO DE EXCELÊNCIA',
    description: 'Desde 1908, o escritório de advocacia mais antigo do Brasil une tradição jurídica, experiência e inovação na proteção e perpetuação de legados familiares. Com sede em Porto Alegre e atuação digital em todo o território nacional, o Dr. Aldo Leão representa a terceira geração da família na Advocacia Estratégica (1986), sendo referência em Planejamento Patrimonial 4.0 via Holding Familiar, Proteção Patrimonial e Sucessão Empresarial.',
    tagline: 'EXCELÊNCIA JURÍDICA CENTENÁRIA NA PROTEÇÃO E PERPETUAÇÃO DO SEU LEGADO.',
    foundingYear: '1908',
    experienceYears: '40 Anos',
    oabNumber: 'OAB/RS 22.418',
    yearsExperience: '40 Anos',
    assetsPreserved: 'R$ 2.4B+'
  },
  contact: {
    whatsappNumber: '5551998088998',
    phonePrimary: '(51) 998.088.998',
    phoneSecondary: '(51) 998.078.998',
    emailPrimary: 'aldoleao@hotmail.com',
    emailSecondary: 'aldoleao.adv@gmail.com',
    emailHolding: 'holdingfamiliarbr@gmail.com',
    addressPortoAlegre: 'Av. Cel. Lucas de Oliveira, 1255/502, Bairro Bela Vista, Porto Alegre - RS',
    officeHours: 'De 2ª à 6ª Feira, das 08h30 às 11h30 e das 13h30 às 18h30',
    spAddress: 'Av. Cel. Lucas de Oliveira, 1255/502, Bairro Bela Vista, Porto Alegre - RS (Sede Central)',
    bsbAddress: 'Atendimento Virtual Especializado perante Tribunais Superiores (STF/STJ/CARF)',
    cwbAddress: 'Cobertura Integrada na Região Sul e Atendimento Digital em Todo o Brasil',
    spPhone: '(51) 998.088.998',
    bsbPhone: '(51) 998.078.998',
    cwbPhone: '(51) 998.088.998',
    email: 'aldoleao@hotmail.com'
  },
  founder: {
    name: 'Dr. Aldo Leão',
    fullName: 'Dr. Aldo Leão Ferreira Filho',
    title: 'Head Jurídico da ALDO LEÃO ADVOCACIA ESTRATÉGICA',
    credentials: 'Desde 1986 · Terceira Geração · PUC-RS · Unisinos · IARGS · OAB/RS · Procurador de 20 Municípios',
    photoUrl: '/img/dr-aldo-portrait.jpg',
    bioParagraph1: 'Representando a terceira geração do legado jurídico familiar iniciado em 1908, o Dr. Aldo Leão Ferreira Filho exerce a advocacia estratégica desde 1986, desenvolvendo soluções jurídicas avançadas e legais voltadas à proteção patrimonial, estruturação societária (Holding Familiar), governança profissional, sucessão empresarial e perpetuação de legados familiares.',
    bioParagraph2: 'Sua atuação combina tradição jurídica centenária, inteligência estratégica e visão preventiva, proporcionando aos clientes estruturas jurídicas personalizadas, capazes de proteger patrimônios, fortalecer empresas e assegurar a continuidade das futuras gerações. Como especialista em Planejamento Patrimonial e Empresarial 4.0 via Holding Familiar, dedica-se ao desenvolvimento de soluções jurídicas modernas, estruturadas para reduzir riscos, evitar a alta perda patrimonial dos herdeiros no inventário, promover a proteção patrimonial e empresarial com a segurança jurídica inteligente e permitir a organização patrimonial e empresarial de forma estratégica.',
    specialties: [
      'Planejamento Patrimonial e Empresarial 4.0 (via Holding Familiar)',
      'Direito Imobiliário e Gestão de Ativos',
      'Direito Empresarial e Societário',
      'Direito Civil, Família e Sucessões',
      'Relações de Consumo e Compliance Consumerista'
    ],
    differences: [
      'Terceira geração do legado jurídico familiar iniciado em 1908 pelo Prof. Dr. Arnaldo da Silva Ferreira.',
      'Mais de quatro décadas de advocacia estratégica ininterrupta do Dr. Aldo Leão (1986).',
      'Referência nacional em Holding Familiar (Planejamento Patrimonial e Empresarial 4.0).',
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
    title: 'PLANEJAMENTO PATRIMONIAL 4.0',
    callout1: 'QUE LEGADO VOCÊ VAI DEIXAR AOS SEUS HERDEIROS? A Alta Perda Patrimonial do Inventário ou o Planejamento Patrimonial 4.0 que evita o Inventário?',
    callout2: 'EVITE A ALTA PERDA PATRIMONIAL E FINANCEIRA DOS SEUS FILHOS NO INVENTÁRIO.',
    boxTitle: 'O INVENTÁRIO GERA UMA ALTA PERDA PATRIMONIAL DOS HERDEIROS NO INVENTÁRIO',
    boxText: 'O inventário gera uma Alta Perda Patrimonial e Financeira dos herdeiros em média de 40% do Patrimônio Inventário, em média, que é evitada pelo Planejamento Patrimonial 4.0, que vai aumentar por causa do aumento do ITCMD.',
    rightCardTitle: 'PERDA PATRIMONIAL E FINANCEIRA DOS HERDEIROS NO INVENTÁRIO',
    rightCardText: 'Em média a Perda Patrimonial e Financeira dos herdeiros é de 40% do Patrimônio Inventariado, a qual vai aumentar com a majoração da alíquota do ITCMD de 8% para 16% (Projeto de Resolução do Senado Federal N. 57/19), 20% (Confaz) ou 30% (Governo Federal).',
    sampleAcquisition: 'R$ 1.000.000,00',
    sampleMarket: 'R$ 1.500.000,00',
    sampleCapitalGain: 'R$ 500.000,00',
    inventoryTotal: 'R$ 297.000,00',
    holdingTotal: 'R$ 133.000,00',
    savingsAmount: 'R$ 164.000,00',
    savingsPercentage: '55,21%'
  },
  nationalPresence: {
    card1Text: 'Atuação Digital no Brasil',
    card2Text: 'Infraestrutura Tecnológica de última geração',
    card3Text: 'Comodidade, Segurança, Confidencialidade, Sigilo e Economia para cada cliente.'
  },
  centennialLegacy: {
    goldKicker: 'EXCELÊNCIA JURÍDICA FAMILIAR',
    title: 'O LEGADO CENTENÁRIO',
    subtitle: 'Desde 1908',
    sub1908: 'Prof. Dr. Arnaldo da Silva Ferreira',
    sub1935: 'Dr. Mário de Castilhos Ferreira e Dr. Ney de Castilhos Ferreira',
    sub1915: 'Prof. Dr. Aldo Leão Ferreira',
    sub1986: 'Prof. Dr. Aldo Leão Ferreira Filho'
  }
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

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('aldoleao_site_config_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.founder?.photoUrl || parsed.founder.photoUrl.includes('1791572566625')) {
          parsed.founder = { ...parsed.founder, photoUrl: '/img/dr-aldo-portrait.jpg' };
        }
        if (parsed.digitalBooks && Array.isArray(parsed.digitalBooks)) {
          parsed.digitalBooks = parsed.digitalBooks.map((b: DigitalBook) => ({
            ...b,
            downloadAvailable: true,
            format: 'Livro Digital (PDF Gratuito)',
            badge: 'Download Gratuito'
          }));
        }
        return parsed;
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

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aldoleao_site_config_v4', JSON.stringify(siteConfig));
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
    setSiteConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetSiteConfigToDefault = () => {
    setSiteConfig(DEFAULT_CONFIG);
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
