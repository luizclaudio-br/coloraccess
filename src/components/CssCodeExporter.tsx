import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

interface CssCodeExporterProps {
  bgColor: string;
  textColor: string;
}

export function CssCodeExporter({ bgColor, textColor }: CssCodeExporterProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const cssSnippet = `:root {
  --color-surface: ${bgColor};
  --color-text: ${textColor};
  --color-accent: ${textColor};
}

.custom-component {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-accent);
}`;

  const handleCopyCss = async () => {
    if (codeRef.current) {
      codeRef.current.select();
    }
    await navigator.clipboard.writeText(cssSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="css-exporter-card">
      <div className="exporter-header">
        <div>
          <h3>Exportar Variáveis CSS</h3>
          <p>Copie e cole diretamente no seu projeto Front-End</p>
        </div>

        <button type="button" onClick={handleCopyCss} className="btn btn-primary">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Código Copiado!' : 'Copiar CSS'}</span>
        </button>
      </div>

      <textarea
        ref={codeRef}
        readOnly
        value={cssSnippet}
        rows={10}
        className="css-code-textarea"
      />
    </div>
  );
}