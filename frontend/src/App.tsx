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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setArquivo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!arquivo) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("contato", contato);
    formData.append("cnpj", cnpj);
    formData.append("servico", servico);
    formData.append("file", arquivo);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
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
    </div>
  );
}

export default App;
