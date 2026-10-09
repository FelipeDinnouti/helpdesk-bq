const { ALLOWED, assertTransition } = require('../../src/services/transition-service');

describe('matriz de transição', () => {
  for (const [from, tos] of Object.entries(ALLOWED)) {
    for (const to of tos) {
      test(`permite ${from} -> ${to}`, () => {
        const comment = to === 'closed' || from === 'closed' ? 'justificativa' : '';
        expect(() => assertTransition(from, to, { role: 'technician', comment })).not.toThrow();
      });
    }
  }

  test('impede salto open -> closed', () => {
    expect(() => assertTransition('open', 'closed', { role: 'technician', comment: 'x' })).toThrow('Transição não permitida');
  });

  test('impede closed -> open', () => {
    expect(() => assertTransition('closed', 'open', { role: 'technician', comment: 'x' })).toThrow('Transição não permitida');
  });

  test('impede analysis -> resolved', () => {
    expect(() => assertTransition('analysis', 'resolved', { role: 'technician', comment: 'x' })).toThrow('Transição não permitida');
  });

  test('impede fechamento sem comentário', () => {
    expect(() => assertTransition('resolved', 'closed', { role: 'technician', comment: '' })).toThrow('comentário de resolução');
    expect(() => assertTransition('resolved', 'closed', { role: 'technician', comment: '   ' })).toThrow('comentário de resolução');
  });

  test('permite resolved -> closed com comentário', () => {
    expect(() => assertTransition('resolved', 'closed', { role: 'technician', comment: 'Resolvido' }));
  });

  test('impede reabertura por solicitante', () => {
    try {
      assertTransition('closed', 'in_progress', { role: 'requester', comment: 'quero reabrir' });
      throw new Error('devia ter lançado 403');
    } catch (err) {
      expect(err.status).toBe(403);
    }
  });

  test('reabertura por técnico exige justificativa', () => {
    expect(() => assertTransition('closed', 'in_progress', { role: 'technician', comment: '' })).toThrow('justificativa');
  });
});
