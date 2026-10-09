// script da tela de login
// MOCK visual fiel ao print 1 + ganchos prontos para o back-end ligar a API real.
(function () {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("login-btn");
  const feedback = document.getElementById("form-feedback");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  const steps = {
    credentials: document.querySelector('[data-step="credentials"]'),
    session: document.querySelector('[data-step="session"]'),
    dashboard: document.querySelector('[data-step="dashboard"]'),
  };

  function isEmailValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function resetSteps() {
    Object.values(steps).forEach((el) => el && el.classList.remove("is-done"));
  }

  function markStep(name) {
    if (steps[name]) steps[name].classList.add("is-done");
  }

  function updateButtonState() {
    const ok =
      isEmailValid(emailInput.value) && passwordInput.value.trim().length > 0;
    submitBtn.disabled = !ok;
  }

  function showFeedback(message) {
    feedback.textContent = message;
    feedback.hidden = !message;
  }

  emailInput.addEventListener("input", () => {
    emailError.hidden = isEmailValid(emailInput.value) || emailInput.value === "";
    resetSteps();
    // No print, digitar e-mail válido já marca a 1ª etapa:
    if (isEmailValid(emailInput.value)) markStep("credentials");
    updateButtonState();
    showFeedback("");
  });

  passwordInput.addEventListener("input", () => {
    passwordError.hidden = passwordInput.value.trim().length > 0;
    updateButtonState();
    showFeedback("");
  });

  // Estado inicial replica o print: e-mail preenchido = etapa 1 concluída
  if (isEmailValid(emailInput.value)) markStep("credentials");
  updateButtonState();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showFeedback("");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;
    if (!isEmailValid(email)) {
      emailError.hidden = false;
      hasError = true;
    }
    if (!password) {
      passwordError.hidden = false;
      hasError = true;
    }
    if (hasError) {
      updateButtonState();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Entrando...";

    try {
      // TODO(back): trocar o mock abaixo pelo fetch real. Contrato sugerido:
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error(res.status === 401 ? "Credenciais inválidas." : "Falha no login.");
      // const data = await res.json(); // ex: { token, user }
      // markStep("session"); markStep("dashboard");
      // window.location.href = "/dashboard.html";
      // return;

      // --- MOCK temporário só para demonstração do fluxo (remover quando ligar o back) ---
      await new Promise((r) => setTimeout(r, 500));
      markStep("credentials");
      await new Promise((r) => setTimeout(r, 500));
      markStep("session");
      await new Promise((r) => setTimeout(r, 500));
      markStep("dashboard");
      // --- fim do MOCK ---
    } catch (err) {
      showFeedback(err.message || "Não foi possível entrar. Tente de novo.");
    } finally {
      submitBtn.textContent = "Entrar";
      updateButtonState();
    }
  });
})();
