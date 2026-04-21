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

function carregarSaldo(){
    let saldo = localStorage.getItem("saldo");

    document.getElementById("saldo").innerText = saldo;
}
