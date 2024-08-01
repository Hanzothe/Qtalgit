import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import NotasPage from "./NotasPage";
import { FuncionariosForm } from "./FuncionariosForm";
import EstoquePage from "./EstoquePage";
import Home from "./home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ExibirNotas } from "./ExibirNotas";
import { ProdutosForm } from "./ProdutosForm";
import { EstoqueChange } from "./updateEstoque";
import { ExibirProdutos } from "./ExibirProdutos";
import { Login } from "./Login";
import logo from "./images/images (1).png";
import LoginPopUp from "./LoginPopUp";

function App() {
  return (
    <Router>
      <Navbar bg="white" expand="lg" fixed="top">
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="100"
            height="60"
            className="d-inline-block align-top ms-1"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/notas">
              Notas
            </Nav.Link>
            <Nav.Link as={Link} to="/funcionarios">
              Funcionários
            </Nav.Link>
            <Nav.Link as={Link} to="/estoque">
              Estoque
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4 main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notas" element={<NotasPage />} />
          <Route path="/funcionarios" element={<FuncionariosForm />} />
          <Route path="/estoque" element={<EstoquePage />} />
        </Routes>
        {/* <LoginPopUp /> */}
      </div>
    </Router>
  );
}

export default App;
