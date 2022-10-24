// https://ejs.co/

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {

    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("pt-BR", options);
    var novosItems = [];

    res.render("list", {
        kindOfDay: day,
        newListItem: novosItems
    })


    // var diaDeHoje = hoje.getDay();
    // var day = "";

    // switch (diaDeHoje) {
    //     case 0:
    //         day = "DOMINGO";
    //         res.render("list", { tipoDeDia : day } );
    //         break;
    //     case 1:
    //         day = "SEGUNDA-FEIRA";
    //         res.render("list", { tipoDeDia : day } );
    //         break;
    //     case 2:
    //         day = "TERÇA-FEIRA";
    //         res.render("list", { tipoDeDia : day } );
    //         break;
    //     case 3:
    //         day = "QUARTA-FEIRA";
    //         res.render("list", { tipoDeDia : day } );
    //         break;
    //     case 4:
    //         day = "QUINTA-FEIRA";
    //         res.render("list", { tipoDeDia : day } );
    //         break;
    //     case 5:
    //         day = "SEXTA-FEIRA";
    //         res.render("list", { tipoDeDia : day } );
    //         break;
    //     case 6:
    //         day = "SÁBADO";
    //         res.render("list", { tipoDeDia : day } );
    //         break;

    //     default:
    //         console.log("ERRO: O DIA VALOR DO DIA DE HOJE É: " + diaDeHoje);
    //         break;
    // }

});

app.post("/", (req, res) => {
    var novoItem = req.body.addList;
    novosItems.push(novoItem);
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Servidor conectado.");
});
