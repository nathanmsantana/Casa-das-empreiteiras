const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const modelo = document.getElementById("modelo");
const preco = document.getElementById("preco");
const estoque = document.getElementById("estoque");

const quantidade = document.getElementById("quantidade");

let totalProdutos = 0;
let produtoEditando = null;

const btnAdicionar = document.getElementById("botao");
const tabelaProduto = document.getElementById("tabela-produto");

btnAdicionar.addEventListener("click", adicionarProduto);

function adicionarProduto() {

const nomeProduto = nome.value;
const categoriaProduto = categoria.value;
const modeloProduto = modelo.value;
const precoProduto = preco.value;
const estoqueProduto = estoque.value;

if (nomeProduto == "" || categoriaProduto == "" || modeloProduto == "" || precoProduto == "" || estoqueProduto == "") {
    alert("Preencha todos os campos.");
    return;
}

let categoriaSalva = "";

if (categoriaProduto == "Construção") {
    categoriaSalva = "construcao";
}

if (categoriaProduto == "Elétrica") {
    categoriaSalva = "eletrica";
}

if (categoriaProduto == "Hidráulica") {
    categoriaSalva = "hidraulica";
}

const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];


if (produtoEditando == null) {

    produtosSalvos.push({
        id: Date.now(),
        nome: nomeProduto,
        categoria: categoriaSalva,
        modelo: modeloProduto,
        preco: precoProduto,
        estoque: estoqueProduto,
        imagem: "logo.png"
    });

} else {

    for (let i = 0; i < produtosSalvos.length; i++) {

        if (produtosSalvos[i].id == produtoEditando) {

            produtosSalvos[i].nome = nomeProduto;
            produtosSalvos[i].categoria = categoriaSalva;
            produtosSalvos[i].modelo = modeloProduto;
            produtosSalvos[i].preco = precoProduto;
            produtosSalvos[i].estoque = estoqueProduto;
            produtosSalvos[i].imagem = "logo.png";

        }

    }

    produtoEditando = null;
}

localStorage.setItem("produtos", JSON.stringify(produtosSalvos));

carregarProdutos();

nome.value = "";
categoria.value = "";
modelo.value = "";
preco.value = "";
estoque.value = "";

nome.focus();

}

function atualizarQuantidade() {

quantidade.textContent = "Quantidade de produtos: " + totalProdutos;

}

function carregarProdutos() {

tabelaProduto.innerHTML = "";
totalProdutos = 0;

const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];

for (let i = 0; i < produtosSalvos.length; i++) {

    const produto = produtosSalvos[i];

    if (!produto.id) {
        produto.id = Date.now() + i;
    }

    if (!produto.imagem) {
        produto.imagem = "logo.png";
    }

    const linha = document.createElement("tr");

    const colunaNome = document.createElement("td");
    colunaNome.textContent = produto.nome;

    const colunaCategoria = document.createElement("td");

    if (produto.categoria == "construcao") {
        colunaCategoria.textContent = "Construção";
    }

    if (produto.categoria == "eletrica") {
        colunaCategoria.textContent = "Elétrica";
    }

    if (produto.categoria == "hidraulica") {
        colunaCategoria.textContent = "Hidráulica";
    }

    const colunaModelo = document.createElement("td");
    colunaModelo.textContent = produto.modelo;

    const colunaPreco = document.createElement("td");
    colunaPreco.textContent = "R$ " + produto.preco;

    const colunaEstoque = document.createElement("td");
    colunaEstoque.textContent = produto.estoque;

    const colunaAcao = document.createElement("td");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("excluir");


    btnEditar.addEventListener("click", function() {

        nome.value = produto.nome;
        modelo.value = produto.modelo;
        preco.value = produto.preco;
        estoque.value = produto.estoque;

        if (produto.categoria == "construcao") {
            categoria.value = "Construção";
        }

        if (produto.categoria == "eletrica") {
            categoria.value = "Elétrica";
        }

        if (produto.categoria == "hidraulica") {
            categoria.value = "Hidráulica";
        }

        produtoEditando = produto.id;

        nome.focus();

    });


    btnExcluir.addEventListener("click", function() {

        const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];

        for (let j = 0; j < produtosSalvos.length; j++) {

            if (produtosSalvos[j].id == produto.id) {
                produtosSalvos.splice(j, 1);
                break;
            }

        }

        localStorage.setItem("produtos", JSON.stringify(produtosSalvos));

        produtoEditando = null;

        carregarProdutos();

    });


    colunaAcao.appendChild(btnEditar);
    colunaAcao.appendChild(btnExcluir);

    linha.appendChild(colunaNome);
    linha.appendChild(colunaCategoria);
    linha.appendChild(colunaModelo);
    linha.appendChild(colunaPreco);
    linha.appendChild(colunaEstoque);
    linha.appendChild(colunaAcao);

    tabelaProduto.appendChild(linha);

    totalProdutos++;

}

localStorage.setItem("produtos", JSON.stringify(produtosSalvos));

atualizarQuantidade();

}

carregarProdutos();

const areaUsuario = document.getElementById("areaUsuario");

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
