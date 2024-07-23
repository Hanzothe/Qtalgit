import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import InputMask from 'react-input-mask';

export function FuncionariosForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [contato, setContato] = useState("");
  const [servico, setServico] = useState("");
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
    <Container className="bg-info bg-gradient rounded-5 shadow-lg pt-4">
      <h1 className="text-white mx-3">Adicionar Funcionário</h1>
      <Form onSubmit={handleSubmit} className="m-4 p-4">
        <Row>
          <Col sm={2}>
            <Form.Label column="lg" lg className="text-info-emphasis">
              Nome:
            </Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="form-control-lg mx-n5"
            />
          </Col>
        </Row>

        <Row className="mt-2">
          <Col sm={2}>
            <Form.Label column="lg" lg className="text-info-emphasis">
              Email:
            </Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control-lg"
            />
          </Col>
        </Row>

        <Row className="mt-2">
          <Col sm={2}>
            <Form.Label column="lg" lg className="text-info-emphasis">
              Contato:
            </Form.Label>
          </Col>
          <Col sm={10}>
          <InputMask
              mask="(99) 99999-9999"
              value={contato}
              onChange={(event) => {
                const newValue = event.target.value.replace(/\D+/g, '');
                setContato(newValue);
              }}
            >
              {() => <Form.Control type="text" className="form-control-lg" />}
            </InputMask>
            
          </Col>
        </Row>

        <Row className="mt-2">
          <Col sm={2}>
            <Form.Label column="lg" lg className="text-info-emphasis">
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
              {() => <Form.Control type="text" className="form-control-lg" />}
            </InputMask>
            {cnpjError && (
      <div className="text-danger">{cnpjError}</div>
    )}
          </Col>
        </Row>

        <Row className="mt-2">
          <Col sm={2}>
            <Form.Label column="lg" lg className="text-info-emphasis">
              Serviço:
            </Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="servico"
              value={servico}
              onChange={(event) => setServico(event.target.value)}
              className="form-control-lg"
            />
          </Col>
        </Row>

        <Button type="submit" className="btn-lg btn-secondary">
          Enviar
        </Button>
        {message && <Alert variant="success">{message}</Alert>}
      </Form>
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