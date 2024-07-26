import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Alert, Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import InputMask from 'react-input-mask';

interface Funcionario {
  _id: string;
  Nome: string;
}

export function Login() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [message, setMessage] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('')

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }


  // useEffect(() => {
  //   // Buscar os funcionários do banco de dados
  //   const fetchFuncionarios = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/get-funcionarios"
  //       );
  //       setFuncionarios(response.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar funcionários:", error);
  //     }
  //   };

  //   fetchFuncionarios();
  // }, []);

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
    <Container className="bg-info bg-gradient rounded-5 shadow-lg pt-4">
      <h1 className="text-white mx-3">Login</h1>
      <Form noValidate onSubmit={handleSubmit} className="m-4 p-4">
           
        <Row className="mb-4">
          <Col sm={2}>
            <Form.Label column="lg" lg={12} className="text-info-emphasis">
              Login:
            </Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control required type="text" className="form-control-lg" />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col sm={2}>
            <Form.Label column="lg" lg={12} className="text-info-emphasis">
              Senha:
            </Form.Label>
          </Col>
          <Col sm={10}>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="senha"
              className="form-control-lg"
            />
            <Button 
            variant={showPassword ?"danger": "success"}
            disabled={password.length === 0}
            // className="bg-dark"
            onClick={handleTogglePassword}
            >
              {showPassword? 'Esconder': 'Mostrar'}
            </Button>
           
          </InputGroup>
          </Col>
        </Row>

        <Button type="submit" size="lg" variant="secondary">
          Enviar
        </Button>
      </Form>
      {message && (
        <Alert variant="info" className="mt-4">
          {message}
        </Alert>
      )}
    </Container>
  );
}

