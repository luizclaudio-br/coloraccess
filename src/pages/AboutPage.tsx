import { ShieldCheck, Code2, Cpu, Globe } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="page-section">
      <div className="page-header">
        <h1>Sobre o ColorAccess & Guia WCAG</h1>
        <p>
          Entenda como funciona o cálculo matemático de acessibilidade visual e a
          arquitetura Front-End por trás desta aplicação.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <ShieldCheck size={28} />
          <h3>O que são os níveis AA e AAA?</h3>
          <p>
            As diretrizes internacionais <strong>WCAG 2.1</strong> definem a razão
            mínima de luminância entre texto e fundo para garantir leitura confortável:
          </p>
          <ul>
            <li>
              <strong>AA Normal (mín. 4.5:1):</strong> Padrão recomendado para textos
              comuns e interfaces web.
            </li>
            <li>
              <strong>AA Grande (mín. 3.0:1):</strong> Aceito para títulos grandes
              (acima de 24px ou 19px em negrito).
            </li>
            <li>
              <strong>AAA Normal (mín. 7.0:1):</strong> Nível máximo de legibilidade
              para leitores com baixa visão.
            </li>
          </ul>
        </div>

        <div className="about-card">
          <Globe size={28} />
          <h3>Integração com The Color API</h3>
          <p>
            A aplicação consome em tempo real dois endpoints públicos via HTTPS da{' '}
            <strong>The Color API</strong> sem necessidade de chave privada:
          </p>
          <ul>
            <li>
              <code>/id?hex=...</code> para identificar o nome oficial de cada cor
              escolhida.
            </li>
            <li>
              <code>/scheme?hex=...&mode=...</code> para gerar paletas harmônicas
              completas e cruzar sua matriz de contraste.
            </li>
          </ul>
        </div>

        <div className="about-card">
          <Cpu size={28} />
          <h3>React Hooks na Prática</h3>
          <ul>
            <li>
              <strong>useState:</strong> Gerencia cores ativas, modos de harmonia e
              estados de carregamento.
            </li>
            <li>
              <strong>useEffect:</strong> Dispara consultas com debounce na API e
              persiste favoritos no <code>localStorage</code>.
            </li>
            <li>
              <strong>useMemo:</strong> Otimiza o cálculo de luminância WCAG e a matriz
              de pares válidos das paletas.
            </li>
            <li>
              <strong>useContext:</strong> Compartilha o tema ativo entre todas as 5
              rotas da aplicação.
            </li>
            <li>
              <strong>useRef:</strong> Controla foco direto em inputs HEX e seleção
              rápida de variáveis CSS.
            </li>
          </ul>
        </div>

        <div className="about-card">
          <Code2 size={28} />
          <h3>Stack & Arquitetura</h3>
          <p>
            Desenvolvido em <strong>React + TypeScript</strong> com Vite, utilizando{' '}
            <strong>React Router DOM</strong> para navegação SPA entre 5 páginas e 8
            componentes reutilizáveis tipados.
          </p>
        </div>
      </div>
    </div>
  );
}