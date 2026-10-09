import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import './shell.css';

const STATUS_LABEL = { open: 'Aberto', analysis: 'Em análise', in_progress: 'Em atendimento', resolved: 'Resolvido', closed: 'Fechado' };
const PRIORITY_LABEL = { low: 'Baixa', medium: 'Média', high: 'Alta', critical: 'Crítica' };

export { STATUS_LABEL, PRIORITY_LABEL };

export function Shell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    navigate('/login');
    return null;
  }
  return (
    <div className="shell">
      <header className="shell__header">
        <span className="shell__brand">HelpDesk BQ</span>
        <nav className="shell__nav" aria-label="Principal">
          <NavLink to="/lista">Chamados</NavLink>
          <NavLink to="/novo">Novo chamado</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
        <div className="shell__user">
          <span>{user.name} · {user.role === 'requester' ? 'Solicitante' : user.role === 'technician' ? 'Técnico' : 'Administrador'}</span>
          <button type="button" className="btn btn--ghost" onClick={logout}>Sair</button>
        </div>
      </header>
      <main className="shell__main">
        <Outlet />
      </main>
    </div>
  );
}

export function Loading({ label = 'Carregando…' }) {
  return <p className="state" role="status">{label}</p>;
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="state state--error" role="alert">
      <p>{error?.message || 'Não foi possível concluir.'}</p>
      {error?.correlationId && <small>Código de suporte: {error.correlationId}</small>}
      {onRetry && <button type="button" className="btn" onClick={onRetry}>Tentar de novo</button>}
    </div>
  );
}

export function EmptyState({ title, action }) {
  return (
    <div className="state" role="status">
      <p><strong>{title}</strong></p>
      {action}
    </div>
  );
}
