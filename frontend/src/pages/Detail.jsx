import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api, ApiError } from '../lib/api.js';
import { useAuth } from '../auth.jsx';
import { STATUS_LABEL, PRIORITY_LABEL, Loading, ErrorState } from '../components/shell.jsx';

// Espelha a matriz do back (transition-service). O servidor decide; isto só
// limita as opções visíveis para não oferecer transição impossível.
const NEXT = {
  open: ['analysis'],
  analysis: ['in_progress'],
  in_progress: ['resolved'],
  resolved: ['closed', 'in_progress'],
  closed: ['in_progress'],
};

const EVENT_LABEL = {
  'ticket.created': 'criou o chamado',
  'ticket.status.changed': 'mudou o status',
  'ticket.priority.changed': 'mudou a prioridade',
  'ticket.owner_id.changed': 'mudou o responsável',
  'ticket.category_id.changed': 'mudou a categoria',
  'ticket.comment.added': 'comentou',
  'ticket.deleted': 'excluiu o chamado',
};

function fmtDate(iso) {
  return new Date(iso).toLocaleString('pt-BR');
}

function HistoryLine({ h }) {
  const what = EVENT_LABEL[h.event] || h.event;
  let detail = '';
  if (h.event === 'ticket.status.changed') {
    detail = `: ${STATUS_LABEL[h.before] || h.before} → ${STATUS_LABEL[h.after] || h.after}`;
  } else if (h.event === 'ticket.priority.changed') {
    detail = `: ${PRIORITY_LABEL[h.before] || h.before} → ${PRIORITY_LABEL[h.after] || h.after}`;
  } else if (h.event === 'ticket.deleted') {
    detail = ` — justificativa: ${h.after}`;
  } else if (h.before || h.after) {
    detail = `: ${h.before || '—'} → ${h.after || '—'}`;
  }
  return (
    <li>
      <strong>{h.actor_name}</strong> {what}{detail}
      <time dateTime={h.created_at}>{fmtDate(h.created_at)}</time>
    </li>
  );
}

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const [nextStatus, setNextStatus] = useState('');
  const [statusComment, setStatusComment] = useState('');
  const [statusError, setStatusError] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [priority, setPriority] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [editMsg, setEditMsg] = useState(null);
  const [deleteJust, setDeleteJust] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const isStaff = user.role === 'technician' || user.role === 'admin';

  async function load() {
    setError(null);
    try {
      const [t, c, h, cats] = await Promise.all([
        api(`/tickets/${id}`),
        api(`/tickets/${id}/comments`),
        api(`/tickets/${id}/history`),
        isStaff ? api('/categories') : Promise.resolve([]),
      ]);
      setTicket(t);
      setComments(c);
      setHistory(h);
      setCategories(cats);
      setPriority(t.priority);
      setCategoryId(t.category_id || '');
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  async function submitStatus(e) {
    e.preventDefault();
    if (!nextStatus) return;
    setStatusError(null);
    setBusy(true);
    try {
      const updated = await api(`/tickets/${id}/status`, { method: 'PATCH', body: { status: nextStatus, comment: statusComment } });
      setTicket(updated);
      setNextStatus('');
      setStatusComment('');
      const [c, h] = await Promise.all([api(`/tickets/${id}/comments`), api(`/tickets/${id}/history`)]);
      setComments(c);
      setHistory(h);
    } catch (err) {
      setStatusError(err);
    } finally {
      setBusy(false);
    }
  }

  async function submitComment(e) {
    e.preventDefault();
    setCommentError(null);
    try {
      await api(`/tickets/${id}/comments`, { method: 'POST', body: { body: commentBody } });
      setCommentBody('');
      const [c, h] = await Promise.all([api(`/tickets/${id}/comments`), api(`/tickets/${id}/history`)]);
      setComments(c);
      setHistory(h);
    } catch (err) {
      setCommentError(err);
    }
  }

  async function saveFields(e) {
    e.preventDefault();
    setEditMsg(null);
    try {
      const updated = await api(`/tickets/${id}`, {
        method: 'PATCH',
        body: { priority, category_id: categoryId || null },
      });
      setTicket(updated);
      const h = await api(`/tickets/${id}/history`);
      setHistory(h);
      setEditMsg('Atualizado.');
    } catch (err) {
      setEditMsg(err.message);
    }
  }

  async function claim(unassign) {
    try {
      const updated = await api(`/tickets/${id}`, { method: 'PATCH', body: { owner_id: unassign ? null : user.id } });
      setTicket(updated);
      const h = await api(`/tickets/${id}/history`);
      setHistory(h);
    } catch (err) {
      setEditMsg(err.message);
    }
  }

  async function remove(e) {
    e.preventDefault();
    setDeleteError(null);
    try {
      await api(`/tickets/${id}`, { method: 'DELETE', body: { justification: deleteJust } });
      navigate('/lista', { replace: true });
    } catch (err) {
      setDeleteError(err);
    }
  }

  if (error) {
    const title = error.status === 404 ? 'Chamado não encontrado.' : error.status === 403 ? 'Você não tem permissão para ver este chamado.' : null;
    return (
      <>
        <h1 className="page-title">Detalhe do chamado</h1>
        {title ? (
          <div className="state" role="alert">
            <p><strong>{title}</strong></p>
            <p><Link className="btn" to="/lista">Voltar para a lista</Link></p>
          </div>
        ) : (
          <ErrorState error={error} onRetry={load} />
        )}
      </>
    );
  }
  if (!ticket) return <><h1 className="page-title">Detalhe do chamado</h1><Loading /></>;

  const options = NEXT[ticket.status] || [];

  return (
    <>
      <h1 className="page-title">{ticket.title}</h1>

      <div className="card">
        <p>{ticket.description}</p>
        <p>
          <span className={`badge badge--${ticket.status}`}>{STATUS_LABEL[ticket.status]}</span>{' '}
          <span className={`badge badge--${ticket.priority}`}>{PRIORITY_LABEL[ticket.priority]}</span>
        </p>
        <p>
          Solicitante: <strong>{ticket.requester_name}</strong>
          {' · '}Responsável: <strong>{ticket.owner_name || 'sem responsável'}</strong>
          {' · '}Categoria: <strong>{ticket.category_name || '—'}</strong>
        </p>
        <p><small>Criado em {fmtDate(ticket.created_at)} · atualizado em {fmtDate(ticket.updated_at)}</small></p>
      </div>

      {isStaff && (
        <div className="card">
          <h2>Ações</h2>
          <form onSubmit={submitStatus}>
            <div className="toolbar">
              <div className="field">
                <label htmlFor="d-status">Mudar status</label>
                <select id="d-status" value={nextStatus} onChange={(e) => setNextStatus(e.target.value)}>
                  <option value="">Escolher…</option>
                  {options.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="d-comment">Comentário {nextStatus === 'closed' || (ticket.status === 'closed') ? '(obrigatório)' : '(opcional)'}</label>
                <input id="d-comment" value={statusComment} onChange={(e) => setStatusComment(e.target.value)} placeholder="Ex.: solução aplicada e confirmada" />
              </div>
              <button type="submit" className="btn" disabled={busy || !nextStatus}>{busy ? 'Aplicando…' : 'Aplicar'}</button>
            </div>
            {statusError && (
              <p className="form-feedback" role="alert">
                {statusError.message}
                {statusError?.correlationId && <><br /><small>Código de suporte: {statusError.correlationId}</small></>}
              </p>
            )}
          </form>

          <form onSubmit={saveFields}>
            <div className="toolbar">
              <div className="field">
                <label htmlFor="d-priority">Prioridade</label>
                <select id="d-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  {Object.entries(PRIORITY_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="d-category">Categoria</label>
                <select id="d-category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">Sem categoria</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn--ghost">Salvar</button>
              {ticket.owner_id === user.id ? (
                <button type="button" className="btn btn--ghost" onClick={() => claim(true)}>Liberar</button>
              ) : (
                <button type="button" className="btn btn--ghost" onClick={() => claim(false)}>Assumir</button>
              )}
            </div>
            {editMsg && <p role="status"><small>{editMsg}</small></p>}
          </form>

          {user.role === 'admin' && (
            showDelete ? (
              <form onSubmit={remove}>
                <div className="field">
                  <label htmlFor="d-just">Justificativa da exclusão (obrigatória)</label>
                  <input id="d-just" value={deleteJust} onChange={(e) => setDeleteJust(e.target.value)} required />
                  {deleteError && <small className="field__error">{deleteError.message}</small>}
                </div>
                <button type="submit" className="btn btn--danger">Confirmar exclusão</button>{' '}
                <button type="button" className="btn btn--ghost" onClick={() => setShowDelete(false)}>Cancelar</button>
              </form>
            ) : (
              <button type="button" className="btn btn--danger" onClick={() => setShowDelete(true)}>Excluir chamado</button>
            )
          )}
        </div>
      )}

      <div className="card">
        <h2>Comentários</h2>
        {comments.length === 0 && <p>Nenhum comentário ainda.</p>}
        {comments.map((c) => (
          <div className="comment" key={c.id}>
            <p>{c.body}</p>
            <span className="comment__meta">{c.author_name} · {fmtDate(c.created_at)}</span>
          </div>
        ))}
        <form onSubmit={submitComment}>
          <div className="field">
            <label htmlFor="d-new-comment">Adicionar comentário</label>
            <textarea id="d-new-comment" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} rows={3} maxLength={1100} required />
            {commentError && <small className="field__error">{commentError.message}</small>}
          </div>
          <button type="submit" className="btn">Comentar</button>
        </form>
      </div>

      <div className="card">
        <h2>Histórico</h2>
        {history.length === 0 && <p>Sem eventos.</p>}
        <ul className="history">
          {history.map((h) => <HistoryLine key={h.id} h={h} />)}
        </ul>
      </div>
    </>
  );
}
