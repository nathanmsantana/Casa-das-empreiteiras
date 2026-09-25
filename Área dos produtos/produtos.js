const categorias = document.getElementById("categorias");
const produtos = document.getElementsByClassName("produto-info");
const listaProdutos = document.getElementById("lista-produtos");
const areaUsuario = document.getElementById("areaUsuario");

categorias.addEventListener("change", function() {

    const categoriaEscolhida = categorias.value;

    for (let i = 0; i < produtos.length; i++) {

        const categoriaProduto = produtos[i].getAttribute("data-categoria");

        if (categoriaEscolhida == "todos" || categoriaProduto == categoriaEscolhida) {
            produtos[i].style.display = "block";
        } else {
            produtos[i].style.display = "none";
        }
    }

});


const proximoProduto = Number(localStorage.getItem("proximoProduto")) || 0;

for (let i = 0; i < proximoProduto; i++) {

    const nomeProduto = localStorage.getItem("produto_" + i + "_nome");

    if (nomeProduto == null) {
        continue;
    }

    const categoriaProduto = localStorage.getItem("produto_" + i + "_categoria");
    const modeloProduto = localStorage.getItem("produto_" + i + "_modelo");
    const precoProduto = localStorage.getItem("produto_" + i + "_preco");
    const estoqueProduto = localStorage.getItem("produto_" + i + "_estoque");

    const novoProduto = document.createElement("div");
    novoProduto.classList.add("produto-info");
    novoProduto.setAttribute("data-categoria", categoriaProduto);

    const imagem = document.createElement("img");
    imagem.src = "../Área do administrador/logo.png";
    imagem.alt = nomeProduto;

    const nome = document.createElement("h2");
    nome.textContent = nomeProduto;

    const modelo = document.createElement("p");
    modelo.textContent = "Modelo: " + modeloProduto;

    const preco = document.createElement("h3");
    preco.textContent = "R$ " + precoProduto;

    const estoque = document.createElement("div");
    estoque.classList.add("estoque");

    if (Number(estoqueProduto) >= 100) {
        estoque.classList.add("estoque-alto");
    } else if (Number(estoqueProduto) >= 30) {
        estoque.classList.add("estoque-medio");
    } else if (Number(estoqueProduto) >= 1) {
        estoque.classList.add("estoque-baixo");
    } else {
        estoque.classList.add("estoque-zero");
    }

    if (Number(estoqueProduto) > 0) {
        estoque.textContent = "Estoque: " + estoqueProduto;
    } else {
        estoque.textContent = "Acabou o estoque";
    }

    const botao = document.createElement("button");
    botao.textContent = "Comprar";

    novoProduto.appendChild(imagem);
    novoProduto.appendChild(nome);
    novoProduto.appendChild(modelo);
    novoProduto.appendChild(preco);
    novoProduto.appendChild(estoque);
    novoProduto.appendChild(botao);

    listaProdutos.appendChild(novoProduto);
}


const botoesComprar = document.querySelectorAll(".produto-info button");

for (let i = 0; i < botoesComprar.length; i++) {

    botoesComprar[i].addEventListener("click", function() {

        const produto = botoesComprar[i].parentElement;

        const nomeProduto = produto.getElementsByTagName("h2")[0].textContent;
        const modeloProduto = produto.getElementsByTagName("p")[0].textContent.replace("Modelo: ", "");
        const precoProduto = produto.getElementsByTagName("h3")[0].textContent
            .replace("R$ ", "")
            .replace(",", ".");

        const textoEstoque = produto.getElementsByClassName("estoque")[0].textContent;

        let estoqueProduto = textoEstoque.replace("Estoque: ", "");

        if (textoEstoque == "Acabou o estoque") {
            estoqueProduto = 0;
        }

        localStorage.setItem("produtoCompra_nome", nomeProduto);
        localStorage.setItem("produtoCompra_modelo", modeloProduto);
        localStorage.setItem("produtoCompra_preco", precoProduto);
        localStorage.setItem("produtoCompra_estoque", estoqueProduto);

        window.location.href = "../Área de pagamento/pagamento.html";

    });

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