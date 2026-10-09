const { httpError } = require('../middlewares/error-handler');

// PD-04 + G8. Saltos proibidos dão 409; fechar exige comentário com texto;
// sair de closed exige técnico/admin com comentário.
const ALLOWED = {
  open: ['analysis'],
  analysis: ['in_progress'],
  in_progress: ['resolved'],
  resolved: ['closed', 'in_progress'],
  closed: ['in_progress'],
};

function assertTransition(from, to, { role, comment } = {}) {
  if (!ALLOWED[from] || !ALLOWED[from].includes(to)) {
    throw httpError(409, 'INVALID_STATE', 'Transição não permitida.');
  }
  const text = typeof comment === 'string' ? comment.trim() : '';
  if (to === 'closed' && text.length === 0) {
    throw httpError(409, 'RESOLUTION_COMMENT_REQUIRED', 'Fechar o chamado exige um comentário de resolução.');
  }
  if (from === 'closed' && to === 'in_progress') {
    if (role === 'requester') {
      throw httpError(403, 'FORBIDDEN', 'Ação não autorizada.');
    }
    if (text.length === 0) {
      throw httpError(409, 'RESOLUTION_COMMENT_REQUIRED', 'Reabrir o chamado exige um comentário de justificativa.');
    }
  }
  return text;
}

module.exports = { ALLOWED, assertTransition };
