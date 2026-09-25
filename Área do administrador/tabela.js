const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const modelo = document.getElementById("modelo");
const preco = document.getElementById("preco");
const estoque = document.getElementById("estoque");

const quantidade = document.getElementById("quantidade");

let totalProdutos = 0;

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

const linha = document.createElement("tr");

const colunaNome = document.createElement("td");
colunaNome.textContent = nomeProduto;

const colunaCategoria = document.createElement("td");
colunaCategoria.textContent = categoriaProduto;

const colunaModelo = document.createElement("td");
colunaModelo.textContent = modeloProduto;

const colunaPreco = document.createElement("td");
colunaPreco.textContent = "R$ " + precoProduto;

const colunaEstoque = document.createElement("td");
colunaEstoque.textContent = estoqueProduto;

const colunaAcao = document.createElement("td");

const btnEditar = document.createElement("button");
btnEditar.textContent = "Editar";
btnEditar.classList.add("editar");

const btnExcluir = document.createElement("button");
btnExcluir.textContent = "Excluir";
btnExcluir.classList.add("excluir");

btnEditar.addEventListener("click", function() {

    nome.value = nomeProduto;
    categoria.value = categoriaProduto;
    modelo.value = modeloProduto;
    preco.value = precoProduto;
    estoque.value = estoqueProduto;

    linha.remove();

    totalProdutos--;

    atualizarQuantidade();
});

btnExcluir.addEventListener("click", function() {

    linha.remove();

    totalProdutos--;

    atualizarQuantidade();
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

atualizarQuantidade();

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
