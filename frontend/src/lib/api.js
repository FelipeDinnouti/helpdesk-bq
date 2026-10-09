// Cliente da API: fala o envelope { data } / { error } e nada mais.
// 401 global volta para /login (sessão inválida ou expirada).
const TOKEN_KEY = 'helpdesk.token';
const USER_KEY = 'helpdesk.user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function saveSession({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export class ApiError extends Error {
  constructor(status, body) {
    super(body?.error?.message || 'Não foi possível concluir.');
    this.status = status;
    this.code = body?.error?.code;
    this.correlationId = body?.error?.correlationId;
    this.details = body?.error?.details || [];
  }
}

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  let payload = null;
  try {
    payload = await res.json();
  } catch {
    throw new ApiError(res.status, null);
  }
  if (!res.ok) {
    if (res.status === 401 && !path.startsWith('/sessions')) {
      clearSession();
      window.location.href = '/login';
    }
    throw new ApiError(res.status, payload);
  }
  return payload.data;
}
