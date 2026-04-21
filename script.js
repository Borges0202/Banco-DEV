function abrirConta() {

    let saldo = document.getElementById('saldo').value;


    saldo = saldo.replace(/[^0-9,]/g, '');
    if (saldo === "") {
        alert('Numero invalido ou ausente');
        return;
    }

    saldo = saldo.replace(',', '.');

    saldo = parseFloat(saldo);

    if (isNaN(saldo)) {
        alert('Numero invalido ou ausente');
        return;
    }

    localStorage.setItem("saldo", saldo);

    window.location.href = "depositoSaque.html";
}

function carregarSaldo() {
    let saldo = pegarSaldo();

    document.getElementById("saldo").innerText =
        saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

function deposito() {

    let saldo = pegarSaldo()

    let valorAuteracao = document.getElementById('valorAuteracao').value;

    valorAuteracao = valorAuteracao.replace(/[^0-9,]/g, '');

    if (valorAuteracao === "") {
        alert('Numero invalido ou ausente');
        return;
    }

    valorAuteracao = valorAuteracao.replace(',', '.');

    valorAuteracao = parseFloat(valorAuteracao);

    if (isNaN(valorAuteracao)) {
        alert('Numero invalido ou ausente');
        return;
    }

    saldo = saldo + valorAuteracao;

    localStorage.setItem("saldo", saldo);

    document.getElementById("saldo").innerText =
        saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    salvarHistorico("Depósito: +" + valorAuteracao.toFixed(2));

    mostrarExtrato();
    document.getElementById("valorAuteracao").value = "";
}

function saque() {

    let saldo = pegarSaldo()

    let valorAuteracao = document.getElementById('valorAuteracao').value;

    valorAuteracao = valorAuteracao.replace(/[^0-9,]/g, '');

    if (valorAuteracao === "") {
        alert('Numero invalido ou ausente');
        return;
    }

    valorAuteracao = valorAuteracao.replace(',', '.');

    valorAuteracao = parseFloat(valorAuteracao);

    if (isNaN(valorAuteracao)) {
        alert('Numero invalido ou ausente');
        return;
    }

    if (valorAuteracao > saldo) {
        alert("Saldo insuficiente");
        return;
    }
    saldo = saldo - valorAuteracao;

    localStorage.setItem("saldo", saldo);

    document.getElementById("saldo").innerText =
        saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    salvarHistorico("Saque: -" + valorAuteracao.toFixed(2));

    mostrarExtrato();
    document.getElementById("valorAuteracao").value = "";
}

function pegarSaldo() {
    return parseFloat(localStorage.getItem("saldo")) || 0;
}

function salvarHistorico(texto) {
    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    historico.push(texto);

    localStorage.setItem("historico", JSON.stringify(historico));
}

function mostrarExtrato() {
    let lista = document.getElementById("extrato");

    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    lista.innerHTML = "";

    historico.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        lista.appendChild(li);
    });
}