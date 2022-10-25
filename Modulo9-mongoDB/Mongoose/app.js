//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect( "mongodb://127.0.0.1:27017/fruitsDB", { useNewUrlParser: true } );

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Digite o nome da fruta"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "Manga",
    rating: 6,
    review: "Decent Fruit."
});

fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

Person.updateOne({name: "John"}, {favoriteFruit: fruit}, (err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log("FOI");
    }
});

// Person.deleteMany({name: "John"}, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Sucesso");
//     }
// });

const person = new Person({
    name: "John",
    age: 37,
    favoriteFruit: fruit
});

// person.save()

// const kiwi = new Fruit({
//     name: "kiwi",
//     rating: 10,
//     review: "The best."
// });

// const orange = new Fruit({
//     name: "orange",
//     rating: 4,
//     review: "Too sour."
// });

// const banana = new Fruit({
//     name: "banana",
//     rating: 3,
//     review: "Weird."
// });

// Fruit.insertMany([kiwi,orange,banana], (err)=>{
//     if(err){
//         console.log(err);
//     }else {
//         console.log("Success");
//     }
// });

// Fruit.find((err, response)=>{
//     if (err) {
//         console.log(err);
//     } else {

//         mongoose.connection.close();

//         response.forEach(element => {
//             var fruta = element.name;
//             console.log(fruta);
//         });
//     }
// });

// Fruit.updateOne({name: "banana"}, {name: "Banana"}, (err) => {
//     if(err){
//         console.log(err);
//     }else {
//         console.log("Feito");
//     }
// });

// Fruit.deleteOne({name: "Banana"}, (err) => {
//     if(err){
//         console.log(err);
//     }else {
//         mongoose.connection.close();
//         console.log("Feito");
//     }
// });
