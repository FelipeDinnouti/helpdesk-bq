import { useState } from "react";
import "../styles/login.css";

function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Tela de login — visual fiel ao mock do print 1.
// MOCK temporário no submit só para demonstração do fluxo.
export default function Login() {
  const [email, setEmail] = useState("aluno@ete");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [stepsDone, setStepsDone] = useState({
    // Estado inicial replica o print: e-mail preenchido = etapa 1 concluída
    credentials: isEmailValid("aluno@ete"),
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
      // TODO(back): trocar o mock abaixo pelo fetch real. Contrato sugerido:
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: email.trim(), password }),
      // });
      // if (!res.ok) throw new Error(res.status === 401 ? "Credenciais inválidas." : "Falha no login.");
      // const data = await res.json(); // ex: { token, user }
      // setStepsDone({ credentials: true, session: true, dashboard: true });
      // window.location.href = "/dashboard";
      // return;

      // --- MOCK temporário só para demonstração do fluxo (remover quando ligar o back) ---
      await wait(500);
      setStepsDone((s) => ({ ...s, credentials: true }));
      await wait(500);
      setStepsDone((s) => ({ ...s, session: true }));
      await wait(500);
      setStepsDone((s) => ({ ...s, dashboard: true }));
      // --- fim do MOCK ---
    } catch (err) {
      setFeedback(err.message || "Não foi possível entrar. Tente de novo.");
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
          {/* TODO(back): ajustar este texto auxiliar / domínio quando o back definir */}
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
