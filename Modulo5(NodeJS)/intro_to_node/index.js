// usando o comando node, podemos usar o node no terminal
// usando node + nome do arquivo, podemos rodar ele no console para debug

// const fs = require('fs');

// Usando o package ja existente no node para copiar arquivos
// fs.copyFileSync("file1.txt", "file2.txt");

// devemos iniciar um projeto node com o comando npm init e preencher os campos para que seja gerado o package.json

// instalar packages externos por npm install "nome do package"
var sh = require('superheroes');
console.log(sh.random());
