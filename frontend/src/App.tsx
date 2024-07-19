import React, { useState } from "react";
import { NotasForm } from "./NotasForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FuncionariosForm } from "./FuncionariosForm";
import { ExibirNotas } from "./ExibirNotas";
import { ProdutosForm } from "./ProdutosForm";
import { EstoqueChange } from "./updateEstoque";
import { ExibirProdutos } from "./ExibirProdutos";

function App() {
  return (
    <div>
      <ProdutosForm />
      <EstoqueChange />
      <ExibirProdutos />
      {/* <ExibirNotas />
      <NotasForm />
      <FuncionariosForm /> */}
    </div>
  );
}

export default App;
