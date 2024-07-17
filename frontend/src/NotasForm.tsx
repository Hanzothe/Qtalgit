import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

interface Funcionario {
  _id: string;
  Nome: string;
}

export function NotasForm() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Buscar os funcionários do banco de dados
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-funcionarios"
        );
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setArquivo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!arquivo) {
      setMessage("Nenhum arquivo selecionado");
      return;
    }

    const formData = new FormData();
    formData.append("file", arquivo);

    try {
      // Primeiro envia o arquivo para a rota /upload
      const fileResponse = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Arquivo enviado:", fileResponse.data);
      setFileUrl(`http://localhost:3000/files/${fileResponse.data}`);

      // Envia os dados da nota para a rota /add-nota
      const notaData = {
        funcionario: selectedFuncionario,
        fileUrl: `http://localhost:3000/files/${fileResponse.data}`, // URL do arquivo
      };

      const notaResponse = await axios.post(
        "http://localhost:3000/add-nota",
        notaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Nota adicionada:", notaResponse.data);
      setMessage("Nota adicionada com sucesso");
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro ao enviar o arquivo ou adicionar a nota");
    }
  };

  return (
    <div className="App bg-info bg-gradient rounded-5 shadow-lg pt-4">
      <h1 className="text-white mx-3">Upload de Nota</h1>
      <form className="form m-4 p-4" onSubmit={handleSubmit}>
        <div className="row mb-4">
          <label className="col-sm-2 col-form-label col-form-label-lg text-info-emphasis">
            Funcionário:
          </label>
          <div className="col-sm-10">
            <select
              className="form-control form-control-lg"
              value={selectedFuncionario}
              onChange={(event) => setSelectedFuncionario(event.target.value)}
            >
              <option key="" value="">
                Selecione um funcionário
              </option>
              {funcionarios.map((funcionario) => (
                <option key={funcionario._id} value={funcionario._id}>
                  {funcionario.Nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-2 col-form-label col-form-label-lg text-info-emphasis">
            Arquivo:
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="file"
              name="arquivo"
              onChange={handleFileChange}
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
