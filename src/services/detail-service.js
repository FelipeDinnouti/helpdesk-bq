const db = require('../../db/db');
const { httpError } = require('../middlewares/error-handler');
const { commentBody } = require('../lib/validate');
const tickets = require('../repositories/ticket-repository');
const comments = require('../repositories/comment-repository');
const history = require('../repositories/history-repository');
const ticketService = require('./ticket-service');
const { assertTransition } = require('./transition-service');

function validationError(details) {
  const err = httpError(400, 'VALIDATION_ERROR', 'Revise os campos destacados.');
  err.details = details;
  return err;
}

// PATCH /:id/status — técnico/admin. Transação única: status + comentário +
// histórico. Solicitante nunca muda status.
function changeStatus(id, input, user) {
  if (user.role === 'requester') {
    throw httpError(403, 'FORBIDDEN', 'Ação não autorizada.');
  }
  const ticket = tickets.findById(id, user.role === 'admin');
  if (!ticket) throw httpError(404, 'NOT_FOUND', 'Recurso não encontrado.');

  const to = input.status;
  const text = assertTransition(ticket.status, to, { role: user.role, comment: input.comment });

  // RF12: crítico só fecha com comentário de resolução — assertTransition já
  // exige comentário para qualquer fechamento; aqui vale para todo perfil.
  const run = db.transaction(() => {
    tickets.updateFields(id, {});
    db.prepare('UPDATE tickets SET status = ?, updated_at = ? WHERE id = ?')
      .run(to, new Date().toISOString(), id);
    let comment = null;
    if (text.length > 0) {
      comment = comments.add({ ticket_id: id, author_id: user.id, body: text });
      history.add({ ticket_id: id, actor_id: user.id, event: 'ticket.comment.added', before: null, after: null });
    }
    history.add({ ticket_id: id, actor_id: user.id, event: 'ticket.status.changed', before: ticket.status, after: to });
    return comment;
  });
  run();
  return tickets.findById(id, true);
}

function canComment(ticket, user) {
  if (user.role !== 'requester') return true;
  return ticket.requester_id === user.id;
}

function addComment(id, input, user) {
  const ticket = tickets.findById(id, user.role === 'admin');
  if (!ticket) throw httpError(404, 'NOT_FOUND', 'Recurso não encontrado.');
  if (!canComment(ticket, user)) {
    throw httpError(403, 'FORBIDDEN', 'Ação não autorizada.');
  }
  const details = commentBody(input.body);
  if (details.length) throw validationError(details);
  const comment = comments.add({ ticket_id: id, author_id: user.id, body: input.body });
  history.add({ ticket_id: id, actor_id: user.id, event: 'ticket.comment.added', before: null, after: null });
  return comment;
}

function listComments(id, user) {
  const ticket = tickets.findById(id, user.role === 'admin');
  if (!ticket) throw httpError(404, 'NOT_FOUND', 'Recurso não encontrado.');
  if (!canComment(ticket, user)) {
    throw httpError(403, 'FORBIDDEN', 'Ação não autorizada.');
  }
  return comments.forTicket(id);
}

function listHistory(id, user) {
  const ticket = ticketService.getById(id, user);
  return history.forTicket(ticket.id);
}

// G6: soft delete. Só admin, com justificativa obrigatória.
function remove(id, input, user) {
  if (user.role !== 'admin') {
    throw httpError(403, 'FORBIDDEN', 'Ação não autorizada.');
  }
  const justification = typeof input.justification === 'string' ? input.justification.trim() : '';
  if (justification.length === 0) {
    throw validationError([{ field: 'justification', message: 'A exclusão exige uma justificativa.' }]);
  }
  const ticket = tickets.findById(id, true);
  if (!ticket || ticket.deleted_at) {
    throw httpError(404, 'NOT_FOUND', 'Recurso não encontrado.');
  }
  tickets.softDelete(id);
  history.add({ ticket_id: id, actor_id: user.id, event: 'ticket.deleted', before: ticket.status, after: justification });
  return { id, deleted: true };
}

module.exports = { changeStatus, addComment, listComments, listHistory, remove };
