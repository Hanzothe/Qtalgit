import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

interface Produto {
  _id: string;
  Nome: string;
  Quantidade: number;
}

export function EstoqueChange() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduto, setSelectedProduto] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Buscar os produtos do banco de dados
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(
          "https://qtalgit.onrender.com/get-produtos"
        );
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const handleAdd = async () => {
    if (!selectedProduto || quantidade <= 0) {
      setMessage(
        "Selecione um produto e uma quantidade válida para adicionar."
      );
      return;
    }

    try {
      const response = await axios.patch(
        `https://qtalgit.onrender.com/update-produto/${selectedProduto}`,
        { quantidade: Math.abs(quantidade) } // Mantém positivo
      );

      console.log("Produto atualizado:", response.data);
      setMessage("Produto adicionado com sucesso");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      setMessage("Erro ao adicionar o produto");
    }
  };

  const handleRemove = async () => {
    if (!selectedProduto || quantidade <= 0) {
      setMessage("Selecione um produto e uma quantidade válida para remover.");
      return;
    }

    try {
      const response = await axios.patch(
        `https://qtalgit.onrender.com/update-produto/${selectedProduto}`,
        { quantidade: -Math.abs(quantidade) } // Muda para negativo
      );

      console.log("Produto atualizado:", response.data);
      setMessage("Produto removido com sucesso");
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      setMessage("Erro ao remover o produto");
    }
  };

  return (
    <div className="App bg-info bg-gradient rounded-5 shadow-lg pt-4">
      <h1 className="text-white mx-3">Atualizar Estoque</h1>
      <form className="form m-4 p-4">
        <div className="row mb-4">
          <label className="col-sm-2 col-form-label col-form-label-lg text-info-emphasis">
            Produto:
          </label>
          <div className="col-sm-10">
            <select
              className="form-control form-control-lg"
              value={selectedProduto}
              onChange={(event) => setSelectedProduto(event.target.value)}
            >
              <option key="" value="">
                Selecione um produto
              </option>
              {produtos.map((produto) => (
                <option key={produto._id} value={produto._id}>
                  {produto.Nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-2 col-form-label col-form-label-lg text-info-emphasis">
            Quantidade:
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-lg"
              type="number"
              value={quantidade}
              onChange={(event) => setQuantidade(Number(event.target.value))}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-sm-6">
            <button
              type="button"
              className="btn btn-lg btn-success"
              onClick={handleAdd}
            >
              Adicionar
            </button>
          </div>
          <div className="col-sm-6">
            <button
              type="button"
              className="btn btn-lg btn-danger"
              onClick={handleRemove}
            >
              Remover
            </button>
          </div>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
