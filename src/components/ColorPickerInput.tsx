import { useState, useEffect, useRef } from 'react';
import { Edit3 } from 'lucide-react';
import { isValidHex, normalizeHex } from '../utils/contrast';

interface ColorPickerInputProps {
  label: string;
  value: string;
  colorName?: string;
  onChange: (newHex: string) => void;
}

export function ColorPickerInput({
  label,
  value,
  colorName,
  onChange,
}: ColorPickerInputProps) {
  const [textInput, setTextInput] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTextInput(value);
  }, [value]);

  const handleTextChange = (raw: string) => {
    setTextInput(raw);
    if (isValidHex(raw)) {
      onChange(normalizeHex(raw));
    }
  };

  const handleFocusClick = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  return (
    <div className="picker-card">
      <div className="picker-header">
        <span className="picker-label">{label}</span>
        {colorName && <span className="picker-api-name">{colorName}</span>}
      </div>

      <div className="picker-controls">
        <input
          type="color"
          aria-label={`Seletor visual para ${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="color-swatch-input"
        />

        <input
          ref={inputRef}
          type="text"
          value={textInput}
          maxLength={7}
          placeholder="#000000"
          onChange={(e) => handleTextChange(e.target.value)}
          className="hex-text-input"
        />

        <button
          type="button"
          onClick={handleFocusClick}
          className="btn-icon"
          title="Editar código HEX"
        >
          <Edit3 size={16} />
        </button>
      </div>
    </div>
  );
}