import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap";

export function ProdutosForm() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Dados do funcionário a serem enviados
    const produtoData = {
      Nome: nome,
      Quantidade: quantidade,
    };

    try {
      const produtoResponse = await axios.post(
        "http://localhost:3000/add-produto",
        produtoData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Produto adicionado:", produtoResponse.data);
      setMessage("Produto adicionado com sucesso");
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro ao adicionar o produto");
    }
  };

  return (
    <div className="App bg-info bg-gradient rounded-5 shadow-lg pt-4">
      <h1 className="text-white mx-3">Adicionar Produto</h1>
      <form className="form m-4 p-4" onSubmit={handleSubmit}>
        <div className="row">
          <label className="col-sm-2 col-form-label col-form-label-lg text-info-emphasis ">
            Nome:
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-lg mx-n5"
              type="text"
              name="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <label className="col-sm-2 col-form-label col-form-label-lg text-info-emphasis">
            Quantidade
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-lg"
              type="number"
              name="quantidade"
              value={quantidade}
              onChange={(event) => setQuantidade(Number(event.target.value))}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-lg btn-secondary">
          Enviar
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
