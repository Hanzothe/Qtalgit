import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import InputMask from 'react-input-mask';

interface Funcionario {
  _id: string;
  Nome: string;
}

export function NotasForm() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [message, setMessage] = useState<string>("");

  const [cnpj, setCnpj] = useState('');
const [cnpjError, setCnpjError] = useState('');

const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const newCnpj = event.target.value;
  setCnpj(newCnpj);
  if (isValidCNPJ(newCnpj)) {
    setCnpjError('');
  } else {
    setCnpjError('CNPJ inválido');
  }
};

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
      <h1 className="text-white mx-3">Upload de Nota</h1>
      <Form noValidate onSubmit={handleSubmit} className="m-4 p-4">
           
        <Row className="mb-4">
          <Col sm={2}>
            <Form.Label column="lg" lg={12} className="text-info-emphasis">
              CNPJ:
            </Form.Label>
          </Col>
          <Col sm={10}>
            <InputMask
              mask="99.999.999/9999-99"
              format={(value: string) => {
                return value.replace(/\D+/g, '').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
              }}
              value={cnpj}
              onChange={handleCnpjChange}
            >
              {() => <Form.Control required type="text" className="form-control-lg" />}
            </InputMask>
            {cnpjError && (
      <div className="text-danger">{cnpjError}</div>
    )}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col sm={2}>
            <Form.Label column="lg" lg={12} className="text-info-emphasis">
              Arquivo:
            </Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              type="file"
              name="arquivo"
              onChange={handleFileChange}
              className="form-control-lg"
            />
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
function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D+/g, ''); // remove non-digit characters
  if (cnpj.length !== 14) return false; // CNPJ must have 14 digits

  let sum = 0;
  let weight = 5;
  let n = 0;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight--;
    if (weight < 2) {
      weight = 9;
    }
    n++;
  }

  let verifyingDigit = 11 - (sum % 11);
  if (verifyingDigit > 9) verifyingDigit = 0;
  if (cnpj.charAt(12) !== verifyingDigit.toString()) return false;

  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight--;
    if (weight < 2) {
      weight = 9;
    }
  }

  verifyingDigit = 11 - (sum % 11);
  if (verifyingDigit > 9) verifyingDigit = 0;
  if (cnpj.charAt(13) !== verifyingDigit.toString()) return false;

  return true;
}
