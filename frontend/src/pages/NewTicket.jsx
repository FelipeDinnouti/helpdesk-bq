import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, ApiError } from '../lib/api.js';
import { Loading } from '../components/shell.jsx';
import { PRIORITY_LABEL } from '../components/shell.jsx';

export default function NewTicket() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [categoryId, setCategoryId] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api('/categories').then(setCategories).catch(() => setCategories([]));
  }, []);

  function clientErrors() {
    const errs = {};
    const t = title.trim();
    if (t.length < 10 || t.length > 100) errs.title = 'O título precisa ter entre 10 e 100 caracteres.';
    const d = description.trim();
    if (d.length < 30 || d.length > 5000) errs.description = 'A descrição precisa ter entre 30 e 5000 caracteres.';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGeneralError(null);
    const errs = clientErrors();
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      document.querySelector('.field__error')?.previousElementSibling?.focus?.();
      return;
    }
    setSubmitting(true);
    try {
      const ticket = await api('/tickets', {
        method: 'POST',
        body: {
          title: title.trim(), description: description.trim(), priority,
          ...(categoryId ? { category_id: categoryId } : {}),
        },
      });
      navigate(`/chamados/${ticket.id}`, { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.details.length) {
        const byField = {};
        for (const d of err.details) byField[d.field] = d.message;
        setFieldErrors(byField);
      } else if (err instanceof TypeError) {
        setGeneralError('Verifique sua conexão. O texto foi preservado — tente de novo.');
      } else {
        setGeneralError(err);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (!categories) return <><h1 className="page-title">Novo chamado</h1><Loading /></>;

  return (
    <>
      <h1 className="page-title">Novo chamado</h1>
      <div className="card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="n-title">Título</label>
            <input id="n-title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} required aria-describedby={fieldErrors.title ? 'n-title-err' : undefined} />
            {fieldErrors.title && <small className="field__error" id="n-title-err">{fieldErrors.title}</small>}
          </div>
          <div className="field">
            <label htmlFor="n-desc">Descrição</label>
            <textarea id="n-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} required aria-describedby={fieldErrors.description ? 'n-desc-err' : undefined} />
            {fieldErrors.description && <small className="field__error" id="n-desc-err">{fieldErrors.description}</small>}
            <small className="field__hint">Descreva o problema com detalhe: onde acontece, quando começou, o que já foi tentado.</small>
          </div>
          <div className="field">
            <label htmlFor="n-priority">Prioridade</label>
            <select id="n-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
              {Object.entries(PRIORITY_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="n-category">Categoria (opcional)</label>
            <select id="n-category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Sem categoria</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          {generalError && (
            <p className="form-feedback" role="alert">
              {typeof generalError === 'string' ? generalError : generalError.message}
              {generalError?.correlationId && <><br /><small>Código de suporte: {generalError.correlationId}</small></>}
            </p>
          )}
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Enviando…' : 'Abrir chamado'}
          </button>
        </form>
      </div>
    </>
  );
}
