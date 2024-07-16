import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [contato, setContato] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [servico, setServico] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setArquivo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!arquivo) {
      setMessage("No file selected");
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

      console.log("File uploaded:", fileResponse.data);
      setFileUrl(`http://localhost:3000/files/${fileResponse.data}`);

      // Depois envia os dados do formulário para a rota /add-emissor
      const emissorData = {
        Nome: nome,
        Email: email,
        Contato: contato,
        CNPJ: cnpj,
        Servico: servico,
        fileUrl: `http://localhost:3000/files/${fileResponse.data}`, // URL do arquivo
      };

      const emissorResponse = await axios.post(
        "http://localhost:3000/add-emissor",
        emissorData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Emissor added:", emissorResponse.data);
      setMessage("Emissor added successfully");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error uploading file or adding emissor");
    }
  };

  return (
    <div className="App bg-info bg-gradient rounded-5 shadow-lg pt-4">
      <h1 className="text-white mx-3">Upload de Arquivo com React e Multer</h1>
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

        <div className="row mt-2 mb-4 ">
          <label className="col-sm-2 colform-label col-form-label-lg text-info-emphasis">
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

export default App;
