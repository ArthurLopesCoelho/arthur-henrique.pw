var arrayquant = [
    document.querySelector('#qtd1'),
    document.querySelector('#qtd2'),
    document.querySelector('#qtd3')
];

var arraytotal = [
    document.querySelector('#Total1'),
    document.querySelector('#Total2'),
    document.querySelector('#Total3')
];

var quantidade = [0, 0, 0];
var preços = [3600, 2000, 3700];
var subtotal = document.querySelector("#subtotal");
var sub = 0;

function calcularSubtotal() {
    sub = 0;
    var i = 0;

    while (i < 3) {
        sub = sub + (quantidade[i] * preços[i]);
        i++;
    }

    subtotal.innerHTML = sub.toFixed(2);
}

function mais(produto) {
    quantidade[produto]++;
    
    arrayquant[produto].innerHTML = quantidade[produto];
    arraytotal[produto].innerHTML = (preços[produto] * quantidade[produto]).toFixed(2);

    calcularSubtotal();
}

function menos(produto) {
    if (quantidade[produto] > 0) {
        quantidade[produto]--;

        arrayquant[produto].innerHTML = quantidade[produto];
        arraytotal[produto].innerHTML = (preços[produto] * quantidade[produto]).toFixed(2);

        calcularSubtotal();
    }
}