//jshint esversion:6

const mongoose = require("mongoose");

mongoose.connect( "mongodb://localhost:27017/testeDB", { useNewUrlParser: true } );

const testeSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Teste = mongoose.model("Teste", testeSchema);

const teste = new Teste ({
    name: "Banana",
    rating: 5,
    review: "Muito bao"
});

teste.save();