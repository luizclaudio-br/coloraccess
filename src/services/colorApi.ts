import type { ColorDetails, HarmonyMode } from '../types/color';
import { normalizeHex } from '../utils/contrast';

const BASE_URL = 'https://www.thecolorapi.com';

interface ApiColorResponse {
  hex: { value: string };
  name: { value: string };
  rgb: { value: string };
  hsl: { value: string };
}

interface ApiSchemeResponse {
  colors: ApiColorResponse[];
}

// Busca os detalhes e o nome oficial de uma única cor
export async function fetchColorDetails(hex: string): Promise<ColorDetails> {
  const cleanHex = normalizeHex(hex).replace('#', '');
  const response = await fetch(`${BASE_URL}/id?hex=${cleanHex}`);

  if (!response.ok) {
    throw new Error('Não foi possível consultar os dados da cor.');
  }

  const data: ApiColorResponse = await response.json();

  return {
    hex: data.hex.value,
    name: data.name.value,
    rgb: data.rgb.value,
    hsl: data.hsl.value,
  };
}

// Gera uma paleta harmônica de 5 cores a partir de uma cor base
export async function fetchColorScheme(
  hex: string,
  mode: HarmonyMode
): Promise<ColorDetails[]> {
  const cleanHex = normalizeHex(hex).replace('#', '');
  const response = await fetch(
    `${BASE_URL}/scheme?hex=${cleanHex}&mode=${mode}&count=5`
  );

  if (!response.ok) {
    throw new Error('Não foi possível gerar a paleta harmônica.');
  }

  const data: ApiSchemeResponse = await response.json();

  return data.colors.map((item) => ({
    hex: item.hex.value,
    name: item.name.value,
    rgb: item.rgb.value,
    hsl: item.hsl.value,
  }));
}