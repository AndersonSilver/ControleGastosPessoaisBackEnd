import prismaClient from "../../prisma";

class CartaoCreditoUserControler {
  async updateCartaoCredito(req, res) {
    try {
      const existingUserId = req.params.id;

      const {
        nome,
        limite,
        dataVencimento,
        dataFechamento,
        bandeira
      } = req.body;

      const cartaoCredito = await prismaClient.CartaoCredito.update({
        where: {
          id: Number(existingUserId),
        },
        data: {
          nome,
          limite: Number(limite),
          dataVencimento,
          dataFechamento,
          bandeira,
        },
      });
      return res.status(200).json(cartaoCredito);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao atualizar Cartao de Crédito" });
    }
  }
  async getCartaoCreditoByEmail(req, res) {

    try {
      const existingUserEmail = req.params.email;
      const cartaoCredito = await prismaClient.CartaoCredito.findMany({
        where:{
          user:{
            email: existingUserEmail
          },
        },
      });
      return res.status(200).json(cartaoCredito);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar Cartao de Crédito" });
    }
  }
  async getCartaoCreditoAll(req, res) {
    try{
      const cartaoCredito = await prismaClient.CartaoCredito.findMany();
      return res.status(200).json(cartaoCredito);
    }catch(error){
      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar Cartao de Crédito" });
    }
  }
  async deleteCartaoCredito(req, res) {
    const existingUserEmail = req.params.email;

    try {
      const cartaoCredito = await prismaClient.CartaoCredito.deleteMany({
        where:{
          user:{
            email: existingUserEmail
          },
        },
      });
      return res.status(200).json(cartaoCredito);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao deletar Cartao de Crédito" });
    }
  }
}

export default new CartaoCreditoUserControler();