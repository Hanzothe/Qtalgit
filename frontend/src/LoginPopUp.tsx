import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Col, InputGroup, Row } from 'react-bootstrap';
import "./login.css"

function LoginPopUp() {
  

  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [message, setMessage] = useState<string>("");

  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  


  // useEffect(() => {
  //   // Buscar os funcionários do banco de dados
  //   const fetchFuncionarios = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/get-funcionarios"
  //       );
  //       setFuncionarios(response.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar funcionários:", error);
  //     }
  //   };

  //   fetchFuncionarios();
  // }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setArquivo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!arquivo) {
      setMessage("Nenhum arquivo selecionado");
      return;
    }

    const formData = new FormData();
    formData.append("file", arquivo);

    try {
      // Primeiro envia o arquivo para a rota /upload
      const fileResponse = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Arquivo enviado:", fileResponse.data);
      setFileUrl(`http://localhost:3000/files/${fileResponse.data}`);

      // Envia os dados da nota para a rota /add-nota
      const notaData = {
        funcionario: selectedFuncionario,
        fileUrl: `http://localhost:3000/files/${fileResponse.data}`, // URL do arquivo
      };

      const notaResponse = await axios.post(
        "http://localhost:3000/add-nota",
        notaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Nota adicionada:", notaResponse.data);
      setMessage("Nota adicionada com sucesso");
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro ao enviar o arquivo ou adicionar a nota");
    }
  };

  return (
    <>
      <div className={show ? 'blur-background' : ''}>
      <Button variant="primary" onClick={handleShow}>
        Open Login Modal
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="login-modal-body">
          <h2 className="text-center mb-4">Login</h2>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <InputGroup>
                <InputGroup.Text>
                 @
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Username" required />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <InputGroup>
                <InputGroup.Text>
                 @
                </InputGroup.Text>
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
              <span>Não possue conta? <a href="#" className="text-info">Registrar</a></span>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </>
  );
}

export default LoginPopUp;
