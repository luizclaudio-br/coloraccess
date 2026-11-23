import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { SavedCombination } from '../types/color';
import { normalizeHex } from '../utils/contrast';

interface ColorContextType {
  bgColor: string;
  textColor: string;
  setBgColor: (hex: string) => void;
  setTextColor: (hex: string) => void;
  applyTheme: (bg: string, text: string) => void;
  swapColors: () => void;
  savedList: SavedCombination[];
  saveCombination: (item: Omit<SavedCombination, 'id' | 'createdAt'>) => void;
  removeCombination: (id: string) => void;
}

const STORAGE_KEY = 'coloraccess_saved_v1';

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [bgColor, setBgColorState] = useState<string>('#0F172A');
  const [textColor, setTextColorState] = useState<string>('#F8FAFC');

  const [savedList, setSavedList] = useState<SavedCombination[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persiste automaticamente no navegador sempre que a lista de salvos mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedList));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }, [savedList]);

  const setBgColor = (hex: string) => {
    setBgColorState(normalizeHex(hex));
  };

  const setTextColor = (hex: string) => {
    setTextColorState(normalizeHex(hex));
  };

  const applyTheme = (bg: string, text: string) => {
    setBgColorState(normalizeHex(bg));
    setTextColorState(normalizeHex(text));
  };

  const swapColors = () => {
    setBgColorState(textColor);
    setTextColorState(bgColor);
  };

  const saveCombination = (item: Omit<SavedCombination, 'id' | 'createdAt'>) => {
    const newEntry: SavedCombination = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    setSavedList((prev) => [newEntry, ...prev]);
  };

  const removeCombination = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ColorContext.Provider
      value={{
        bgColor,
        textColor,
        setBgColor,
        setTextColor,
        applyTheme,
        swapColors,
        savedList,
        saveCombination,
        removeCombination,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}

export function useColorContext(): ColorContextType {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColorContext deve ser usado dentro de um ColorProvider');
  }
  return context;
}