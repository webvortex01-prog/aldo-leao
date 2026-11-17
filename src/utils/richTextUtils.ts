import React from 'react';

/**
 * Normaliza e formata qualquer texto (simples, digitado com Enter ou com tags HTML do editor rico)
 * garantindo que:
 * 1. Códigos HTML escapados (&lt;span...&gt;) sejam convertidos em elementos HTML reais estilizados,
 *    eliminando de vez a exibição feia de códigos na tela do cliente.
 * 2. Múltiplos parágrafos (Enter duplo ou tags <p>) tenham espaçamento nítido e elegante entre si.
 * 3. Novas linhas simples (Enter único ou <br>) quebrem a linha perfeitamente sem unir todo o texto
 *    num parágrafo único.
 * 4. Alinhamentos (justificado, esquerda, centro, direita), cores e negritos sejam mantidos.
 */
export function formatRichHtml(raw?: string | null): string {
  if (!raw) return '';
  let text = String(raw).trim();
  if (!text) return '';

  // 1. Desescapa tags HTML legítimas que possam ter sido salvas como texto escapado
  if (/&lt;\/?(span|strong|b|i|em|u|p|div|br|font|mark|h[1-6]|ul|ol|li|table|tr|td|th|a)\b/i.test(text)) {
    text = text
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&');
  }

  // 1.1 Converte tags legadas <font color="..."> para <span style="color: ... !important;">
  text = text.replace(/<font\s+color=["']?([^"'>]+)["']?>([\s\S]*?)<\/font>/gi, (_match, colorVal, content) => {
    return `<span style="color: ${colorVal} !important;" data-color="${colorVal}">${content}</span>`;
  });

  // 1.2 Garante que qualquer propriedade color em style inline tenha !important para sobrepor classes Tailwind como text-slate-200 ou text-white
  text = text.replace(/color:\s*([^;!"]+)(?:!important)?/gi, (_match, colorVal) => {
    return `color: ${colorVal.trim()} !important`;
  });

  // 2. Se o texto não possui tags de bloco HTML (<p>, <div>, <h1>-<h6>, <table>, <ul>, <ol>)
  const hasBlockTags = /<(?:p|div|h[1-6]|table|ul|ol|blockquote)\b/i.test(text);

  if (!hasBlockTags) {
    // Normaliza quebras de linha Windows/Mac/Linux
    const normalized = text.replace(/\r\n|\r/g, '\n');

    // Divide em blocos por dois ou mais enters (parágrafos distintos)
    const blocks = normalized.split(/\n{2,}/);

    if (blocks.length > 1) {
      return blocks
        .map((block) => {
          const cleanBlock = block.trim();
          if (!cleanBlock) return '';
          // Converte enter simples dentro do bloco em <br />
          const withLineBreaks = cleanBlock.replace(/\n/g, '<br />');
          return `<p class="rich-paragraph mb-3.5 leading-relaxed">${withLineBreaks}</p>`;
        })
        .filter(Boolean)
        .join('');
    }

    // Apenas uma quebra simples de linha
    return text.replace(/\n/g, '<br />');
  }

  // 3. Caso possua tags HTML estruturais:
  // Protege tabelas e listas
  const protectedBlocks: string[] = [];
  text = text.replace(/<(table|ul|ol)\b[\s\S]*?<\/\1>/gi, (match) => {
    const cleanedBlock = match
      .replace(/>\s+\n\s*</g, '><')
      .replace(/\r\n|\r|\n/g, ' ');
    protectedBlocks.push(cleanedBlock);
    return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
  });

  // Converte quebras duplas de linha soltas fora de tags de bloco em parágrafos
  text = text.replace(/(<\/p>|<\/div>|<\/h[1-6]>)\s*(?:\r\n|\r|\n)+/gi, '$1');
  text = text.replace(/\n{2,}/g, '<div class="rich-spacer my-3"></div>');
  text = text.replace(/\r\n|\r|\n/g, '<br />');

  // Restaura blocos protegidos (tabelas, listas)
  text = text.replace(/__PROTECTED_BLOCK_(\d+)__/g, (_, idx) => protectedBlocks[Number(idx)] || '');

  return text;
}

/**
 * Componente oficial para renderizar texto rico com suporte total a HTML,
 * parágrafos semânticos, quebras de linha nítidas e alinhamentos.
 */
export const RichTextRenderer: React.FC<{
  content?: string | null;
  className?: string;
  as?: 'div' | 'span' | 'p';
}> = ({ content, className = '', as: Tag = 'div' }) => {
  if (!content) return null;
  const html = formatRichHtml(content);
  return React.createElement(Tag, {
    className: `publication-rich-content ${className}`,
    dangerouslySetInnerHTML: { __html: html },
  });
};
