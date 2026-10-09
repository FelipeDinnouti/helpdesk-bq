const { ticketFields, commentBody } = require('../../src/lib/validate');

const base = {
  title: 'Título com tamanho suficiente',
  description: 'Descrição longa o suficiente para passar na validação mínima.',
  priority: 'high',
};

describe('validação de chamado', () => {
  for (const [len, valid] of [[9, false], [10, true], [100, true], [101, false]]) {
    test(`título com ${len} caracteres ${valid ? 'passa' : 'falha'}`, () => {
      const errs = ticketFields({ ...base, title: 'x'.repeat(len) });
      expect(errs.length === 0).toBe(valid);
    });
  }
  for (const [len, valid] of [[29, false], [30, true], [5000, true], [5001, false]]) {
    test(`descrição com ${len} caracteres ${valid ? 'passa' : 'falha'}`, () => {
      const errs = ticketFields({ ...base, description: 'x'.repeat(len) });
      expect(errs.length === 0).toBe(valid);
    });
  }
  test('prioridade desconhecida falha', () => {
    const errs = ticketFields({ ...base, priority: 'urgentíssima' });
    expect(errs[0].field).toBe('priority');
  });
  test('comentário com 1001 caracteres falha', () => {
    expect(commentBody('x'.repeat(1001))).toHaveLength(1);
    expect(commentBody('ok')).toHaveLength(0);
  });
});
