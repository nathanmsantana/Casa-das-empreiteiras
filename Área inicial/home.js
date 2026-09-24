const areaUsuario = document.getElementById("areaUsuario");

if (localStorage.getItem("adminLogado") === "true") {

    areaUsuario.innerHTML = `
        <img src="../Área do administrador/logo2.png"
             class="foto-admin">
    `;

}

if (localStorage.getItem("adminLogado") === "true") {

    areaUsuario.innerHTML = `
        <div class="perfil-admin">

            <img src="../Área do administrador/logo2.png" class="foto-admin">

            <div class="menu-perfil">

                <a href="../Área do administrador/adm.html">
                    Entrar na área de administrador
                </a>

                <button id="sairPerfil">
                    Sair do perfil
                </button>

            </div>

        </div>
    `;

    document.getElementById("sairPerfil").addEventListener("click", function() {
        localStorage.removeItem("adminLogado");
        location.reload();
    });

}