import prismaClient from "../../prisma";

class CartaoCreditoUserControler {

  async createCartaoCredito(req, res) {
    try {
      const existingUserId = parseInt(req.query.id);
      console.log(existingUserId);
      const {
        nome,
        limite,
        dataVencimento,
        dataFechamento,
        bandeira,
      } = req.body;

      if (!/^\d+$/.test(existingUserId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      const user = await prismaClient.User.findUnique({
        where: {
            id: existingUserId,
        },
      });
  
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const cartaoCredito = await prismaClient.CartaoCredito.create({
        data: {
          nome,
          limite: Number(limite),
          dataVencimento,
          dataFechamento,
          bandeira,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return res.status(200).json(cartaoCredito);
      
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao criar Cartao de Crédito" });
    }
  }
  async updateCartaoCredito(req, res) {
    try {
      const existingUserId = req.query.id;

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
  async getCartaoCreditoById(req, res) {

    try {
      const existingUserId = req.query.id;
      const cartaoCredito = await prismaClient.CartaoCredito.findMany({
        where:{
          user:{
            id: parseInt(existingUserId)
          },
        },
      });
      return res.status(200).json(cartaoCredito);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar Cartao de Crédito" });
    }
  }
  async getCartaoCreditoByIdCartaoCredito(req, res) {

    const existingUserId = req.query.id;

    if (existingUserId == null){
      return res.status(400).json({ message: "ID não encontrado" });
    }

    if (!/^\d+$/.test(existingUserId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
      const CartaoCredito = await prismaClient.CartaoCredito.findMany({
        where: {
            id: parseInt(existingUserId),
        },
      });

      return res.status(200).json(CartaoCredito);

    } catch (error) {

      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar o Cartao de Crédito" });
      
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
    const existingUserId = req.query.id;

    try {
      const cartaoCredito = await prismaClient.CartaoCredito.deleteMany({
        where:{
            id: Number(existingUserId)
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