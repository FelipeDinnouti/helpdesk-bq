const { randomUUID } = require('node:crypto');
const bcrypt = require('bcryptjs');
const { httpError } = require('../middlewares/error-handler');
const users = require('../repositories/user-repository');

const ROLES = ['requester', 'technician', 'admin'];

// Só admin cria usuário. E-mail único; senha mínima de 6.
function createUser(input) {
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = typeof input.email === 'string' ? input.email.toLowerCase().trim() : '';
  const password = typeof input.password === 'string' ? input.password : '';
  const role = input.role;
  const details = [];
  if (name.length < 2) details.push({ field: 'name', message: 'Informe o nome.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) details.push({ field: 'email', message: 'Informe um e-mail válido.' });
  if (password.length < 6) details.push({ field: 'password', message: 'A senha precisa ter pelo menos 6 caracteres.' });
  if (!ROLES.includes(role)) details.push({ field: 'role', message: 'Perfil inválido.' });
  if (details.length) {
    const err = httpError(400, 'VALIDATION_ERROR', 'Revise os campos destacados.');
    err.details = details;
    throw err;
  }
  if (users.findByEmail(email)) {
    throw httpError(409, 'EMAIL_TAKEN', 'Este e-mail já está em uso.');
  }
  return users.create({
    id: randomUUID(), name, email,
    passwordHash: bcrypt.hashSync(password, 10), role,
  });
}

module.exports = { createUser };
