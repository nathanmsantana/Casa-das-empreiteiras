const loginForm = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "moises@gmail.com" && senha === "adm123") {

        localStorage.setItem("adminLogado", "true");

        window.location.href = "../Área do administrador/adm.html";

    } else {

        alert("Email ou senha incorretos. Por favor, tente novamente.");

    }
});