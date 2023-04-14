import { Router } from "express";

import UserControllers from "./Controlers/Usuario/UserControllers.js";
import DadosPessoaisUser from "./Controlers/DadosPessoais/DadosPessoaisUser.js";
import ProfissionalUser from "./Controlers/Profissional/ProfissionalUser.js";

const routes = new Router();

// Rotas de Usuário
routes.post("/createUser", UserControllers.createUsers);
routes.get("/searchUserAll", UserControllers.getUser);
routes.get("/searchUser/:email", UserControllers.getUserByEmail);
routes.put("/updateUser/:email", UserControllers.updateUser);
routes.delete("/deleteUser/:email", UserControllers.deleteUser);

// Rotas de Dados Pessoais
routes.put("/createDadosPessoais/:id", DadosPessoaisUser.updateDadosPessoais);
routes.get("/searchDadosPessoais/:email", DadosPessoaisUser.getDadosPessoaisByEmail);
routes.get("/searchDadosPessoaisAll", DadosPessoaisUser.getDadosPessoaisAll);
routes.delete("/deleteDadosPessoais/:email", DadosPessoaisUser.deleteDadosPessoais);

// Rotas de Profissional
routes.put("/createProfissional/:id", ProfissionalUser.updateProfissional);
routes.get("/searchProfissional/:email", ProfissionalUser.getProfissionalByEmail);
routes.get("/searchProfissionalAll", ProfissionalUser.getProfissionalAll);
routes.delete("/deleteProfissional/:email", ProfissionalUser.deleteProfissional);

// Rotas de Financeiro

// Rotas de Despesa

// Rotas de Receita

// Rotas de Transferencia

// Rotas de Cartão de Crédito

// Rotas de Conta Bancária

export default routes;
