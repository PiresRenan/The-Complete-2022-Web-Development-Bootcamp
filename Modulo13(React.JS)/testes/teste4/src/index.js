import React from "react";
import ReactDOM from "react-dom";

const d = new Date();
const hora = d.getHours();
var hour = "";
const customStyle = {
  color: "red"
};

if (hora >= 0 && hora < 12) {
  hour = "Bom dia";
  customStyle.color = "red";
} else if (hora >= 12 && hora < 18) {
  hour = "Boa tarde";
  customStyle.color = "green";
} else {
  hour = "Boa noite";
  customStyle.color = "blue";
}

ReactDOM.render(
  <h1 style={customStyle}>{hour}</h1>,
  document.getElementById("root")
);
