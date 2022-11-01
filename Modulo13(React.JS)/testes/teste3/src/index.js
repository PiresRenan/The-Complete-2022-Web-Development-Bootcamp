import React from "react";
import ReactDOM from "react-dom";

const name = "Renan Pires";
const d = new Date();
const ano = d.getFullYear();

ReactDOM.render(
  <div>
    <h1 className="heading">My favorite foods</h1>
    <div className="images">
      <img src="https://s2.glbimg.com/9sI4KLqD0-eC6xYAgxx4pCnqfPE=/0x0:1000x665/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/j/S/rczF0lTR2OJ2lx2nQH2w/churrasco.jpg" alt="churras"/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Sushi_platter.jpg" alt="sushi"/>
      <img src="https://claudia.abril.com.br/wp-content/uploads/2020/07/pizza-pepperoni.jpg" alt="pizza"/>
    </div>
  </div>,
  document.getElementById("root")
);
