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
import AuthUserController from "./Controlers/Usuario/AuthUserController.js";
import AuthMidlleware from "./Midlewares/AuthMidlleware.js";

const routes = new Router();

routes.get("/session", AuthUserController.authUserController);

// Rotas de Usuário - CONCLUIDO
routes.post("/createUser", UserControllers.createUsers);

routes.use(AuthMidlleware);

routes.get("/searchUserAll", UserControllers.getUser);
routes.get("/searchUser", UserControllers.getUserByEmail);
routes.put("/updateUser", UserControllers.updateUser);
routes.delete("/deleteUser", UserControllers.deleteUser);

// Rotas de Dados Pessoais - CONCLUIDO
routes.put("/createDadosPessoais", DadosPessoaisUser.updateDadosPessoais);
routes.get("/searchDadosPessoais", DadosPessoaisUser.getDadosPessoaisById);
routes.get("/searchDadosPessoaisAll", DadosPessoaisUser.getDadosPessoaisAll);
routes.delete("/deleteDadosPessoais", DadosPessoaisUser.deleteDadosPessoais);

// Rotas de Profissional - CONCLUIDO
// routes.post("/createProfissional", ProfissionalUser.createProfissional);
routes.put("/updateProfissional", ProfissionalUser.updateProfissional);
routes.get("/searchProfissional", ProfissionalUser.getProfissionalByEmail);
routes.get("/searchProfissionalAll", ProfissionalUser.getProfissionalAll);
routes.delete("/deleteProfissional", ProfissionalUser.deleteProfissional);

// Rotas de Financeiro - CONCLUIDO

routes.put("/createFinanceiro", FinanceiroUser.updateFinanceiro);
routes.get("/searchFinanceiro", FinanceiroUser.getFinanceiroByEmail);
routes.get("/searchFinanceiroAll", FinanceiroUser.getFinanceiroAll);
routes.delete("/deleteFinanceiro/:email", FinanceiroUser.deleteFinanceiro);

// Rotas de Despesa - CONCLUIDO

routes.post("/createDespesa", DespesaUser.createDespesa);
routes.put("/updateDespesa", DespesaUser.updateDespesa);
routes.get("/searchDespesa", DespesaUser.getDespesaById);
routes.get("/searchDespesaUni", DespesaUser.getDespesaByIdDespesa);
routes.get("/searchDespesaAll", DespesaUser.getDespesaAll);
routes.delete("/deleteDespesa", DespesaUser.deleteDespesa);

// Rotas de Receita

routes.post("/createReceita", ReceitaUser.createReceita);
routes.put("/updateReceita", ReceitaUser.updateReceita);
routes.get("/searchReceita", ReceitaUser.getReceitaById);
routes.get("/searchReceitaUni", ReceitaUser.getReceitaByIdReceita);
routes.get("/searchReceitaAll", ReceitaUser.getReceitaAll);
routes.delete("/deleteReceita", ReceitaUser.deleteReceita);

// Rotas de Transferencia

routes.post("/createTransferencia", TransferenciaUser.createTransferencia);
routes.put("/updateTransferencia", TransferenciaUser.updateTransferencia);
routes.get("/searchTransferencia", TransferenciaUser.getTransferenciaById);
routes.get("/searchTransferenciaAll", TransferenciaUser.getTransferenciaAll);
routes.delete("/deleteTransferencia", TransferenciaUser.deleteTransferencia);

// Rotas de Cartão de Crédito

routes.post("/createCartaoCredito", CartaoCreditoUser.createCartaoCredito);
routes.put("/updateCartaoCredito", CartaoCreditoUser.updateCartaoCredito);
routes.get("/searchCartaoCredito", CartaoCreditoUser.getCartaoCreditoById);
routes.get("/searchCartaoCreditoUni", CartaoCreditoUser.getCartaoCreditoByIdCartaoCredito);
routes.get("/searchCartaoCreditoAll", CartaoCreditoUser.getCartaoCreditoAll);
routes.delete("/deleteCartaoCredito", CartaoCreditoUser.deleteCartaoCredito);

// Rotas de Conta Bancária

routes.post("/createContaBancaria", ContaBancariaUser.createContaBancaria);
routes.put("/updateContaBancaria", ContaBancariaUser.updateContaBancaria);
routes.get("/searchContaBancariaUni", ContaBancariaUser.getContaBancariaByIdContaBancaria);
routes.get("/searchContaBancaria", ContaBancariaUser.getContaBancariaById);
routes.get("/searchContaBancariaAll", ContaBancariaUser.getContaBancariaAll);
routes.delete("/deleteContaBancaria", ContaBancariaUser.deleteContaBancaria);
routes.get("/somatorioSaldoContaBancaria", ContaBancariaUser.somatorioSaldoContaBancaria);

export default routes;
