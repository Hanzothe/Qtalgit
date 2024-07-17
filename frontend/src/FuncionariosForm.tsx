import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap";

export function FuncionariosForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [contato, setContato] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [servico, setServico] = useState("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Dados do funcionário a serem enviados
    const funcionarioData = {
      Nome: nome,
      Email: email,
      Contato: contato,
      CNPJ: cnpj,
      Servico: servico,
    };

    try {
      // Envia os dados do formulário para a rota /add-funcionario
      const funcionarioResponse = await axios.post(
        "http://localhost:3000/add-funcionario",
        funcionarioData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Funcionário adicionado:", funcionarioResponse.data);
      setMessage("Funcionário adicionado com sucesso");
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro ao adicionar o funcionário");
    }
  };

  return (
    <div className="App bg-info bg-gradient rounded-5 shadow-lg pt-4">
      <h1 className="text-white mx-3">Adicionar Funcionário</h1>
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
            Email:
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-lg "
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <label className="col-sm-2 col-form-label col-form-label-lg text-info-emphasis">
            Contato:
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-lg"
              type="text"
              name="contato"
              value={contato}
              onChange={(event) => setContato(event.target.value)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <label className="col-sm-2 colform-label col-form-label-lg text-info-emphasis">
            CNPJ:
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-lg"
              type="text"
              name="cnpj"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <label className="col-sm-2 colform-label col-form-label-lg text-info-emphasis">
            Serviço:
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-lg"
              type="text"
              name="servico"
              value={servico}
              onChange={(event) => setServico(event.target.value)}
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
