import { NavLink } from 'react-router-dom';
import { useColorContext } from '../context/ColorContext';

export function Navbar() {
  const { bgColor, textColor } = useColorContext();

  return (
    <header className="navbar">
      <div className="navbar-accent-bar" />
      <div className="container navbar-content">
        <NavLink to="/" className="brand">
          <svg
            width="30"
            height="30"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="16" fill="#1E1B4B" />
            <circle cx="26" cy="32" r="14" fill="#6366F1" />
            <circle cx="38" cy="32" r="14" fill="#F8FAFC" fillOpacity="0.95" />
            <path
              d="M32 19.4A14 14 0 0 1 32 44.6A14 14 0 0 1 32 19.4Z"
              fill="#38BDF8"
            />
          </svg>
          <div className="brand-text">
            <span>ColorAccess</span>
            <small>WCAG 2.1 STUDIO</small>
          </div>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Testador
          </NavLink>
          <NavLink
            to="/paletas"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Paletas
          </NavLink>
         <NavLink
            to="/preview"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Simulador de Visão
          </NavLink>
          <NavLink
            to="/salvos"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Salvos
          </NavLink>
          <NavLink
            to="/sobre"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Sobre
          </NavLink>
        </nav>

        <div
          className="nav-theme-pill"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            borderColor: textColor,
          }}
          title={`Tema ativo: Fundo ${bgColor} | Texto ${textColor}`}
        >
          <span>Aa</span>
          <small>{bgColor}</small>
        </div>
      </div>
    </header>
  );
}