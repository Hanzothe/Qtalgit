import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import notaFiscalImage from "./images/nota-fiscal.webp";

interface NotaFiscal {
  _id: string;
  funcionario: string;
  fileUrl: string;
}

interface Funcionario {
  _id: string;
  Nome: string;
}

export function ExibirNotas() {
  const [notasFiscais, setNotasFiscais] = useState<NotaFiscal[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
    // Buscar as notas fiscais do banco de dados
    const fetchNotasFiscais = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-notas-fiscais"
        );
        setNotasFiscais(response.data);
      } catch (error) {
        console.error("Erro ao buscar notas fiscais:", error);
      }
    };

    // Buscar os funcionários do banco de dados
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-funcionarios"
        );
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchNotasFiscais();
    fetchFuncionarios();
  }, []);

  // Criar um mapa de funcionários para fácil acesso
  const funcionariosMap = new Map<string, Funcionario>();
  funcionarios.forEach((funcionario) => {
    funcionariosMap.set(funcionario._id, funcionario);
  });

  return (
    <div className="container">
      <h1>Notas Fiscais</h1>
      <div className="row">
        {notasFiscais.map((nota) => (
          <div key={nota._id} className="col-md-4 mb-4">
            <NotaFiscalCard
              nota={nota}
              funcionario={funcionariosMap.get(nota.funcionario)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface NotaFiscalCardProps {
  nota: NotaFiscal;
  funcionario?: Funcionario;
}

const NotaFiscalCard: React.FC<NotaFiscalCardProps> = ({
  nota,
  funcionario,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={notaFiscalImage} />
      <Card.Body>
        <Card.Title>Nota Fiscal</Card.Title>
        <Card.Text>
          Funcionário: {funcionario ? funcionario.Nome : "Desconhecido"}
        </Card.Text>
        <Card.Link
          href={nota.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Baixar Nota Fiscal
        </Card.Link>
      </Card.Body>
    </Card>
  );
};
