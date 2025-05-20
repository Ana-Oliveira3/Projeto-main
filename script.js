function cadastrar() {
  const email = document.getElementById("cadastro-email").value.trim();
  const senha = document.getElementById("cadastro-password").value.trim();
  const confirmar = document.getElementById("confirmar-senha").value.trim();

  if (!email || !senha || !confirmar) {
    alert("Preencha todos os campos.");
    return;
  }

  if (senha !== confirmar) {
    alert("As senhas não coincidem.");
    return;
  }

  localStorage.setItem("usuarioEmail", email);
  localStorage.setItem("usuarioSenha", senha);
  localStorage.setItem("usuarioLogado", "true");

  alert("Cadastro realizado com sucesso!");
  window.location.href = "index.html";
}

function mostrarLogin() {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-password").value.trim();

  const emailSalvo = localStorage.getItem("usuarioEmail");
  const senhaSalva = localStorage.getItem("usuarioSenha");

  if (!email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  if (email === emailSalvo && senha === senhaSalva) {
    localStorage.setItem("usuarioLogado", "true");
    alert("Login realizado com sucesso!");
    window.location.href = "inicial.html";
  } else {
    alert("Email ou senha incorretos.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const protegido = document.body.dataset.protegido;
  if (protegido === "true" && localStorage.getItem("usuarioLogado") !== "true") {
    alert("Você precisa estar logado para acessar essa página.");
    window.location.href = "index.html";
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAvaliacao");
  const lista = document.getElementById("listaAvaliacoes");
  const jogoId = document.body.dataset.jogo;

  if (form && lista && jogoId) {
    const carregarAvaliacoes = () => {
      lista.innerHTML = "";
      const avaliacoes = JSON.parse(localStorage.getItem(`avaliacoes-${jogoId}`) || "[]");

      avaliacoes.forEach(av => {
        const div = document.createElement("div");
        div.classList.add("comentario");
        div.innerHTML = `
          <p><strong>${av.nome}</strong> — ${"⭐".repeat(av.nota)}</p>
          <p>${av.comentario}</p>
        `;
        lista.appendChild(div);
      });
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const nota = parseInt(document.getElementById("nota").value);
      const comentario = document.getElementById("comentario").value.trim();

      if (!nome || !nota || !comentario) return;

      const novaAvaliacao = { nome, nota, comentario };

      const avaliacoes = JSON.parse(localStorage.getItem(`avaliacoes-${jogoId}`) || "[]");
      avaliacoes.push(novaAvaliacao);
      localStorage.setItem(`avaliacoes-${jogoId}`, JSON.stringify(avaliacoes));

      form.reset();
      carregarAvaliacoes();
    });

    carregarAvaliacoes();
  }
});




