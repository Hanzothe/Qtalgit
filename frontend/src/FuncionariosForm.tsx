import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

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
            <Form.Control
              type="text"
              name="contato"
              value={contato}
              onChange={(event) => setContato(event.target.value)}
              className="form-control-lg"
            />
          </Col>
        </Row>

        <Row className="mt-2">
          <Col sm={2}>
            <Form.Label column="lg" lg className="text-info-emphasis">
              CNPJ:
            </Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="cnpj"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
              className="form-control-lg"
            />
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
