export type HarmonyMode = 'analogic' | 'complement' | 'triad' | 'monochrome';

export interface ColorDetails {
  hex: string;
  name: string;
  rgb: string;
  hsl: string;
}

export interface ContrastResult {
  ratio: number;
  aaNormal: boolean;  // >= 4.5
  aaLarge: boolean;   // >= 3.0
  aaaNormal: boolean; // >= 7.0
  aaaLarge: boolean;  // >= 4.5
}

export interface SavedCombination {
  id: string;
  label: string;
  bgColor: string;
  textColor: string;
  bgName: string;
  textName: string;
  ratio: number;
  createdAt: string;
}