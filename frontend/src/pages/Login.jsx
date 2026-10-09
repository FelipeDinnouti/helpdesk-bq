import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";
import { ApiError } from "../lib/api.js";
import "../styles/login.css";

function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// Tela de login — visual fiel ao mock do print 1.
// Tela de login integrada à API real (POST /api/sessions).
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("lia@exemplo.local");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [stepsDone, setStepsDone] = useState({
    // Estado inicial replica o print: e-mail preenchido = etapa 1 concluída
    credentials: isEmailValid("lia@exemplo.local"),
    session: false,
    dashboard: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const emailOk = isEmailValid(email);
  const passwordOk = password.trim().length > 0;
  const canSubmit = emailOk && passwordOk && !submitting;

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    setFeedback("");
    // No print, digitar e-mail válido já marca a 1ª etapa:
    setStepsDone({ credentials: isEmailValid(value), session: false, dashboard: false });
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setFeedback("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setFeedback("");
    if (!emailOk || !passwordOk) return;

    setSubmitting(true);
    try {
      setStepsDone((s) => ({ ...s, credentials: true }));
      await login(email.trim(), password);
      setStepsDone((s) => ({ ...s, session: true, dashboard: true }));
      navigate("/lista", { replace: true });
      return;

    } catch (err) {
      if (err instanceof ApiError && err.code === "ACCOUNT_LOCKED") {
        setFeedback(
          `Conta bloqueada após tentativas inválidas. Tente de novo em alguns minutos.${err.correlationId ? ` Código de suporte: ${err.correlationId}.` : ""}`,
        );
      } else {
        setFeedback(err.message || "Não foi possível entrar. Tente de novo.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const steps = [
    { key: "credentials", label: "Credenciais válidas" },
    { key: "session", label: "Sessão criada" },
    { key: "dashboard", label: "Dashboard carregado" },
  ];

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <header className="login-card__header">
          <span className="login-card__brand">HelpDesk BQ</span>
          <span className="login-card__hint">acesso interno</span>
        </header>

        <div className="login-card__body">
          {/* Coluna do formulário */}
          <div className="login-form-col">
            <h1 id="login-title">Entrar no sistema</h1>

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="voce@exemplo.com"
                  autoComplete="username"
                  required
                  onChange={handleEmailChange}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                />
                {touched.email && !emailOk && (
                  <small className="field__error">Informe um e-mail válido.</small>
                )}
              </div>

              <div className="field">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  onChange={handlePasswordChange}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                />
                {touched.password && !passwordOk && (
                  <small className="field__error">Informe sua senha.</small>
                )}
              </div>

              <button type="submit" className="btn-entrar" disabled={!canSubmit}>
                {submitting ? "Entrando..." : "Entrar"}
              </button>

              {/* Mensagem de erro vinda do back (ex: 401) */}
              {feedback && (
                <p className="form-feedback" role="alert">
                  {feedback}
                </p>
              )}
            </form>
          </div>

          {/* Coluna do fluxo (mock visual do print) */}
          <aside className="login-flow-col" aria-label="Fluxo autenticado">
            <h2>Fluxo autenticado</h2>
            <ol className="flow-steps">
              {steps.map((step) => (
                <li
                  key={step.key}
                  className={`flow-step${stepsDone[step.key] ? " is-done" : ""}`}
                >
                  <span className="flow-step__dot" aria-hidden="true"></span>
                  <span>{step.label}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
}
