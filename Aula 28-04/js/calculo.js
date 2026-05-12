var n1 = document.querySelector('#n1');
var n2 = document.querySelector('#n2');
var resultado = document.querySelector('#resultado');
var idade_resultado = document.querySelector('#idade_resultado')
var numero = document.querySelector('#numero')
var paridade = document.querySelector('#paridade')

function somar(){
    resultado.innerHTML = Number(n1.value) + Number(n2.value);
}
function subtrair(){
    resultado.innerHTML = Number(n1.value) - Number(n2.value);
}
function multiplicar(){
    resultado.innerHTML = Number(n1.value) * Number(n2.value);

}

function dividir(){
    if(Number(n2.value)==0){
        resultado.innerHTML='Erro: Divisão por zero';
    }
    else{
        resultado.innerHTML = Number(n1.value)/ Number(n2.value);
    }
}
function triangulo(){
    resultado.innerHTML = (Number(n1.value) * Number(n2.value))/2;
}
function quadrado(){
    resultado.innerHTML = (Number(n1.value) * Number(n2.value));
}
var idade = document.querySelector('#idade');
function verificar(){
    if(Number(idade.value)<18){
        idade_resultado.innerHTML = "menor de idade"
    }
    else{
        idade_resultado.innerHTML = "maior de idade"
    }
}
function par_impar(){
    
    if((Number(numero.value)%2)==0){
            paridade.innerHTML= "Você digitou um número par, tente denovo"
        }
    else{
            paridade.innerHTML ="Você digitou um número ímpar!"
        }
    
}
function dez(){
    resultado.innerHTML = Number(n1.value) * 0.9;
}
function quinze(){
    resultado.innerHTML = Number(n1.value) * 1.15;
}
function tres(){
    resultado.innerHTML = Number(n1.value) * 0.97;
}
function imposto(){
    if(Number(n1.value) >1000){
        resultado.innerHTML=Number(n1.value)*0.93;
    }
    else if(Number(n1.value)<=500){
        if(Number(n1.value)>200){
            resultado.innerHTML=Number(n1.value)*1.05;}
        else{
            resultado.innerHTML=Number(n1.value)*1.05+" Boa compra!";
        }
    }
    
}