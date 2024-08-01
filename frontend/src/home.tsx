import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './home.css';
import logo from "./images/images (1).png";
import { Card } from "react-bootstrap";
import card1image from './images/office.jpg'
import card2image from './images/prestador.jpg'

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowAdditionalContent(true);
  };

  const handleMouseLeave = () => {
    // setIsHovered(false);   
    // Remover esta linha para que o conteúdo adicional não desapareça ao sair do logo
  };

  return (
    <div className="background-image">
      <div className="overlay"></div>
      <div className="content">
        <div className={`additional-content ${showAdditionalContent ? 'show' : ''}`}>
        <Card className="box box1">
        <Card.Img variant="top" src={card1image}  style={{ boxShadow: 'rgba(0, 0, 0, 0.75) 0px 3px 12px 2px'}}
/>
        <Card.Body>
          <Card.Title>Administração</Card.Title>
          <Card.Text>
            Clique aqui para ter acesso a administração de notas fiscais e funcionários.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">É necessário fazer login</small>
        </Card.Footer>
      </Card>
          {/* <Card className="box box1">
          <Card.Img src="./images/office2.jpeg" alt="Card image" />
            <Card.Body>
              <Card.Text className="fs-1 fw-bold">
                Sou administrador
              </Card.Text>
            </Card.Body>
          </Card> */}
        </div>
        <div
          className={`animate-div ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className={`additional-content ${showAdditionalContent ? 'show' : ''}`}>
        <Card className="box box2">
        <Card.Img variant="top" src={card2image} style={{   boxShadow: 'rgba(0, 0, 0, 0.75) 0px 3px 12px 2px'}}
/>
        <Card.Body>
          <Card.Title>Estoque</Card.Title>
          <Card.Text>
            Aqui você pode fazer gestão e consultas do estoque. 
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">É necessário fazer login</small>
        </Card.Footer>
      </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
