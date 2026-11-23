import type { ContrastResult } from '../types/color';

// Garante que o HEX tenha 6 caracteres válidos (ex: #FFF -> #FFFFFF)
export function normalizeHex(hex: string): string {
  const clean = hex.replace('#', '').trim();
  if (/^[0-9A-Fa-f]{3}$/.test(clean)) {
    return (
      '#' +
      clean
        .split('')
        .map((char) => char + char)
        .join('')
        .toUpperCase()
    );
  }
  if (/^[0-9A-Fa-f]{6}$/.test(clean)) {
    return '#' + clean.toUpperCase();
  }
  return '#000000';
}

export function isValidHex(hex: string): boolean {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex.trim());
}

// Converte HEX para RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = normalizeHex(hex).replace('#', '');
  const num = parseInt(normalized, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Calcula a luminância relativa segundo a norma oficial W3C WCAG 2.1
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const sRGB = channel / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calcula a razão de contraste entre duas cores e retorna os selos AA/AAA
export function calculateContrast(bgHex: string, textHex: string): ContrastResult {
  const bgRgb = hexToRgb(bgHex);
  const textRgb = hexToRgb(textHex);

  const lum1 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const lum2 = getLuminance(textRgb.r, textRgb.g, textRgb.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  const rawRatio = (brightest + 0.05) / (darkest + 0.05);
  const ratio = Math.round(rawRatio * 100) / 100;

  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaaNormal: ratio >= 7.0,
    aaaLarge: ratio >= 4.5,
  };
}
// Sugere automaticamente texto claro ou escuro com melhor leitura para o fundo escolhido
export function suggestAccessibleText(bgHex: string): string {
  const whiteContrast = calculateContrast(bgHex, '#FFFFFF').ratio;
  const darkContrast = calculateContrast(bgHex, '#0F172A').ratio;
  return whiteContrast >= darkContrast ? '#FFFFFF' : '#0F172A';
}

// Gera uma combinação aleatória legível para inspiração rápida
export function generateRandomAccessiblePair(): { bg: string; text: string } {
  const presets = [
    { bg: '#0F172A', text: '#F8FAFC' },
    { bg: '#FEF3C7', text: '#78350F' },
    { bg: '#1E1B4B', text: '#A5B4FC' },
    { bg: '#ECFDF5', text: '#065F46' },
    { bg: '#18181B', text: '#FACC15' },
    { bg: '#FFF1F2', text: '#9F1239' },
    { bg: '#0C4A6E', text: '#E0F2FE' },
    { bg: '#FAF5FF', text: '#581C87' },
  ];
  return presets[Math.floor(Math.random() * presets.length)];
}