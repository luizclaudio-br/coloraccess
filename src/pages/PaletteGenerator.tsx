import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import type { ColorDetails, HarmonyMode } from '../types/color';
import { fetchColorScheme } from '../services/colorApi';
import { calculateContrast } from '../utils/contrast';
import { useColorContext } from '../context/ColorContext';
import { ColorPickerInput } from '../components/ColorPickerInput';
import { ColorSwatchCard } from '../components/ColorSwatchCard';

const HARMONY_OPTIONS: { value: HarmonyMode; label: string }[] = [
  { value: 'analogic', label: 'Análoga (Tons vizinhos)' },
  { value: 'complement', label: 'Complementar (Opostos)' },
  { value: 'triad', label: 'Tríade (Equilibrada)' },
  { value: 'monochrome', label: 'Monocromática (Mesma base)' },
];

export function PaletteGenerator() {
  const { bgColor, setBgColor, setTextColor, applyTheme } = useColorContext();
  const navigate = useNavigate();

  const [seedColor, setSeedColor] = useState(bgColor);
  const [mode, setMode] = useState<HarmonyMode>('analogic');
  const [palette, setPalette] = useState<ColorDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const colors = await fetchColorScheme(seedColor, mode);
        if (active) setPalette(colors);
      } catch {
        if (active) setError('Erro ao buscar paleta na The Color API.');
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [seedColor, mode]);

  // Cruza todas as cores da paleta gerada e filtra pares com contraste AA (>= 4.5)
  const validPairs = useMemo(() => {
    const pairs: { bg: ColorDetails; text: ColorDetails; ratio: number }[] = [];
    for (let i = 0; i < palette.length; i++) {
      for (let j = 0; j < palette.length; j++) {
        if (i === j) continue;
        const result = calculateContrast(palette[i].hex, palette[j].hex);
        if (result.aaNormal) {
          pairs.push({
            bg: palette[i],
            text: palette[j],
            ratio: result.ratio,
          });
        }
      }
    }
    return pairs.sort((a, b) => b.ratio - a.ratio);
  }, [palette]);

  const handleTestPair = (bg: string, text: string) => {
    applyTheme(bg, text);
    navigate('/');
  };

  return (
    <div className="page-section">
      <div className="page-header">
        <h1>Gerador de Paletas Harmônicas</h1>
        <p>
          Escolha uma cor principal para descobrir combinações que harmonizam entre
          si e veja na hora quais pares oferecem boa leitura.
        </p>
      </div>

      <div className="generator-toolbar">
        <ColorPickerInput
          label="Cor Base da Paleta"
          value={seedColor}
          onChange={setSeedColor}
        />

        <div className="picker-card">
          <span className="picker-label">Regra de Harmonia</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as HarmonyMode)}
            className="harmony-select"
          >
            {HARMONY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="status-msg">Consultando harmonia na The Color API...</p>}
      {error && <p className="status-msg error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="palette-grid">
            {palette.map((color, index) => (
              <ColorSwatchCard
                key={`${color.hex}-${index}`}
                color={color}
                onSelectAsBg={(hex) => {
                  setBgColor(hex);
                  navigate('/');
                }}
                onSelectAsText={(hex) => {
                  setTextColor(hex);
                  navigate('/');
                }}
              />
            ))}
          </div>

          <div className="subsection">
            <h2>
              <Sparkles size={20} /> Combinações Fáceis de Ler Nesta Paleta ({validPairs.length})
            </h2>

            {validPairs.length === 0 ? (
              <p className="muted-text">
                As cores geradas neste estilo ficaram muito próximas em brilho.
                Experimente trocar a regra acima para <strong>Complementar</strong> ou{' '}
                <strong>Monocromática</strong> para obter pares mais nítidos.
              </p>
            ) : (
              <div className="valid-pairs-grid">
                {validPairs.map((pair, idx) => (
                  <div
                    key={idx}
                    className="pair-chip"
                    style={{ backgroundColor: pair.bg.hex, color: pair.text.hex }}
                  >
                    <div>
                      <strong>
                        {pair.bg.name} + {pair.text.name}
                      </strong>
                      <small>
                        <CheckCircle2 size={14} /> Leitura aprovada ({pair.ratio.toFixed(1)}:1)
                      </small>
                    </div>
                    <button
                      type="button"
                      className="btn-mini"
                      onClick={() => handleTestPair(pair.bg.hex, pair.text.hex)}
                    >
                      Testar Par
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}