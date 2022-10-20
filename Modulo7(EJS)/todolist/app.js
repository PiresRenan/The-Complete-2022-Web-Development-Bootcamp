const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res) {
    var hoje = new Date();
    var diaDeHoje = hoje.getDay();
    if(diaDeHoje === 6 || diaDeHoje === 0){
        res.sendFile(__dirname + "/semanadia.html");
    }else{
        res.sendFile(__dirname + "fimdesemana.html");
    }
});

app.listen(3000, function() {
    console.log("Servidor conectado.");
});
