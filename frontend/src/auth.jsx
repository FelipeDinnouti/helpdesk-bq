import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getUser, saveSession, clearSession } from './lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser());
  const navigate = useNavigate();

  async function login(email, password) {
    const data = await api('/sessions', { method: 'POST', body: { email, password } });
    saveSession(data);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    clearSession();
    setUser(null);
    navigate('/login');
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
