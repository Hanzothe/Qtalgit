import React, { useState } from "react";
import { NotasForm } from "./NotasForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FuncionariosForm } from "./FuncionariosForm";

function App() {
  return (
    <div>
      <NotasForm />
      <FuncionariosForm />
    </div>
  );
}

export default App;
