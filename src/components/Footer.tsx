export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>
          <strong>ColorAccess</strong> — Validador de Contraste WCAG & Gerador de Paletas
        </p>
        <p className="footer-sub">
          Dados cromáticos fornecidos via HTTPS por{' '}
          <a href="https://www.thecolorapi.com/" target="_blank" rel="noreferrer">
            The Color API
          </a>
        </p>
      </div>
    </footer>
  );
}