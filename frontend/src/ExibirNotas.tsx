import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import notaFiscalImage from "./images/nota-fiscal.webp";

interface NotaFiscal {
  _id: string;
  funcionario: string;
  fileUrl: string;
}

interface Funcionario {
  _id: string;
  Nome: string;
  Email: string;
  CNPJ: string;
  Servico: string;
}

export function ExibirNotas() {
  const [notasFiscais, setNotasFiscais] = useState<NotaFiscal[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [filtro, setFiltro] = useState<string>(""); // Estado para o filtro de pesquisa
  const [dataInicial, setDataInicial] = useState<string>(""); // Estado para a data inicial
  const [dataFinal, setDataFinal] = useState<string>(""); // Estado para a data final

  useEffect(() => {
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

  const funcionariosMap = new Map<string, Funcionario>();
  funcionarios.forEach((funcionario) => {
    funcionariosMap.set(funcionario._id, funcionario);
  });

  // Função para filtrar as notas fiscais com base no filtro de texto e data
  const notasFiscaisFiltradas = notasFiscais
    .filter((nota) => {
      const funcionario = funcionariosMap.get(nota.funcionario);
      const filtroLower = filtro.toLowerCase();
      const dataNota = extrairDataDaUrl(nota.fileUrl);

      // Verifica se o filtro de texto é atendido
      const textoValido =
        (funcionario?.Nome.toLowerCase().includes(filtroLower) ||
        funcionario?.Email.toLowerCase().includes(filtroLower) ||
        funcionario?.CNPJ.toLowerCase().includes(filtroLower) ||
        funcionario?.Servico.toLowerCase().includes(filtroLower) ||
        nota.fileUrl.toLowerCase().includes(filtroLower));

      // Verifica se a data da nota está dentro do intervalo especificado
      const dataInicialValida = dataInicial ? new Date(dataInicial) <= dataNota : true;
      const dataFinalValida = dataFinal ? dataNota <= new Date(dataFinal + "T23:59:59") : true;

      return textoValido && dataInicialValida && dataFinalValida;
    })
    .sort((a, b) => {
      const dataA = extrairDataDaUrl(a.fileUrl);
      const dataB = extrairDataDaUrl(b.fileUrl);
      return dataB.getTime() - dataA.getTime();
    });

  // UseEffect para rolar para o topo sempre que os resultados filtrados mudarem
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [notasFiscaisFiltradas]);

  return (
    <div className="container">
      <h1>Notas Fiscais</h1>
      {/* Barra de pesquisa */}
      <Form.Group controlId="searchBar">
        <Form.Control
          type="text"
          placeholder="Pesquisar notas fiscais..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </Form.Group>
      {/* Filtro por período de tempo */}
      <Form.Group controlId="dateFilter" className="mt-3">
        <Form.Label>Filtrar por data</Form.Label>
        <div className="d-flex flex-column flex-sm-row">
          <Form.Control
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
            placeholder="Data Inicial"
            className="mb-2 mb-sm-0"
          />
          <Form.Control
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
            placeholder="Data Final"
            className="ml-sm-2"
          />
        </div>
      </Form.Group>
      <div className="row mt-4">
        {notasFiscaisFiltradas.map((nota) => (
          <div key={nota._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
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

const extrairDataDaUrl = (fileUrl: string): Date => {
  const regex = /\/(\d+)_/;
  const match = fileUrl.match(regex);
  if (match) {
    const timestamp = parseInt(match[1], 10);
    return new Date(timestamp);
  }
  return new Date(0); // Retorna uma data padrão caso não consiga extrair a data
};

const NotaFiscalCard: React.FC<NotaFiscalCardProps> = ({
  nota,
  funcionario,
}) => {
  const data = extrairDataDaUrl(nota.fileUrl);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={notaFiscalImage} />
      <Card.Body>
        <Card.Title>Nota Fiscal</Card.Title>
        <Card.Text>
          Funcionário: {funcionario ? funcionario.Nome : "Desconhecido"}
        </Card.Text>
        <Card.Text>
          Email: {funcionario ? funcionario.Email : "Desconhecido"}
        </Card.Text>
        <Card.Text>
          CNPJ: {funcionario ? funcionario.CNPJ : "Desconhecido"}
        </Card.Text>
        <Card.Text>
          Função: {funcionario ? funcionario.Servico : "Desconhecido"}
        </Card.Text>
        <Card.Text>
          Data: {data.toLocaleDateString()}
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
