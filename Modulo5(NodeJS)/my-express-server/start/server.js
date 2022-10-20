//jshint esversion:6
// criando um objeto pra carregar os atributos da lib express
const express = require("express");
// criando um objeto que usa o obejto que contem a lib express, por boas praticas
const app = express();

// criando algo para ser enviado para o metodo GET do servidor
app.get("/", function(request, response) {
    // console.log(request); irá verificar que não há nada sendo requerido e enviará mensagem de erro no console.
    response.send("<h1>OI MUNDO</h1>");
});

// usando outra route 
app.get("/contact", function(req, res) {
    res.send("Contate-me no email Renan.sp.121@hotmail.com")
});
app.get("/about", function(req, res) {
    res.send("Olá sou Renan, tenho 26 anos e sou desenvolverdor de software bakend.")
});
app.get("/hobbies", function(req, res) {
    res.send("<ul><li>Cerveja</li><li>Ler</li><li>Codar</li></ul>")
});



// abrindo um servidor , selecionando a porta que ele irá rodar
app.listen(3000, function() {
    console.log("Servidor está rodando na porta 3000")
    // Teste no localhost:3000
});

// Instalação do Nodemon, facilitador de começar servidores, comando "npm install -g nodemon", ou "sudo npm install -g nodemon"
// Caso der erro use o comando "npm i pstree.remy@1.1.0 -D"
// para usar o nodemon é só colocar "nodemon <nome do arquivo que contém o servidor>, facilita o debug a cada save no codigo"