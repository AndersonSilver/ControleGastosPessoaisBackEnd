import prismaClient from "../../prisma";

class ReceitaUserControler {

  async createReceita(req, res) {
    try {
      const { valor, status, data, descricao, categoria, conta } = req.body;
  
      const existingUserId = req.query.Id;
  
      const user = await prismaClient.user.findFirst({
        where: {
          id: parseInt(existingUserId),
        },
      });
  
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      console.log(user.id)
      const receita = await prismaClient.Receita.create({
        data: {
          valor: Number(valor),
          status, 
          data,
          descricao,
          categoria,
          conta,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
  
      return res.status(200).json(receita);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao criar dados Receitas" });
    }
  }
  async updateReceita(req, res) {
    try {
      const existingUserId = parseInt(req.query.id);

      const {
        valor,
        status,
        data,
        descricao,
        categoria,
        conta,
      } = req.body;

      const receita = await prismaClient.Receita.update({
        where: {
          userId: existingUserId,
        },
        data: {
          valor: Number(valor),
          status,
          data,
          descricao,
          categoria,
          conta,
        },
      });
      return res.status(200).json(receita);
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        return res.status(404).json({ message: "Receita não encontrada" });
      } else if (error.code === 'P2002') {
        return res.status(422).json({ message: "Um dos campos fornecidos é inválido" });
      } else {
        return res.status(500).json({ message: "Erro ao atualizar dados da Receita" });
      }
    }
  }
  async getReceitaByEmail(req, res) {

    const existingUserEmail = req.params.email;

    try {
      const receita = await prismaClient.Receita.findMany({
        where: {
          user: {
            email: existingUserEmail,
          },
        },
      });
      return res.status(200).json(receita);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar Receita" });
    }
  }
  async getReceitaAll(req, res) {
    try {
      const receita = await prismaClient.Receita.findMany();
      return res.status(200).json(receita);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
    }
  }
  async deleteReceita(req, res) {
    
    try {
      const existingUserEmail = req.params.email;

      const receita = await prismaClient.Receita.deleteMany({
        where: {
          user:{
            email: existingUserEmail,
          }
        },
      });
      return res.status(200).json(receita);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao deletar dados financeiros" });      
    }
  }
}

export default new ReceitaUserControler();