const { randomUUID } = require('node:crypto');
const bcrypt = require('bcryptjs');


// Seed determinístico e rotulado: recria a demonstração do zero.
// Usuários fictícios, sem nenhum dado pessoal real.
const now = () => new Date().toISOString();
const PASSWORD = bcrypt.hashSync('senha123', 10);

function reset(db) {
  db.exec('DELETE FROM login_attempts');
  db.exec('DELETE FROM ticket_history');
  db.exec('DELETE FROM comments');
  db.exec('DELETE FROM tickets');
  db.exec('DELETE FROM categories');
  db.exec('DELETE FROM users');
}

function seed(db) {
  reset(db);
  const insertUser = db.prepare(
    'INSERT INTO users (id, name, email, password_hash, role, active, created_at) VALUES (?, ?, ?, ?, ?, 1, ?)',
  );
  const users = {
    admin: { id: 'u-admin', name: 'Admin', email: 'admin@exemplo.local', role: 'admin' },
    tecnico: { id: 'u-tecnico', name: 'Rafael Técnico', email: 'tecnico@exemplo.local', role: 'technician' },
    lia: { id: 'u-lia', name: 'Lia Solicitante', email: 'lia@exemplo.local', role: 'requester' },
  };
  for (const u of Object.values(users)) {
    insertUser.run(u.id, u.name, u.email, PASSWORD, u.role, now());
  }

  const insertCategory = db.prepare(
    'INSERT INTO categories (id, name, active) VALUES (?, ?, 1)',
  );
  const categories = ['Hardware', 'Software', 'Rede', 'Acesso', 'Impressão'];
  const catIds = {};
  for (const name of categories) {
    const id = `c-${name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`;
    insertCategory.run(id, name);
    catIds[name] = id;
  }

  const insertTicket = db.prepare(`INSERT INTO tickets
    (id, title, description, priority, status, requester_id, owner_id, category_id, deleted_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?)`);
  const insertHistory = db.prepare(`INSERT INTO ticket_history
    (id, ticket_id, actor_id, event, before, after, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insertComment = db.prepare(`INSERT INTO comments
    (id, ticket_id, author_id, body, created_at) VALUES (?, ?, ?, ?, ?)`);

  // 12 chamados: 3 abertos, 3 em análise, 3 em atendimento, 2 resolvidos, 1 fechado.
  const tickets = [
    ['Projetor da sala 12 não liga de jeito nenhum', 'O projetor da sala 12 não responde ao controle nem ao botão do aparelho. A turma ficou sem apresentação hoje.', 'high', 'open', 'Hardware', null],
    ['Wi-Fi do laboratório cai a cada dez minutos', 'A rede sem fio do laboratório 1 desconecta todos os notebooks a cada dez minutos, interrompendo as atividades.', 'medium', 'open', 'Rede', null],
    ['Preciso de acesso ao sistema de lançamento de notas', 'Sou professora nova e ainda não tenho usuário no sistema de lançamento de notas do bimestre.', 'low', 'open', 'Acesso', null],
    ['Computadores do laboratório 2 não inicializam', 'Cinco máquinas do laboratório 2 travam na tela inicial e não carregam o sistema operacional.', 'critical', 'analysis', 'Hardware', 'tecnico'],
    ['Impressora da secretaria atolando papel direto', 'A impressora da secretaria atola papel em quase toda impressão frente e verso desde segunda-feira.', 'high', 'analysis', 'Impressão', 'tecnico'],
    ['Antivírus desatualizado nos PCs da biblioteca', 'Os computadores da biblioteca exibem aviso de definições desatualizadas há mais de duas semanas.', 'medium', 'analysis', 'Software', null],
    ['Internet da sala dos professores cai e volta', 'A conexão da sala dos professores oscila durante todo o dia, derrubando chamadas e o diário online.', 'high', 'in_progress', 'Rede', 'tecnico'],
    ['Teclados do laboratório 1 com teclas faltando', 'Quatro teclados do laboratório 1 estão sem teclas essenciais e dificultam a digitação dos alunos.', 'medium', 'in_progress', 'Hardware', 'tecnico'],
    ['Instalar editor de texto nos notebooks novos', 'Os dez notebooks novos chegaram sem editor de texto instalado e precisam estar prontos até sexta.', 'low', 'in_progress', 'Software', 'tecnico'],
    ['Conta institucional bloqueada antes da prova', 'Minha conta institucional foi bloqueada na véspera da aplicação da prova online e preciso recuperar o acesso.', 'critical', 'resolved', 'Acesso', 'tecnico'],
    ['Trocar o toner da impressora da diretoria', 'A impressora da diretoria está imprimindo falhado e o painel indica toner baixo.', 'medium', 'resolved', 'Impressão', 'tecnico'],
    ['Monitor queimado na sala 7 precisa de troca', 'O monitor da mesa do professor na sala 7 queimou durante a aula e precisa ser substituído.', 'high', 'closed', 'Hardware', 'tecnico'],
  ];

  const chain = {
    open: ['open'],
    analysis: ['open', 'analysis'],
    in_progress: ['open', 'analysis', 'in_progress'],
    resolved: ['open', 'analysis', 'in_progress', 'resolved'],
    closed: ['open', 'analysis', 'in_progress', 'resolved', 'closed'],
  };

  for (const [title, description, priority, status, category, owner] of tickets) {
    const id = randomUUID();
    const ts = now();
    insertTicket.run(id, title, description, priority, status, users.lia.id,
      owner ? users[owner].id : null, catIds[category], ts, ts);
    insertHistory.run(randomUUID(), id, users.lia.id, 'ticket.created', null, 'open', ts);
    const steps = chain[status];
    for (let i = 1; i < steps.length; i += 1) {
      insertHistory.run(randomUUID(), id, users.tecnico.id, 'ticket.status.changed',
        steps[i - 1], steps[i], ts);
    }
    if (status === 'resolved' || status === 'closed') {
      insertComment.run(randomUUID(), id, users.tecnico.id,
        'Atendimento concluído e solução confirmada com a solicitante.', ts);
      insertHistory.run(randomUUID(), id, users.tecnico.id, 'ticket.comment.added',
        null, null, ts);
    }
  }

  const counts = db.prepare('SELECT status, COUNT(*) AS n FROM tickets GROUP BY status').all();
  console.log('seed ok:', JSON.stringify(counts));
}

if (require.main === module) {
  seed(require('./db'));
}

module.exports = { seed };
