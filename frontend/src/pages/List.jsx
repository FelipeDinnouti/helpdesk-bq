import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../lib/api.js';
import { STATUS_LABEL, PRIORITY_LABEL, Loading, ErrorState, EmptyState } from '../components/shell.jsx';

const PAGE_SIZE = 10;

export default function List() {
  const [params, setParams] = useSearchParams();
  const [tickets, setTickets] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const status = params.get('status') || '';
  const priority = params.get('priority') || '';
  const category_id = params.get('category_id') || '';
  const page = Number(params.get('page')) || 1;

  async function load() {
    setError(null);
    try {
      const q = new URLSearchParams({ pageSize: String(PAGE_SIZE), page: String(page) });
      if (status) q.set('status', status);
      if (priority) q.set('priority', priority);
      if (category_id) q.set('category_id', category_id);
      const [list, cats] = await Promise.all([
        api(`/tickets?${q.toString()}`),
        categories.length ? Promise.resolve(categories) : api('/categories'),
      ]);
      setTickets(list);
      if (!categories.length) setCategories(cats);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [status, priority, category_id, page]);

  function setFilter(next) {
    setParams({ status, priority, category_id, page: '1', ...next });
  }

  function clearFilters() {
    setParams({ page: '1' });
  }

  if (error) {
    return (
      <>
        <h1 className="page-title">Lista de chamados</h1>
        <ErrorState error={error} onRetry={load} />
      </>
    );
  }
  if (!tickets) return <><h1 className="page-title">Lista de chamados</h1><Loading /></>;

  const filtered = status || priority || category_id;

  return (
    <>
      <h1 className="page-title">Lista de chamados</h1>
      <div className="toolbar" role="search" aria-label="Filtros">
        <div className="field">
          <label htmlFor="f-status">Status</label>
          <select id="f-status" value={status} onChange={(e) => setFilter({ status: e.target.value })}>
            <option value="">Todos</option>
            {Object.entries(STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-priority">Prioridade</label>
          <select id="f-priority" value={priority} onChange={(e) => setFilter({ priority: e.target.value })}>
            <option value="">Todas</option>
            {Object.entries(PRIORITY_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-category">Categoria</label>
          <select id="f-category" value={category_id} onChange={(e) => setFilter({ category_id: e.target.value })}>
            <option value="">Todas</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        {filtered && <button type="button" className="btn btn--ghost" onClick={clearFilters}>Limpar filtros</button>}
      </div>

      {tickets.data.length === 0 ? (
        filtered ? (
          <EmptyState title="Nada com esses filtros." action={<button type="button" className="btn" onClick={clearFilters}>Limpar filtros</button>} />
        ) : (
          <EmptyState title="Nenhum chamado por aqui." action={<Link className="btn" to="/novo">Abrir chamado</Link>} />
        )
      ) : (
        <>
          <div className="table-wrap">
            <table className="grid">
              <thead>
                <tr><th>Título</th><th>Status</th><th>Prioridade</th><th>Categoria</th><th>Solicitante</th><th>Atualizado em</th></tr>
              </thead>
              <tbody>
                {tickets.data.map((t) => (
                  <tr key={t.id}>
                    <td><Link to={`/chamados/${t.id}`}>{t.title}</Link></td>
                    <td><span className={`badge badge--${t.status}`}>{STATUS_LABEL[t.status]}</span></td>
                    <td><span className={`badge badge--${t.priority}`}>{PRIORITY_LABEL[t.priority]}</span></td>
                    <td>{t.category_name || '—'}</td>
                    <td>{t.requester_name}</td>
                    <td>{new Date(t.updated_at).toLocaleString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button type="button" className="btn btn--ghost" disabled={page <= 1} onClick={() => setParams({ status, priority, category_id, page: String(page - 1) })}>Anterior</button>
            <span>Página {tickets.page} de {tickets.totalPages} · {tickets.total} chamados</span>
            <button type="button" className="btn btn--ghost" disabled={page >= tickets.totalPages} onClick={() => setParams({ status, priority, category_id, page: String(page + 1) })}>Próxima</button>
          </div>
        </>
      )}
    </>
  );
}
