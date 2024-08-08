import React from "react";
import { NotasForm } from "./NotasForm";
import { ExibirNotas } from "./ExibirNotas";
import ProjectSelector from "./SeletorProjeto";

const NotasPage = () => {
  return (
    <div className="notasPage">
      <ProjectSelector/>
      <ExibirNotas />
      <h1>Notas</h1>
      <NotasForm />
    </div>
  );
};

export default NotasPage;
