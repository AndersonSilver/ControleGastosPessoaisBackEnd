import { Router } from "express";

import UserControllers from "./Controlers/Usuario/UserControllers.js";
import DadosPessoaisUser from "./Controlers/DadosPessoais/DadosPessoaisUser.js";

const routes = new Router();

// Rotas de Usuário
routes.post("/createUser", UserControllers.createUsers);
routes.get("/searchUserAll", UserControllers.getUser);
routes.get("/searchUser/:email", UserControllers.getUserByEmail);
routes.put("/updateUser/:email", UserControllers.updateUser);
routes.delete("/deleteUser/:email", UserControllers.deleteUser);

// Rotas de Dados Pessoais
routes.post("/createDadosPessoais/:id", DadosPessoaisUser.createDadosPessoais);



// Rotas de Profissional

// Rotas de Financeiro

// Rotas de Despesa

// Rotas de Receita

// Rotas de Transferencia

// Rotas de Cartão de Crédito

// Rotas de Conta Bancária

export default routes;
