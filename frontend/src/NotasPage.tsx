import React from "react";
import { NotasForm } from "./NotasForm";
import { ExibirNotas } from "./ExibirNotas";

const NotasPage = () => {
  return (
    <div style={{paddingTop: 875}}>
      <ExibirNotas />
      <h1>Notas</h1>
      <NotasForm />
    </div>
  );
};

export default NotasPage;
