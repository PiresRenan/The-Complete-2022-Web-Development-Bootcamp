import React from "react";
import ReactDOM from "react-dom";

const name = "Renan Pires";
const d = new Date();
const ano = d.getFullYear();

ReactDOM.render(
  <div>
    <p>Criado por {name}</p>
    <p>Copyright {ano}</p>
  </div>,
  document.getElementById("root")
);
