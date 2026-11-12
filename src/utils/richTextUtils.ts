import React from 'react';

/**
 * Normaliza e formata qualquer texto (simples ou com tags HTML do editor rico)
 * garantindo que quebras de linha (\n), múltiplos parágrafos, alinhamentos (justificado,
 * centralizado, direita, esquerda), cores, negritos e tabelas sejam sempre preservados
 * sem colapsar em um único parágrafo.
 */
export function formatRichHtml(raw?: string | null): string {
  if (!raw) return '';
  let text = String(raw);

  // Se não possui nenhuma tag HTML, converte quebras de linha diretamente para <br />
  if (!/<[a-z][\s\S]*>/i.test(text)) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\r\n|\r|\n/g, '<br />');
  }

  // Protege blocos de tabela e listas para não injetar <br /> entre tags estruturais (<tr>, <td>, <li>, etc.)
  const protectedBlocks: string[] = [];
  text = text.replace(/<(table|ul|ol)\b[\s\S]*?<\/\1>/gi, (match) => {
    const cleanedBlock = match
      .replace(/>\s+\n\s*</g, '><')
      .replace(/\r\n|\r|\n/g, ' ');
    protectedBlocks.push(cleanedBlock);
    return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
  });

  // Remove quebras de linha puramente estruturais imediatamente após fechamento de blocos HTML
  // (ex: </p>\n<p> ou </h3>\n<p>) para não duplicar espaçamento de blocos que já possuem margem
  text = text.replace(
    /(<\/(?:p|div|h[1-6]|blockquote|table|ul|ol|li|tr|thead|tbody)>|<br\s*\/?>)\s*(?:\r\n|\r|\n)+/gi,
    '$1'
  );

  // Converte todas as quebras de linha restantes (digitadas pelo usuário dentro de textos ou divs) em <br />
  text = text.replace(/\r\n|\r|\n/g, '<br />');

  // Restaura blocos protegidos (tabelas, listas)
  text = text.replace(/__PROTECTED_BLOCK_(\d+)__/g, (_, idx) => protectedBlocks[Number(idx)] || '');

  return text;
}

/**
 * Componente auxiliar para renderizar texto rico com suporte total a HTML,
 * parágrafos, quebras de linha e alinhamentos.
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
