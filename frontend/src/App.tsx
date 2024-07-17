import React, { useState } from "react";
import { NotasForm } from "./NotasForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FuncionariosForm } from "./FuncionariosForm";
import { ExibirNotas } from "./ExibirNotas";

function App() {
  return (
    <div>
      <ExibirNotas />
      <NotasForm />
      <FuncionariosForm />
    </div>
  );
}

export default App;
