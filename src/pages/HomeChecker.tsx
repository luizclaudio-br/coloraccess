import { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeftRight,
  BookmarkPlus,
  Check,
  Shuffle,
  Wand2,
  Eye,
  ShieldCheck,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { useColorContext } from '../context/ColorContext';
import {
  calculateContrast,
  suggestAccessibleText,
  generateRandomAccessiblePair,
} from '../utils/contrast';
import { fetchColorDetails } from '../services/colorApi';
import { ColorPickerInput } from '../components/ColorPickerInput';
import { ContrastBadge } from '../components/ContrastBadge';
import { LiveUIPreview } from '../components/LiveUIPreview';

export function HomeChecker() {
  const {
    bgColor,
    textColor,
    setBgColor,
    setTextColor,
    applyTheme,
    swapColors,
    saveCombination,
  } = useColorContext();

  const [bgName, setBgName] = useState('Buscando nome...');
  const [textName, setTextName] = useState('Buscando nome...');
  const [label, setLabel] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const contrast = useMemo(
    () => calculateContrast(bgColor, textColor),
    [bgColor, textColor]
  );

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      try {
        const [bgData, textData] = await Promise.all([
          fetchColorDetails(bgColor),
          fetchColorDetails(textColor),
        ]);
        if (active) {
          setBgName(bgData.name);
          setTextName(textData.name);
        }
      } catch {
        if (active) {
          setBgName('Cor personalizada');
          setTextName('Cor personalizada');
        }
      }
    }, 350);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [bgColor, textColor]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveCombination({
      label: label.trim() || `${bgName} + ${textName}`,
      bgColor,
      textColor,
      bgName,
      textName,
      ratio: contrast.ratio,
    });
    setLabel('');
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleRandomize = () => {
    const pair = generateRandomAccessiblePair();
    applyTheme(pair.bg, pair.text);
  };

  const handleAutoFix = () => {
    const betterText = suggestAccessibleText(bgColor);
    setTextColor(betterText);
  };

  // Classificação visual em 3 níveis simples para qualquer usuário
  const qualityLevel = contrast.aaaNormal
    ? 'excellent'
    : contrast.aaNormal
    ? 'good'
    : 'poor';

  const barPercent = Math.min(100, Math.round((contrast.ratio / 10) * 100));

  return (
    <div className="page-section">
      {/* Faixa Hero com Plano de Fundo Visual */}
      <section className="hero-banner">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />

        <div className="hero-content">
          <span className="hero-pill">
            <Eye size={15} /> Leitura clara para qualquer tela
          </span>
          <h1>Suas cores são fáceis de ler para todo mundo?</h1>
          <p>
            Escolha a cor do fundo e a cor das letras abaixo. O{' '}
            <strong>ColorAccess</strong> analisa na hora se o seu texto fica
            nítido em posts, slides, sites e aplicativos — sem precisar entender
            de design.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              onClick={handleRandomize}
              className="btn btn-hero-light"
            >
              <Shuffle size={17} />
              <span>Testar Combinação Aleatória</span>
            </button>

            {!contrast.aaNormal && (
              <button
                type="button"
                onClick={handleAutoFix}
                className="btn btn-hero-fix"
              >
                <Wand2 size={17} />
                <span>Corrigir Leitura Automaticamente</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Seletores de Cor */}
      <div className="checker-controls-grid">
        <ColorPickerInput
          label="1. Cor do Fundo (Página ou Cartão)"
          value={bgColor}
          colorName={bgName}
          onChange={setBgColor}
        />

        <button
          type="button"
          onClick={swapColors}
          className="btn-swap"
          title="Trocar cor do fundo com a cor das letras"
        >
          <ArrowLeftRight size={20} />
          <span>Inverter</span>
        </button>

        <ColorPickerInput
          label="2. Cor das Letras e Ícones"
          value={textColor}
          colorName={textName}
          onChange={setTextColor}
        />
      </div>

      {/* Veredito Humano + Barra Visual + Situações Reais */}
      <div className="score-panel">
        <div className="score-main">
          <div className={`verdict-headline verdict-${qualityLevel}`}>
            {qualityLevel === 'excellent' && <ShieldCheck size={26} />}
            {qualityLevel === 'good' && <AlertTriangle size={26} />}
            {qualityLevel === 'poor' && <XCircle size={26} />}
            <strong>
              {qualityLevel === 'excellent'
                ? 'Excelente leitura!'
                : qualityLevel === 'good'
                ? 'Boa leitura'
                : 'Difícil de ler'}
            </strong>
          </div>

          <p className="score-status">
            {qualityLevel === 'excellent'
              ? 'Combinação super nítida, confortável até em celulares com brilho baixo ou para quem tem dificuldade de visão.'
              : qualityLevel === 'good'
              ? 'Funciona bem na maioria das telas, sites e apresentações sem cansar a vista.'
              : 'As letras estão se misturando com o fundo. Quem olhar rápido pode ter dificuldade para ler.'}
          </p>

          {/* Barra visual intuitiva de nitidez */}
          <div className="readability-meter">
            <div className="meter-track">
              <div
                className={`meter-fill meter-${qualityLevel}`}
                style={{ width: `${barPercent}%` }}
              />
            </div>
            <div className="meter-labels">
              <span>Fraco</span>
              <span>Bom</span>
              <span>Excelente</span>
            </div>
          </div>

          {!contrast.aaNormal && (
            <button
              type="button"
              onClick={handleAutoFix}
              className="btn btn-primary"
              style={{ marginTop: '0.4rem' }}
            >
              <Wand2 size={16} />
              <span>Corrigir cor das letras</span>
            </button>
          )}

          {/* Dado técnico discreto para devs/avaliação WCAG */}
          <div className="tech-footnote">
            Padrão WCAG 2.1: <strong>{contrast.ratio.toFixed(2)}:1</strong> (
            {contrast.aaaNormal
              ? 'Nível AAA'
              : contrast.aaNormal
              ? 'Nível AA'
              : 'Abaixo de AA'}
            )
          </div>
        </div>

        <div className="badges-grid">
          <ContrastBadge
            label="Textos e legendas"
            minRatio="Leitura corrida"
            passed={contrast.aaNormal}
          />
          <ContrastBadge
            label="Títulos e capas"
            minRatio="Letras grandes"
            passed={contrast.aaLarge}
          />
          <ContrastBadge
            label="Conforto máximo"
            minRatio="Baixa visão / sol"
            passed={contrast.aaaNormal}
          />
          <ContrastBadge
            label="Botões e avisos"
            minRatio="Destaques visuais"
            passed={contrast.aaaLarge}
          />
        </div>
      </div>

      {/* Barra para Guardar Favorito */}
      <form onSubmit={handleSave} className="save-bar">
        <input
          type="text"
          placeholder="Dê um apelido para guardar (ex: Capa do Trabalho, Post Instagram...)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="save-input"
        />
        <button type="submit" className="btn btn-primary">
          {savedFeedback ? <Check size={18} /> : <BookmarkPlus size={18} />}
          <span>{savedFeedback ? 'Guardado nos Salvos!' : 'Guardar Combinação'}</span>
        </button>
      </form>

      {/* Prévia Aplicada */}
      <div className="subsection">
        <div className="section-heading-didactic">
          <h2>Veja como fica na prática</h2>
          <p>
            Simulação em tempo real de como o público vai enxergar essas cores
            em situações reais:
          </p>
        </div>
        <LiveUIPreview bgColor={bgColor} textColor={textColor} />
      </div>
    </div>
  );
}