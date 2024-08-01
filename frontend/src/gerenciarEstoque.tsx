import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Certifique-se de que o arquivo CSS está importado

interface Produto {
  _id: string;
  Nome: string;
  Quantidade: number;
}

export function GerenciarEstoque() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [adjustments, setAdjustments] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Buscar os produtos do banco de dados
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-produtos");
        setProdutos(response.data);
        setAdjustments(response.data.map(() => 0)); // Inicializa os ajustes como 0
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const handleQuantityChange = (index: number, change: number) => {
    setAdjustments((prevAdjustments) =>
      prevAdjustments.map((adjustment, i) =>
        i === index ? adjustment + change : adjustment
      )
    );
  };

  const handleInputChange = (index: number, value: number) => {
    setAdjustments((prevAdjustments) =>
      prevAdjustments.map((adjustment, i) => (i === index ? value : adjustment))
    );
  };

  const handleUpdate = async () => {
    const valid = produtos.every(
      (produto, index) => produto.Quantidade + adjustments[index] >= 0
    );
    if (!valid) {
      setMessage("Erro: Não é possível ter quantidades negativas.");
      return;
    }

    try {
      const updatePromises = produtos.map((produto, index) =>
        axios.patch(`http://localhost:3000/update-produto/${produto._id}`, {
          quantidade: adjustments[index], // Envia apenas o ajuste
        })
      );
      await Promise.all(updatePromises);
      setMessage("Estoque atualizado com sucesso");

      // Recarregar os produtos do banco de dados
      const response = await axios.get("http://localhost:3000/get-produtos");
      setProdutos(response.data);
      setAdjustments(response.data.map(() => 0)); // Reinicia os ajustes para 0
    } catch (error) {
      console.error("Erro ao atualizar o estoque:", error);
      setMessage("Erro ao atualizar o estoque");
    }
  };

  return (
    <Container className="bg-info bg-gradient rounded-5 shadow-lg pt-4 pb-4">
      <h1 className="text-white text-center mb-4">Gerenciar Estoque</h1>
      <Table
        striped
        bordered
        hover
        variant="light"
        className="bg-white text-center"
      >
        <thead>
          <tr className="bg-primary text-white">
            <th>Produto</th>
            <th>Quantidade Atual</th>
            <th>Ajuste de Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={produto._id}>
              <td className="align-middle">{produto.Nome}</td>
              <td className="align-middle">{produto.Quantidade}</td>
              <td className="align-middle">
                <Form.Control
                  type="number"
                  value={adjustments[index]}
                  onChange={(e) =>
                    handleInputChange(index, Number(e.target.value))
                  }
                  className="text-center"
                />
              </td>
              <td className="align-middle">
                <Button
                  variant="success"
                  className="mx-2"
                  onClick={() => handleQuantityChange(index, 1)}
                >
                  +
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => handleQuantityChange(index, -1)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <Button variant="primary" size="lg" onClick={handleUpdate}>
          Atualizar Estoque
        </Button>
      </div>
      {message && (
        <Alert
          className="mt-4 text-center"
          variant={message.includes("Erro") ? "danger" : "success"}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
}
