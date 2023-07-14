import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";

class TransferenciaUserControler {

  async createTransferencia(req, res) {
  
    try {

      const existingUserId = req.query.id;

      const {
        data,
        observacao,
        deConta,
        paraConta,
        valor
      } = req.body;

      const user = await prismaClient.user.findFirst({
        where: {
          id: parseInt(existingUserId),
        },
      });

      const transferencia = await prismaClient.Transferencia.create({

        data: {
          data,
          observacao,
          deConta,
          paraConta,
          valor: Number(valor),
          user: {
            connect: {
                id: user.id,
            },
          },
        },
        
      });

      return res.status(200).json({"Transferencia efetuada com sucesso": transferencia});

    } catch (error) {
      
      console.log(error);

      return res.status(400).json({ message: "Erro ao efetuar Transferencia" });

    }
  
  }
  async updateTransferencia(req, res) {
    try {
      const existingUserId = req.query.id;

      const {
        data,
        observacao,
        deConta,
        paraConta,
        valor
      } = req.body;

      const transferencia = await prismaClient.Transferencia.update({
        where: {
          id: Number(existingUserId),
        },
        data: {
          data,
          observacao,
          deConta,
          paraConta,
          valor: Number(valor)
        },
      });
      return res.status(200).json(transferencia);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao atualizar dados financeiros" });
    }
  }
  async getTransferenciaByEmail(req, res) {
    try {
      const existingUserEmail = req.params.email;
      const transferencia = await prismaClient.Transferencia.findMany({
        where:{
          user:{
            email: existingUserEmail
          },
        },
      });
      return res.status(200).json(transferencia);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
    }
  }
  async getTransferenciaAll(req, res) {
    try {
      const transferencia = await prismaClient.Transferencia.findMany();
      return res.status(200).json(transferencia);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
    }
  }
  async deleteTransferencia(req, res) {
    try {
      const existingUserEmail = req.params.email;

      const transferencia = await prismaClient.Transferencia.deleteMany({
        where:{
          user:{
            email: existingUserEmail
          },
        },
      });
      return res.status(200).json(transferencia);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao deletar dados financeiros" });
    }
  }
}

export default new TransferenciaUserControler();