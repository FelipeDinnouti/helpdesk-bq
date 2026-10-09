const db = require('../../db/db');
const { httpError } = require('../middlewares/error-handler');
const { ticketFields, PRIORITIES, STATUSES } = require('../lib/validate');
const tickets = require('../repositories/ticket-repository');
const users = require('../repositories/user-repository');
const history = require('../repositories/history-repository');

function validationError(details) {
  const err = httpError(400, 'VALIDATION_ERROR', 'Revise os campos destacados.');
  err.details = details;
  return err;
}

function categoryOrThrow(category_id) {
  if (category_id === undefined || category_id === null) return null;
  const row = db.prepare('SELECT id FROM categories WHERE id = ? AND active = 1').get(category_id);
  if (!row) {
    throw validationError([{ field: 'category_id', message: 'Categoria inválida.' }]);
  }
  return category_id;
}

// RF03: qualquer autenticado cria; requester_id vem do token, nunca do body.
function create(input, user) {
  const details = ticketFields(input, null);
  const category_id = input.category_id ?? null;
  if (category_id) categoryOrThrow(category_id);
  if (details.length) throw validationError(details);
  const ticket = tickets.create({
    title: input.title,
    description: input.description,
    priority: input.priority,
    requester_id: user.id,
    category_id,
  });
  history.add({ ticket_id: ticket.id, actor_id: user.id, event: 'ticket.created', before: null, after: 'open' });
  return ticket;
}

function getById(id, user) {
  const isAdmin = user.role === 'admin';
  const ticket = tickets.findById(id, isAdmin);
  if (!ticket) throw httpError(404, 'NOT_FOUND', 'Recurso não encontrado.');
  if (user.role === 'requester' && ticket.requester_id !== user.id) {
    throw httpError(403, 'FORBIDDEN', 'Ação não autorizada.');
  }
  return ticket;
}

// G1: solicitante vê os seus; técnico/admin veem todos.
function list(query, user) {
  const { status, priority, category_id, page, pageSize, order } = query || {};
  if (status && !STATUSES.includes(status)) {
    throw validationError([{ field: 'status', message: 'Status inválido.' }]);
  }
  if (priority && !PRIORITIES.includes(priority)) {
    throw validationError([{ field: 'priority', message: 'Prioridade inválida.' }]);
  }
  return tickets.list({
    status, priority, category_id,
    scopeUser: user.id, scopeRole: user.role,
    page, pageSize, order,
  });
}

// Técnico/admin mudam prioridade, responsável e categoria. Solicitante, não.
function update(id, input, user) {
  if (user.role === 'requester') {
    throw httpError(403, 'FORBIDDEN', 'Ação não autorizada.');
  }
  const ticket = tickets.findById(id, user.role === 'admin');
  if (!ticket) throw httpError(404, 'NOT_FOUND', 'Recurso não encontrado.');

  const changes = {};
  if (input.priority !== undefined) {
    if (!PRIORITIES.includes(input.priority)) {
      throw validationError([{ field: 'priority', message: 'Prioridade inválida.' }]);
    }
    if (input.priority !== ticket.priority) changes.priority = input.priority;
  }
  if (input.owner_id !== undefined) {
    const next = input.owner_id || null;
    if (next !== null) {
      const owner = users.findById(next);
      if (!owner || owner.role !== 'technician' || owner.active !== 1) {
        throw validationError([{ field: 'owner_id', message: 'Responsável precisa ser um técnico ativo.' }]);
      }
    }
    if (next !== ticket.owner_id) changes.owner_id = next;
  }
  if (input.category_id !== undefined) {
    const next = input.category_id || null;
    if (next) categoryOrThrow(next);
    if (next !== ticket.category_id) changes.category_id = next;
  }

  const updated = tickets.updateFields(id, changes);
  for (const [field, after] of Object.entries(changes)) {
    history.add({
      ticket_id: id, actor_id: user.id, event: `ticket.${field}.changed`,
      before: ticket[field], after,
    });
  }
  return updated;
}

module.exports = { create, getById, list, update };
