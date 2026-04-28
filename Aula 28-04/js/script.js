var nome =prompt("Digite seu nome: ");
var media= parseInt(prompt("Digite sua média: "));
console.log(typeof media);
console.log(typeof nome);
if(isNaN(media)){
    console.log("Não é um número")
}
else if(media>7){
    console.log(nome,"Aprovado!");
}
else if((media>5) && (media<=7)){
    console.log(nome,"Recuperação!")
}

else{
    console.log(nome,"Reprovado!")
}