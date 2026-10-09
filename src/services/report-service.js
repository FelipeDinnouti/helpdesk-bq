const { httpError } = require('../middlewares/error-handler');
const { PRIORITIES, STATUSES } = require('../lib/validate');
const tickets = require('../repositories/ticket-repository');
const categories = require('../repositories/category-repository');

function invalid(field, message) {
  const err = httpError(400, 'VALIDATION_ERROR', 'Revise os campos destacados.');
  err.details = [{ field, message }];
  throw err;
}

// RF13/RF14 + G13: mesmos filtros e mesma visibilidade da Lista.
// Forma fixa: as 5 chaves de status e as 4 de prioridade sempre presentes.
function summary(query, user) {
  const { status, priority, category_id, since, until } = query || {};
  if (status && !STATUSES.includes(status)) invalid('status', 'Status inválido.');
  if (priority && !PRIORITIES.includes(priority)) invalid('priority', 'Prioridade inválida.');
  const rows = tickets.summaryCounts({
    status, priority, category_id, since, until,
    scopeUser: user.id, scopeRole: user.role,
  });

  const by_status = { open: 0, analysis: 0, in_progress: 0, resolved: 0, closed: 0 };
  const by_priority = { low: 0, medium: 0, high: 0, critical: 0 };
  let total = 0;
  for (const r of rows) {
    by_status[r.status] += r.n;
    by_priority[r.priority] += r.n;
    total += r.n;
  }
  return { by_status, by_priority, total };
}

function listCategories() {
  return categories.listActive();
}

function createCategory(name) {
  const clean = typeof name === 'string' ? name.trim() : '';
  if (clean.length < 2 || clean.length > 60) {
    invalid('name', 'O nome da categoria precisa ter entre 2 e 60 caracteres.');
  }
  try {
    return categories.create(clean);
  } catch {
    throw httpError(409, 'CATEGORY_TAKEN', 'Já existe uma categoria com esse nome.');
  }
}

function setCategoryActive(id, active) {
  const updated = categories.setActive(id, active);
  if (!updated) throw httpError(404, 'NOT_FOUND', 'Recurso não encontrado.');
  return updated;
}

module.exports = { summary, listCategories, createCategory, setCategoryActive };
