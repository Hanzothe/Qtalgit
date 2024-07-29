import React from "react";
import { GerenciarEstoque } from "./gerenciarEstoque";
import { ProdutosForm } from "./ProdutosForm";

const EstoquePage = () => {
  return (
    <div>
      <h1>Gerenciar Estoque e Produtos</h1>
      <GerenciarEstoque />
      <ProdutosForm />
    </div>
  );
};

export default EstoquePage;
