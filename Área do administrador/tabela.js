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


    if (produtoEditando == null) {

        let proximoProduto = Number(localStorage.getItem("proximoProduto")) || 0;

        localStorage.setItem("produto_" + proximoProduto + "_nome", nomeProduto);
        localStorage.setItem("produto_" + proximoProduto + "_categoria", categoriaSalva);
        localStorage.setItem("produto_" + proximoProduto + "_modelo", modeloProduto);
        localStorage.setItem("produto_" + proximoProduto + "_preco", precoProduto);
        localStorage.setItem("produto_" + proximoProduto + "_estoque", estoqueProduto);
        localStorage.setItem("produto_" + proximoProduto + "_imagem", "logo.png");

        proximoProduto++;

        localStorage.setItem("proximoProduto", proximoProduto);

    } else {

        localStorage.setItem("produto_" + produtoEditando + "_nome", nomeProduto);
        localStorage.setItem("produto_" + produtoEditando + "_categoria", categoriaSalva);
        localStorage.setItem("produto_" + produtoEditando + "_modelo", modeloProduto);
        localStorage.setItem("produto_" + produtoEditando + "_preco", precoProduto);
        localStorage.setItem("produto_" + produtoEditando + "_estoque", estoqueProduto);
        localStorage.setItem("produto_" + produtoEditando + "_imagem", "logo.png");

        produtoEditando = null;
    }

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

        const linha = document.createElement("tr");

        const colunaNome = document.createElement("td");
        colunaNome.textContent = nomeProduto;

        const colunaCategoria = document.createElement("td");

        if (categoriaProduto == "construcao") {
            colunaCategoria.textContent = "Construção";
        }

        if (categoriaProduto == "eletrica") {
            colunaCategoria.textContent = "Elétrica";
        }

        if (categoriaProduto == "hidraulica") {
            colunaCategoria.textContent = "Hidráulica";
        }

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
            modelo.value = modeloProduto;
            preco.value = precoProduto;
            estoque.value = estoqueProduto;

            if (categoriaProduto == "construcao") {
                categoria.value = "Construção";
            }

            if (categoriaProduto == "eletrica") {
                categoria.value = "Elétrica";
            }

            if (categoriaProduto == "hidraulica") {
                categoria.value = "Hidráulica";
            }

            produtoEditando = i;

            nome.focus();

        });


        btnExcluir.addEventListener("click", function() {

            localStorage.removeItem("produto_" + i + "_nome");
            localStorage.removeItem("produto_" + i + "_categoria");
            localStorage.removeItem("produto_" + i + "_modelo");
            localStorage.removeItem("produto_" + i + "_preco");
            localStorage.removeItem("produto_" + i + "_estoque");
            localStorage.removeItem("produto_" + i + "_imagem");

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