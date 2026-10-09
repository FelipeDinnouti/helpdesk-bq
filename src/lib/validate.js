// Validadores devolvem [{ field, message }] em pt-BR, ou [] quando válido.
// O 400 carrega isso em error.details (extensão documentada do envelope).
const PRIORITIES = ['low', 'medium', 'high', 'critical'];
const STATUSES = ['open', 'analysis', 'in_progress', 'resolved', 'closed'];

function ticketFields({ title, description, priority }, categories) {
  const errors = [];
  const t = typeof title === 'string' ? title.trim() : '';
  if (t.length < 10 || t.length > 100) {
    errors.push({ field: 'title', message: 'O título precisa ter entre 10 e 100 caracteres.' });
  }
  const d = typeof description === 'string' ? description.trim() : '';
  if (d.length < 30 || d.length > 5000) {
    errors.push({ field: 'description', message: 'A descrição precisa ter entre 30 e 5000 caracteres.' });
  }
  if (!PRIORITIES.includes(priority)) {
    errors.push({ field: 'priority', message: 'A prioridade precisa ser baixa, média, alta ou crítica.' });
  }
  return errors;
}

function commentBody(body) {
  const errors = [];
  const b = typeof body === 'string' ? body.trim() : '';
  if (b.length < 1 || b.length > 1000) {
    errors.push({ field: 'body', message: 'O comentário precisa ter entre 1 e 1000 caracteres.' });
  }
  return errors;
}

module.exports = { PRIORITIES, STATUSES, ticketFields, commentBody };
