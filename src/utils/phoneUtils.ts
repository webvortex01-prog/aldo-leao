/**
 * Utilitários de Formatação e Sanitização de Telefones e WhatsApp
 * Aldo Leão Advocacia Estratégica
 * 
 * Garante que nenhum telefone apareça com pontos (como se fosse CPF).
 * Padrão Nacional Oficial: (51) 99808-8998 e (51) 99807-8998
 */

export const cleanAndFormatPhone = (
  val: string | undefined | null,
  fallback: string = '(51) 99808-8998'
): string => {
  if (!val) return fallback;

  // Remove qualquer ponto imediatamente para nunca parecer CPF
  const withoutDots = val.replace(/\./g, '').trim();
  const digits = withoutDots.replace(/\D/g, '');

  if (digits.length === 11) {
    // Celular padrão BR: (51) 99808-8998
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 13 && digits.startsWith('55')) {
    // DDI 55 + DDD + 9 dígitos: (51) 99808-8998
    return `(${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  }

  if (digits.length === 10) {
    // Fixo padrão BR: (51) 3333-4444
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 12 && digits.startsWith('55')) {
    // DDI 55 + DDD + 8 dígitos
    return `(${digits.slice(2, 4)}) ${digits.slice(4, 8)}-${digits.slice(8)}`;
  }

  // Se já for algo como "(51) 99808-8998", retorna limpo sem pontos
  return withoutDots || fallback;
};

export const getCleanWhatsAppDigits = (
  val: string | undefined | null,
  fallback: string = '5551998088998'
): string => {
  if (!val) return fallback;
  const digits = val.replace(/\D/g, '');
  if (digits.length === 11) {
    return `55${digits}`;
  }
  if (digits.length === 13 && digits.startsWith('55')) {
    return digits;
  }
  return digits || fallback;
};
