import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth.jsx';
import { Shell } from './components/shell.jsx';
import Login from './pages/Login.jsx';
import List from './pages/List.jsx';
import NewTicket from './pages/NewTicket.jsx';
import Detail from './pages/Detail.jsx';
import Dashboard from './pages/Dashboard.jsx';

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Protected><Shell /></Protected>}>
            <Route path="/" element={<Navigate to="/lista" replace />} />
            <Route path="/lista" element={<List />} />
            <Route path="/novo" element={<NewTicket />} />
            <Route path="/chamados/:id" element={<Detail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/lista" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
