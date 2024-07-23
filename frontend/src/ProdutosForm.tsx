import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";

export function ProdutosForm() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const [validated, setValidated] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false){
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    // Dados do funcionário a serem enviados
    const produtoData = {
      Nome: nome,
      Quantidade: quantidade,
    };

    try {
      const produtoResponse = await axios.post(
        "http://localhost:3000/add-produto",
        produtoData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Produto adicionado:", produtoResponse.data);
      setMessage("Produto adicionado com sucesso");
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro ao adicionar o produto");
    }
  };

  return (
    <>
    <Container className="pt-4 bg-info bg-gradient rounded-5 shadow-lg">
          <h1 className="text-white mx-3">Adicionar Produto</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FormGroup as={Row} className="position-relative">
              <Form.Label column="lg" sm={2} lg={2} className="mb-3 text-info-emphasis">
                Nome:
              </Form.Label>
              <Col>
              <Form.Control
                  required
                  type="text"
                  name="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  size="lg"
                  className=""
                />
                <Form.Control.Feedback >
                  Muito bom
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid" >
                  Por favor inclua o nome do produto
                </Form.Control.Feedback>
              </Col>
            </FormGroup>
            <Row className="mt-2">
              <Col sm={2}>
                <Form.Label column="lg"  className="text-info-emphasis">
                  Quantidade
                </Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  name="quantidade"
                  value={quantidade}
                  onChange={(event) => setQuantidade(Number(event.target.value))}
                  size="lg"
                />
              </Col>
            </Row>

            <Button type="submit" size="lg" variant="secondary">
              Enviar
            </Button>
            
          </Form>
          {message && <p>{message}</p>}
        </Container>
    </>
    
  );
}
