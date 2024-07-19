import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import produtoImage from "./images/nota-fiscal.webp"; // Imagem genérica de produto

interface Produto {
  _id: string;
  Nome: string;
  Quantidade: number;
}

export function ExibirProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    // Buscar os produtos do banco de dados
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="container">
      <h1>Produtos</h1>
      <div className="row">
        {produtos.map((produto) => (
          <div key={produto._id} className="col-md-4 mb-4">
            <ProdutoCard produto={produto} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProdutoCardProps {
  produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={produtoImage} />
      <Card.Body>
        <Card.Title>{produto.Nome}</Card.Title>
        <Card.Text>Quantidade: {produto.Quantidade}</Card.Text>
      </Card.Body>
    </Card>
  );
};
