import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowUpRight, Calendar } from 'lucide-react';
import { useColorContext } from '../context/ColorContext';
import { EmptyState } from '../components/EmptyState';

export function SavedPalettes() {
  const { savedList, applyTheme, removeCombination } = useColorContext();
  const navigate = useNavigate();

  const handleLoadTheme = (bg: string, text: string) => {
    applyTheme(bg, text);
    navigate('/');
  };

  return (
    <div className="page-section">
      <div className="page-header">
        <h1>Combinações Salvas ({savedList.length})</h1>
        <p>
          Suas paletas e testes aprovados ficam salvos automaticamente no navegador
          para consulta rápida.
        </p>
      </div>

      {savedList.length === 0 ? (
        <EmptyState
          title="Nenhuma combinação salva ainda"
          description="Volte ao Testador de Contraste, escolha uma combinação legível e clique em 'Salvar Combinação'."
          actionLabel="Ir para o Testador"
          onAction={() => navigate('/')}
        />
      ) : (
        <div className="saved-grid">
          {savedList.map((item) => (
            <div key={item.id} className="saved-card">
              <div
                className="saved-banner"
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                <span>Aa Bb Cc</span>
                <strong>{item.ratio.toFixed(2)} : 1</strong>
              </div>

              <div className="saved-body">
                <h3>{item.label}</h3>
                <p className="saved-codes">
                  Fundo: <code>{item.bgColor}</code> ({item.bgName})
                  <br />
                  Texto: <code>{item.textColor}</code> ({item.textName})
                </p>

                <div className="saved-meta">
                  <span>
                    <Calendar size={14} /> {item.createdAt}
                  </span>
                </div>

                <div className="saved-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleLoadTheme(item.bgColor, item.textColor)}
                  >
                    <span>Aplicar</span>
                    <ArrowUpRight size={16} />
                  </button>

                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => removeCombination(item.id)}
                    title="Excluir combinação"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}