import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { STATUS_LABEL, PRIORITY_LABEL, Loading, ErrorState, EmptyState } from '../components/shell.jsx';

export default function Dashboard() {
  const [params, setParams] = useState({ status: '', priority: '', category_id: '', since: '', until: '' });
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  async function load() {
    setError(null);
    try {
      const q = new URLSearchParams();
      for (const [k, v] of Object.entries(params)) if (v) q.set(k, v);
      const [s, cats] = await Promise.all([
        api(`/reports/summary?${q.toString()}`),
        categories.length ? Promise.resolve(categories) : api('/categories'),
      ]);
      setSummary(s);
      if (!categories.length) setCategories(cats);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [JSON.stringify(params)]);

  function set(patch) {
    setParams((p) => ({ ...p, ...patch }));
  }

  function clear() {
    setParams({ status: '', priority: '', category_id: '', since: '', until: '' });
  }

  if (error) return <><h1 className="page-title">Dashboard</h1><ErrorState error={error} onRetry={load} /></>;
  if (!summary) return <><h1 className="page-title">Dashboard</h1><Loading /></>;

  const filtered = Object.values(params).some(Boolean);

  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <div className="toolbar" role="search" aria-label="Filtros do relatório">
        <div className="field">
          <label htmlFor="r-status">Status</label>
          <select id="r-status" value={params.status} onChange={(e) => set({ status: e.target.value })}>
            <option value="">Todos</option>
            {Object.entries(STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="r-priority">Prioridade</label>
          <select id="r-priority" value={params.priority} onChange={(e) => set({ priority: e.target.value })}>
            <option value="">Todas</option>
            {Object.entries(PRIORITY_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="r-category">Categoria</label>
          <select id="r-category" value={params.category_id} onChange={(e) => set({ category_id: e.target.value })}>
            <option value="">Todas</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="r-since">De</label>
          <input id="r-since" type="date" value={params.since} onChange={(e) => set({ since: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="r-until">Até</label>
          <input id="r-until" type="date" value={params.until} onChange={(e) => set({ until: e.target.value })} />
        </div>
        {filtered && <button type="button" className="btn btn--ghost" onClick={clear}>Limpar filtros</button>}
      </div>

      {summary.total === 0 ? (
        <EmptyState title="Sem dados para os filtros atuais." action={filtered ? <button type="button" className="btn" onClick={clear}>Limpar filtros</button> : null} />
      ) : (
        <>
          <div className="stats" role="group" aria-label="Totais por status">
            {Object.entries(STATUS_LABEL).map(([v, l]) => (
              <div className="stat" key={v}>
                <div className="stat__n" aria-label={`${summary.by_status[v]} chamados ${l.toLowerCase()}`}>{summary.by_status[v]}</div>
                <div className="stat__l">{l}</div>
              </div>
            ))}
          </div>
          <div className="stats" role="group" aria-label="Totais por prioridade">
            {Object.entries(PRIORITY_LABEL).map(([v, l]) => (
              <div className="stat" key={v}>
                <div className="stat__n" aria-label={`${summary.by_priority[v]} chamados com prioridade ${l.toLowerCase()}`}>{summary.by_priority[v]}</div>
                <div className="stat__l">Prioridade {l}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#fff' }} role="status">{summary.total} chamados no total.</p>
        </>
      )}
    </>
  );
}
