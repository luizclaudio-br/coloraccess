import { useState, useMemo } from 'react';
import { Eye, Info, ArrowLeftRight } from 'lucide-react';
import { useColorContext } from '../context/ColorContext';
import { calculateContrast } from '../utils/contrast';
import { ColorPickerInput } from '../components/ColorPickerInput';
import { LiveUIPreview } from '../components/LiveUIPreview';

type VisionMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

const VISION_PROFILES: {
  id: VisionMode;
  label: string;
  tag: string;
  description: string;
}[] = [
  {
    id: 'normal',
    label: 'Visão Padrão',
    tag: 'Cores originais',
    description: 'Exibição normal das cores exatamente como você selecionou.',
  },
  {
    id: 'protanopia',
    label: 'Protanopia',
    tag: 'Sem percepção do vermelho',
    description:
      'Tons de vermelho e verde ficam parecidos e mais apagados. Se a leitura depender só da cor, o texto desaparece.',
  },
  {
    id: 'deuteranopia',
    label: 'Deuteranopia',
    tag: 'Sem percepção do verde',
    description:
      'É o tipo mais comum de daltonismo. Verdes e vermelhos se misturam em tons amarelados ou amarronzados.',
  },
  {
    id: 'tritanopia',
    label: 'Tritanopia',
    tag: 'Dificuldade com azul e amarelo',
    description:
      'Azul tende a parecer esverdeado e amarelo se aproxima do rosa claro ou cinza.',
  },
  {
    id: 'achromatopsia',
    label: 'Escala de Cinza',
    tag: 'Baixa visão / Tela monocromática',
    description:
      'Remove toda a saturação. Mostra se o contraste entre claro e escuro realmente sustenta a leitura.',
  },
];

export function UiLab() {
  const { bgColor, textColor, setBgColor, setTextColor, swapColors } = useColorContext();
  const [visionMode, setVisionMode] = useState<VisionMode>('normal');

  const contrast = useMemo(
    () => calculateContrast(bgColor, textColor),
    [bgColor, textColor]
  );

  const activeProfile =
    VISION_PROFILES.find((item) => item.id === visionMode) ?? VISION_PROFILES[0];

  const filterStyle =
    visionMode === 'normal' ? undefined : { filter: `url(#filter-${visionMode})` };

  return (
    <div className="page-section">
      {/* Matrizes ópticas SVG para simulação realista de daltonismo */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="filter-protanopia">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0     0 0
                      0.558 0.442 0     0 0
                      0     0.242 0.758 0 0
                      0     0     0     1 0"
            />
          </filter>
          <filter id="filter-deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0   0 0
                      0.700 0.300 0   0 0
                      0     0.300 0.7 0 0
                      0     0     0   1 0"
            />
          </filter>
          <filter id="filter-tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95 0.05  0     0 0
                      0    0.433 0.567 0 0
                      0    0.475 0.525 0 0
                      0    0     0     1 0"
            />
          </filter>
          <filter id="filter-achromatopsia">
            <feColorMatrix
              type="matrix"
              values="0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0     0     0     1 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="page-header">
        <h1>Laboratório de Visão</h1>
        <p>
          Escolha suas cores abaixo (ou traga do Testador) e simule como pessoas com
          diferentes tipos de visão enxergam o seu conteúdo.
        </p>
      </div>

      {/* Seletores livres das cores do usuário */}
      <div className="checker-controls-grid">
        <ColorPickerInput
          label="Cor do Fundo"
          value={bgColor}
          onChange={setBgColor}
        />

        <button
          type="button"
          onClick={swapColors}
          className="btn-swap"
          title="Inverter fundo e letras"
        >
          <ArrowLeftRight size={20} />
          <span>Inverter</span>
        </button>

        <ColorPickerInput
          label="Cor das Letras"
          value={textColor}
          onChange={setTextColor}
        />
      </div>

      {/* Painel do Simulador de Visão */}
      <div className="vision-simulator-card">
        <div className="vision-header">
          <Eye size={20} />
          <div>
            <h3>Como outras pessoas enxergam esta combinação?</h3>
            <p>
              Nitidez atual: <strong>{contrast.ratio.toFixed(2)}:1</strong> — clique nas
              opções abaixo para simular cada condição visual:
            </p>
          </div>
        </div>

        <div className="vision-tabs">
          {VISION_PROFILES.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => setVisionMode(profile.id)}
              className={`vision-tab ${visionMode === profile.id ? 'active' : ''}`}
            >
              <strong>{profile.label}</strong>
              <small>{profile.tag}</small>
            </button>
          ))}
        </div>

        <div className="vision-explanation">
          <Info size={18} />
          <span>
            <strong>{activeProfile.label}:</strong> {activeProfile.description}
          </span>
        </div>
      </div>

      {/* Prévia filtrada ao vivo */}
      <div className="vision-stage" style={filterStyle}>
        <LiveUIPreview bgColor={bgColor} textColor={textColor} />
      </div>
    </div>
  );
}