import prismaClient from "../../prisma";

class FinanceiroUserControler {

  async updateFinanceiro(req, res) {
    try{
      const existingUserId = req.query.id;

      const { 
        tipoMoradia,
        qtdPessoas,
        qtdCartaoCredito,
        valorPatrimonio,
        possuiVeiculo,
        tipoVeiculo,
      } = req.body;

      const financeiro = await prismaClient.Financeiro.update({
        where: {
          userId: Number(existingUserId),
        },
        data: {
          tipoMoradia,
          qtdPessoas: Number(qtdPessoas),
          qtdCartaoCredito: Number(qtdCartaoCredito),
          valorPatrimonio,
          possuiVeiculo,
          tipoVeiculo,
        },
      });
      return res.status(200).json(financeiro);
    }catch(err){
      console.log(err);

    }
  }
  async getFinanceiroByEmail(req, res) {
    try{
      const existingUserId = req.query.id;

      const financeiro = await prismaClient.Financeiro.findMany({
        where: {

          userId: parseInt(existingUserId),

        },
      });
      return res.status(200).json(financeiro);
    }catch(err){
      console.log(err);
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
    }
  }
  async getFinanceiroAll(req, res) {
    try {
      const financeiro = await prismaClient.Financeiro.findMany();
      return res.status(200).json(financeiro);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
    }
  }
  async deleteFinanceiro(req, res) {
    try {
      const existingUserEmail = req.params.email;

      const financeiro = await prismaClient.Financeiro.deleteMany({
        where: {
          user: {
            email: existingUserEmail,
          }
        },
      });
      return res.status(200).json(financeiro);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
    }
  }
}

export default new FinanceiroUserControler();