
const express = require("express");
// usando o body-parser
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html"); //Usando __dirname para deixar a rota indentificar a rota de forma dinamica
});
app.get("/bmiCalculator", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html")
})


app.post("/", function(req, res) {
    var num1 = req.body.num1;
    var num2 = req.body.num2;
    var result = Number(num1) + Number(num2);
   res.send("<h1>O resultado é : " + result + "</h1>")
});

app.post("/bmiCalculator", function(req, res) {
    var altura = parseFloat(req.body.altura);
    var peso = parseFloat(req.body.peso);
    var result = peso / Math.pow(altura, 2);
    res.send("<center><h3>Seu indice de massa corporea é de " + result + " Kg/m.</h3></center>")
    
})

app.listen(3000, function() {
    console.log("Servidor rodando.");
});


// instalar "npm install body-parser" para vermos mais informações sobre o que tá rolando no html 