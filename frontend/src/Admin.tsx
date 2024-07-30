import React, { useEffect, useState } from "react"
import jsonServerProvider from "ra-data-json-server"
import axios from "axios";
import { Card, CardTitle, Container } from "react-bootstrap";


interface Funcionario {
  _id: string;
  Nome: string;
  Email: string;
  CNPJ: string;
  Servico: string
}

export function Admin() {

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
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
    fetchFuncionarios();
  }, []);

  const funcionariosMap = new Map<string, Funcionario>();
  funcionarios.forEach((funcionario) => {
    funcionariosMap.set(funcionario._id, funcionario);
  });

  return(
    <Card>
      <CardTitle>Tela de admin</CardTitle>
    </Card>
  )
}
    

    
  

export default Admin;


