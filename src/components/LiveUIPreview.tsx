import { Bell, CheckCircle, Sparkles } from 'lucide-react';

interface LiveUIPreviewProps {
  bgColor: string;
  textColor: string;
}

export function LiveUIPreview({ bgColor, textColor }: LiveUIPreviewProps) {
  return (
    <div className="ui-preview-grid">
      {/* 1. Post ou Slide */}
      <div
        className="preview-box"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderColor: textColor,
        }}
      >
        <span className="preview-tag" style={{ borderColor: textColor }}>
          <Sparkles size={14} /> Post ou Slide de Apresentação
        </span>
        <h3>Boas cores prendem a atenção sem cansar a vista</h3>
        <p>
          Se você consegue ler este parágrafo rapidamente sem forçar os olhos,
          sua combinação funciona muito bem para conteúdos e apresentações.
        </p>
      </div>

      {/* 2. Botões e Avisos */}
      <div
        className="preview-box"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderColor: textColor,
        }}
      >
        <h4>Botões de Ação e Destaque</h4>
        <div className="preview-btn-row">
          <button
            type="button"
            className="demo-btn"
            style={{
              backgroundColor: textColor,
              color: bgColor,
              border: `2px solid ${textColor}`,
            }}
          >
            Começar Agora
          </button>

          <button
            type="button"
            className="demo-btn"
            style={{
              backgroundColor: 'transparent',
              color: textColor,
              border: `2px solid ${textColor}`,
            }}
          >
            Saiba Mais
          </button>
        </div>

        <div className="preview-alert" style={{ borderColor: textColor }}>
          <Bell size={18} />
          <span>Exemplo de aviso importante ou faixa de promoção.</span>
        </div>
      </div>

      {/* 3. Campo de Cadastro */}
      <div
        className="preview-box"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderColor: textColor,
        }}
      >
        <h4>Campo de Preenchimento</h4>
        <label className="demo-label">
          Seu melhor e-mail
          <input
            type="text"
            readOnly
            value="contato@exemplo.com.br"
            className="demo-input"
            style={{
              backgroundColor: 'transparent',
              color: textColor,
              borderColor: textColor,
            }}
          />
        </label>
        <small className="demo-helper">
          <CheckCircle size={14} /> Mensagem de confirmação bem visível
        </small>
      </div>
    </div>
  );
}