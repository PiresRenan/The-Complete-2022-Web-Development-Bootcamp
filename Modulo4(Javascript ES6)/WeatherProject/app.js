const express = require("express");
const https = require("https");
const bdParser = require("body-parser");
const app = express();

app.use(bdParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    req.body.pokemonName
    console.log("Post recebido");
});



// app.get("/", function(req, res) {

//     const pokemon = "ditto";
//     const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

//     https.get(url, function(response) {

//         console.log(response.statusCode);

//         const chunks = [];

//         response.on("data", function(data) {
//             chunks.push(data);
//         }).on('end', function() {
//             const data = Buffer.concat(chunks);
//             const pokeData = JSON.parse(data);
//             const name = pokeData.forms[0].name
//             res.write("<h1>O Pokemon " +  name + "</h1>");
//             res.write("So pra fazer funcionar o write.")
//             res.send()
//         });
        
//     });
// });

app.listen(3000, function() {
    console.log("Servidor on");
});
