import React, { useState } from "react";
import { NotasForm } from "./NotasForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FuncionariosForm } from "./FuncionariosForm";
import { ExibirNotas } from "./ExibirNotas";
import { ProdutosForm } from "./ProdutosForm";
import { EstoqueChange } from "./updateEstoque";

function App() {
  return (
    <div>
      <ProdutosForm />
      <EstoqueChange />
      <ExibirNotas />
      <NotasForm />
      <FuncionariosForm />
    </div>
  );
}

export default App;
