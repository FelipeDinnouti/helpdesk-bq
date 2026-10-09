import "../styles/novochamado.css";

export default function NovoChamado() {
  return (
    <div className="hd-page">
      <div className="hd-top" />
      <header className="hd-header">
        <strong>HelpDesk BQ</strong>
        <span>pa.log@toc.sp.gov.br</span>
      </header>

      <div className="hd-layout">
        <aside className="hd-side">
          <nav>
            <a href="#">Visão geral</a>
            <a href="#" className="active">Chamados</a>
            <a href="#">Relatórios</a>
            <a href="#">Equipe</a>
          </nav>
        </aside>

        <main className="hd-main">
          <h1>Novo chamado</h1>

          <div className="hd-grid">
            <div>
              <div className="hd-field">
                <label className="hd-label" htmlFor="titulo">Título</label>
                <input id="titulo" className="hd-input" type="text" placeholder="" />
              </div>
              <div className="hd-field">
                <label className="hd-label" htmlFor="desc">Descrição</label>
                <textarea id="desc" className="hd-input" rows={2} placeholder="" />
              </div>
            </div>

            <div>
              <div className="hd-field">
                <label className="hd-label">Prioridade</label>
                <div className="hd-prio">Crítica</div>
              </div>
              <button className="hd-btn" type="button">Abrir chamado</button>
            </div>
          </div>

          {/* Back-end: exibir toast de sucesso aqui após criar o chamado */}
        </main>
      </div>
    </div>
  );
}