import React, { useState } from "react";
import { NotasForm } from "./NotasForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FuncionariosForm } from "./FuncionariosForm";
import { ExibirNotas } from "./ExibirNotas";
import { ProdutosForm } from "./ProdutosForm";
import { EstoqueChange } from "./updateEstoque";
import { ExibirProdutos } from "./ExibirProdutos";
import { Login } from "./Login";
// import { fetchUtils, Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import Admin from "./Admin";
import { FuncionariosList } from "./FuncionariosList";



// const httpClient = (url: string, options: fetchUtils.Options = {}) => {
//   const customHeaders = (options.headers ||
//       new Headers({
//         Accept: 'application/json',
//       })) as Headers;
//   // add your own headers here
//   customHeaders.set('X-Custom-Header', 'foobar');
  
//   options.headers = customHeaders;
//   options.mode = 'cors'; // add this line
//   return fetchUtils.fetchJson(url, options);
// }

// const dataProvider = simpleRestProvider('http://localhost:3000', httpClient) 
function App() {
  return (
    <div>
      {/* <Admin dataProvider={dataProvider}>
      <Resource name="get-funcionarios" list={ListGuesser} />
      <Resource name="comments" list={ListGuesser} />
    </Admin> */}
    <Admin/>
    <FuncionariosList/>
    </div>
  );
}

export default App;

