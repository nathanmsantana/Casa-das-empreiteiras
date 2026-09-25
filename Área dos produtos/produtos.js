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

const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];

for (let i = 0; i < produtosSalvos.length; i++) {

const produto = produtosSalvos[i];

const novoProduto = document.createElement("div");
novoProduto.classList.add("produto-info");
novoProduto.setAttribute("data-categoria", produto.categoria);

const imagem = document.createElement("img");
imagem.src = "../Área do administrador/logo.png";
imagem.alt = produto.nome;

const nome = document.createElement("h2");
nome.textContent = produto.nome;

const modelo = document.createElement("p");
modelo.textContent = "Modelo: " + produto.modelo;

const preco = document.createElement("h3");
preco.textContent = "R$ " + produto.preco;

const estoque = document.createElement("div");
estoque.classList.add("estoque");

if (produto.estoque >= 100) {

    estoque.classList.add("estoque-alto");
    estoque.textContent = "Estoque: " + produto.estoque;

} else if (produto.estoque >= 30) {

    estoque.classList.add("estoque-medio");
    estoque.textContent = "Estoque: " + produto.estoque;

} else if (produto.estoque >= 1) {

    estoque.classList.add("estoque-baixo");
    estoque.textContent = "Estoque: " + produto.estoque;

} else {

    estoque.classList.add("estoque-zero");
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

