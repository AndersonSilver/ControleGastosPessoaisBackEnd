const { Request, Response } = require("express");
const prismaClient = require("../../prisma");

class CartaoCreditoUserController {
  async createCartaoCredito(req, res) {
    try {
      const userId = parseInt(req.query.id);
      const {
        nome,
        limite,
        dataVencimento,
        dataFechamento,
        bandeira,
      } = req.body;

      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const cartaoCredito = await prismaClient.cartaoCredito.create({
        data: {
          nome,
          limite: Number(limite),
          dataVencimento,
          dataFechamento,
          bandeira,
          user: { connect: { id: user.id } },
        },
      });

      return res.status(200).json(cartaoCredito);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Erro ao criar Cartao de Crédito" });
    }
  }

  async updateCartaoCredito(req, res) {
    try {
      const cartaoCreditoId = parseInt(req.query.id);
      const {
        nome,
        limite,
        dataVencimento,
        dataFechamento,
        bandeira,
      } = req.body;

      const cartaoCredito = await prismaClient.cartaoCredito.update({
        where: { id: cartaoCreditoId },
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
      return res
        .status(400)
        .json({ message: "Erro ao atualizar Cartao de Crédito" });
    }
  }

  async getCartaoCreditoById(req, res) {
    try {
      const userId = parseInt(req.query.id);
      const cartoesCredito = await prismaClient.cartaoCredito.findMany({
        where: { user: { id: userId } },
      });

      return res.status(200).json(cartoesCredito);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Erro ao buscar Cartao de Crédito" });
    }
  }

  async getCartaoCreditoByIdCartaoCredito(req, res) {
    try {
      const cartaoCreditoId = parseInt(req.query.id);

      if (isNaN(cartaoCreditoId)) {
        return res.status(400).json({ message: "Invalid cartaoCredito ID" });
      }

      const cartaoCredito = await prismaClient.cartaoCredito.findUnique({
        where: { id: cartaoCreditoId },
      });

      if (!cartaoCredito) {
        return res.status(400).json({ message: "Cartao de Crédito not found" });
      }

      return res.status(200).json(cartaoCredito);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Erro ao buscar o Cartao de Crédito" });
    }
  }

  async getCartaoCreditoAll(req, res) {
    try {
      const cartoesCredito = await prismaClient.cartaoCredito.findMany();
      return res.status(200).json(cartoesCredito);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Erro ao buscar Cartao de Crédito" });
    }
  }

  async deleteCartaoCredito(req, res) {
    try {
      const cartaoCreditoId = parseInt(req.query.id);

      if (isNaN(cartaoCreditoId)) {
        return res.status(400).json({ message: "Invalid cartaoCredito ID" });
      }

      await prismaClient.cartaoCredito.delete({
        where: { id: cartaoCreditoId },
      });

      return res.status(200).json({ message: "Cartao de Crédito deleted" });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Erro ao deletar Cartao de Crédito" });
    }
  }
}

module.exports = new CartaoCreditoUserController();