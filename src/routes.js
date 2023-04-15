import { Router } from "express";

import UserControllers from "./Controlers/Usuario/UserControllers.js";
import DadosPessoaisUser from "./Controlers/DadosPessoais/DadosPessoaisUser.js";
import ProfissionalUser from "./Controlers/Profissional/ProfissionalUser.js";
import FinanceiroUser from "./Controlers/Financeiro/FinanceiroUser.js";
import DespesaUser from "./Controlers/Despesa/DespesaUser.js";
import ReceitaUser from "./Controlers/Receita/ReceitaUser.js";
import TransferenciaUser from "./Controlers/Transferencia/TransferenciaUser.js";
import CartaoCreditoUser from "./Controlers/CartaoCredito/CartaoCreditoUser.js";
import ContaBancariaUser from "./Controlers/ContaBancaria/ContaBancariaUser.js";

const routes = new Router();

// Rotas de Usuário - CONCLUIDO
routes.post("/createUser", UserControllers.createUsers);
routes.get("/searchUserAll", UserControllers.getUser);
routes.get("/searchUser", UserControllers.getUserByEmail);
routes.put("/updateUser/:email", UserControllers.updateUser);
routes.delete("/deleteUser/:email", UserControllers.deleteUser);

// Rotas de Dados Pessoais - CONCLUIDO
routes.put("/createDadosPessoais/:id", DadosPessoaisUser.updateDadosPessoais);
routes.get("/searchDadosPessoais/:email", DadosPessoaisUser.getDadosPessoaisByEmail);
routes.get("/searchDadosPessoaisAll", DadosPessoaisUser.getDadosPessoaisAll);
routes.delete("/deleteDadosPessoais/:email", DadosPessoaisUser.deleteDadosPessoais);

// Rotas de Profissional - CONCLUIDO
routes.put("/createProfissional/:id", ProfissionalUser.updateProfissional);
routes.get("/searchProfissional/:email", ProfissionalUser.getProfissionalByEmail);
routes.get("/searchProfissionalAll", ProfissionalUser.getProfissionalAll);
routes.delete("/deleteProfissional/:email", ProfissionalUser.deleteProfissional);

// Rotas de Financeiro - CONCLUIDO

routes.put("/createFinanceiro/:id", FinanceiroUser.updateFinanceiro);
routes.get("/searchFinanceiro/:email", FinanceiroUser.getFinanceiroByEmail);
routes.get("/searchFinanceiroAll", FinanceiroUser.getFinanceiroAll);
routes.delete("/deleteFinanceiro/:email", FinanceiroUser.deleteFinanceiro);

// Rotas de Despesa - CONCLUIDO

routes.put("/createDespesa/:id", DespesaUser.updateDespesa);
routes.get("/searchDespesa/:email", DespesaUser.getDespesaByEmail);
routes.get("/searchDespesaAll", DespesaUser.getDespesaAll);
routes.delete("/deleteDespesa/:email", DespesaUser.deleteDespesa);

// Rotas de Receita

routes.put("/createReceita/:id", ReceitaUser.updateReceita);
routes.get("/searchReceita/:email", ReceitaUser.getReceitaByEmail);
routes.get("/searchReceitaAll", ReceitaUser.getReceitaAll);
routes.delete("/deleteReceita/:email", ReceitaUser.deleteReceita);

// Rotas de Transferencia

routes.put("/createTransferencia/:id", TransferenciaUser.updateTransferencia);
routes.get("/searchTransferencia/:email", TransferenciaUser.getTransferenciaByEmail);
routes.get("/searchTransferenciaAll", TransferenciaUser.getTransferenciaAll);
routes.delete("/deleteTransferencia/:email", TransferenciaUser.deleteTransferencia);

// Rotas de Cartão de Crédito

routes.put("/createCartaoCredito/:id", CartaoCreditoUser.updateCartaoCredito);
routes.get("/searchCartaoCredito/:email", CartaoCreditoUser.getCartaoCreditoByEmail);
routes.get("/searchCartaoCreditoAll", CartaoCreditoUser.getCartaoCreditoAll);
routes.delete("/deleteCartaoCredito/:email", CartaoCreditoUser.deleteCartaoCredito);

// Rotas de Conta Bancária

routes.put("/createContaBancaria/:id", ContaBancariaUser.updateContaBancaria);
routes.get("/searchContaBancaria/:email", ContaBancariaUser.getContaBancariaByEmail);
routes.get("/searchContaBancariaAll", ContaBancariaUser.getContaBancariaAll);
routes.delete("/deleteContaBancaria/:email", ContaBancariaUser.deleteContaBancaria);

export default routes;
