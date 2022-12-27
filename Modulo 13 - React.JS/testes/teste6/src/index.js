import React from "react";
import ReactDOM from "react-dom";
import {add, multiplicar, dividir, sub} from "./calculator"


ReactDOM.render(
  <ul>
  <li>{add(1,2)}</li>
  <li>{multiplicar(2,3)}</li>
  <li>{dividir(7,2)}</li>
  <li>{sub(5,2)}</li>
  </ul>,
  document.getElementById("root")
)