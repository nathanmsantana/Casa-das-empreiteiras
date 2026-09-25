const pagamento = document.getElementById("pagamento");
const entrega = document.getElementById("entrega");
const dadosCartao = document.getElementById("dados-cartao");

const nomePessoa = document.getElementById("nome-pessoa");
const cpf = document.getElementById("cpf");

const numeroCartao = document.getElementById("numero-cartao");
const nomeCartao = document.getElementById("nome-cartao");
const validade = document.getElementById("validade");
const cvv = document.getElementById("cvv");

const quantidadeProduto = document.getElementById("quantidade-produto");

const nomeProduto = document.getElementById("nome-produto");
const modeloProduto = document.getElementById("modelo-produto");
const precoProduto = document.getElementById("preco-produto");
const subtotalProduto = document.getElementById("subtotal-produto");
const freteProduto = document.getElementById("frete-produto");
const totalProduto = document.getElementById("total-produto");

const finalizarCompra = document.getElementById("finalizar-compra");


const nomeCompra = localStorage.getItem("produtoCompra_nome");
const modeloCompra = localStorage.getItem("produtoCompra_modelo");
const precoCompra = localStorage.getItem("produtoCompra_preco");
const estoqueCompra = localStorage.getItem("produtoCompra_estoque");

let preco = 0;
let estoque = 0;


if (nomeCompra != null) {

    nomeProduto.textContent = "Produto: " + nomeCompra;

    modeloProduto.textContent = "Modelo: " + modeloCompra;

    preco = Number(precoCompra);
    estoque = Number(estoqueCompra);

    precoProduto.textContent = "Preço: R$ " + preco.toFixed(2).replace(".", ",");

    quantidadeProduto.max = estoque;

} else {

    nomeProduto.textContent = "Produto não encontrado";

    modeloProduto.textContent = "Modelo: --";

    precoProduto.textContent = "Preço: R$ 0,00";

}


function calcularTotal() {

    let quantidade = Number(quantidadeProduto.value);

    if (quantidade < 1 || quantidadeProduto.value == "") {

        quantidade = 1;

        quantidadeProduto.value = 1;

    }

    let frete = 0;

    if (entrega.value == "rapida") {

        frete = 7.99;

    }

    if (entrega.value == "padrao") {

        frete = 4.99;

    }

    const subtotal = preco * quantidade;

    const total = subtotal + frete;

    subtotalProduto.textContent = "Subtotal: R$ " + subtotal.toFixed(2).replace(".", ",");

    freteProduto.textContent = "Frete: R$ " + frete.toFixed(2).replace(".", ",");

    totalProduto.textContent = "Total: R$ " + total.toFixed(2).replace(".", ",");

}


quantidadeProduto.addEventListener("input", calcularTotal);

entrega.addEventListener("change", calcularTotal);


pagamento.addEventListener("change", function() {

    if (pagamento.value == "credito" || pagamento.value == "debito") {

        dadosCartao.style.display = "block";

    } else {

        dadosCartao.style.display = "none";

    }

});


finalizarCompra.addEventListener("click", function() {

    if (nomePessoa.value == "" ||
        cpf.value == "" ||
        entrega.value == "" ||
        pagamento.value == "") {

        alert("Preencha todos os campos obrigatórios.");

        return;

    }


    if (nomeCompra == null) {

        alert("Nenhum produto foi selecionado.");

        return;

    }


    if (quantidadeProduto.value == "" ||
        Number(quantidadeProduto.value) < 1) {

        alert("Escolha uma quantidade válida.");

        return;

    }


    if (Number(quantidadeProduto.value) > estoque) {

        alert("A quantidade escolhida é maior que o estoque disponível.");

        return;

    }


    if (pagamento.value == "credito" || pagamento.value == "debito") {

        if (numeroCartao.value == "" ||
            nomeCartao.value == "" ||
            validade.value == "" ||
            cvv.value == "") {

            alert("Preencha todos os dados do cartão.");

            return;

        }

    }


    calcularTotal();

    alert("Compra bem-sucedida!");

});


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