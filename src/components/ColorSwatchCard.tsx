import { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import type { ColorDetails } from '../types/color';
import { calculateContrast } from '../utils/contrast';

interface ColorSwatchCardProps {
  color: ColorDetails;
  onSelectAsBg?: (hex: string) => void;
  onSelectAsText?: (hex: string) => void;
}

export function ColorSwatchCard({
  color,
  onSelectAsBg,
  onSelectAsText,
}: ColorSwatchCardProps) {
  const [copied, setCopied] = useState(false);

  // Define texto claro ou escuro automaticamente sobre o cartão
  const contrastWithWhite = calculateContrast(color.hex, '#FFFFFF');
  const overlayTextColor = contrastWithWhite.ratio >= 4.5 ? '#FFFFFF' : '#0F172A';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="swatch-card">
      <div
        className="swatch-preview"
        style={{ backgroundColor: color.hex, color: overlayTextColor }}
      >
        <button
          type="button"
          onClick={handleCopy}
          className="swatch-copy-btn"
          style={{ color: overlayTextColor, borderColor: overlayTextColor }}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          <span>{copied ? 'Copiado' : color.hex}</span>
        </button>
      </div>

      <div className="swatch-info">
        <strong>{color.name}</strong>
        <small>{color.rgb}</small>

        {(onSelectAsBg || onSelectAsText) && (
          <div className="swatch-actions">
            {onSelectAsBg && (
              <button
                type="button"
                className="btn-mini"
                onClick={() => onSelectAsBg(color.hex)}
              >
                Usar Fundo <ArrowUpRight size={13} />
              </button>
            )}
            {onSelectAsText && (
              <button
                type="button"
                className="btn-mini"
                onClick={() => onSelectAsText(color.hex)}
              >
                Usar Texto <ArrowUpRight size={13} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}