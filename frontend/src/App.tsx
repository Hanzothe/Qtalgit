import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { NotasForm } from "./NotasForm";
import { FuncionariosForm } from "./FuncionariosForm";
import { ExibirNotas } from "./ExibirNotas";
import { ProdutosForm } from "./ProdutosForm";
import { EstoqueChange } from "./updateEstoque";
import { ExibirProdutos } from "./ExibirProdutos";
import { GerenciarEstoque } from "./gerenciarEstoque";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="/">Meu App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/notas">
              Notas
            </Nav.Link>
            <Nav.Link as={Link} to="/funcionarios">
              Funcionários
            </Nav.Link>
            <Nav.Link as={Link} to="/exibir-notas">
              Exibir Notas
            </Nav.Link>
            <Nav.Link as={Link} to="/produtos">
              Produtos
            </Nav.Link>
            <Nav.Link as={Link} to="/estoque-change">
              Gerenciar Estoque
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/notas" element={<NotasForm />} />
          <Route path="/funcionarios" element={<FuncionariosForm />} />
          <Route path="/exibir-notas" element={<ExibirNotas />} />
          <Route path="/produtos" element={<ProdutosForm />} />
          <Route path="/estoque-change" element={<GerenciarEstoque />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
