import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup, Row } from 'react-bootstrap';
import "./login.css";

function LoginPopUp({ show, onHide }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body className="login-modal-body">
          <h2 className="text-center mb-4">Login</h2>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="formUsername">
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control type="text" placeholder="Username" required />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant={showPassword ? 'danger' : 'success'}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? 'Esconder' : 'Mostrar'}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="d-flex justify-content-between mb-4">
              <Form.Check type="checkbox" label="Lembre-se" />
              <a href="#" className="text-info">Esqueceu a senha?</a>
            </Form.Group>

            <Row className="justify-content-center">
              <Button type="submit" variant="secondary" className="login-btn">
                Login
              </Button>
            </Row>

            <Row className="mt-4 text-center">
              <span>Não possui conta? <a href="#" className="text-info">Registrar</a></span>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginPopUp;
