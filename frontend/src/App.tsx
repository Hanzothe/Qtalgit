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

      // Depois envia os dados do formulário para a rota /add-emissor
      const emissorData = {
        Nome: nome,
        Email: email,
        Contato: contato,
        CNPJ: cnpj,
        Servico: servico,
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
    <div className="App">
      <h1>Upload de Arquivo com React e Multer</h1>
      <form onSubmit={handleSubmit}>
        <label className="label">
          Nome:
          <input
            type="text"
            name="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Contato:
          <input
            type="text"
            name="contato"
            value={contato}
            onChange={(event) => setContato(event.target.value)}
          />
        </label>
        <br />
        <label>
          CNPJ:
          <input
            type="text"
            name="cnpj"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
          />
        </label>
        <br />
        <label>
          Serviço:
          <input
            type="text"
            name="servico"
            value={servico}
            onChange={(event) => setServico(event.target.value)}
          />
        </label>
        <br />
        <label>
          Arquivo:
          <input type="file" name="arquivo" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
