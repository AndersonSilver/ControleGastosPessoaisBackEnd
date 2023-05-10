import prismaClient from "../../prisma";

class ReceitaUserControler {

  async createReceita(req, res) {
    try {
      const { valor, status, data, descricao, categoria, conta } = req.body;
  
      const existingUserId = req.query.id;
      let tipo;

      if (!/^\d+$/.test(existingUserId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      if (existingUserId == null){
        return res.status(400).json({ message: "ID não encontrado" });
      }

      if (valor === null || status === null || data === null || descricao === null || categoria === null || conta === null) {
        return res.status(400).json({ message: "Um dos campos fornecidos é inválido" });
      }

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
          tipo: "Receita",
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

      if(existingUserId == null){
        return res.status(400).json({ message: "ID não encontrado" });
      }

      const receita = await prismaClient.Receita.update({
        where: {
          id: existingUserId,
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
  async getReceitaById(req, res) {

    const existingUserId = req.query.id;

    try {
      const receita = await prismaClient.Receita.findMany({
        where: {
          user: {
            id: parseInt(existingUserId),
          },
        },
      });
      return res.status(200).json(receita);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar Receita" });
    }
  }
  async getReceitaByIdReceita(req, res) {
    const existingUserId = req.query.id;
    if (existingUserId == null){
      return res.status(400).json({ message: "ID não encontrado" });
    }
    if (!/^\d+$/.test(existingUserId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
      const receita = await prismaClient.Receita.findMany({
        where: {
            id: parseInt(existingUserId),
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
      const existingUserId = req.query.id;

      const receita = await prismaClient.Receita.deleteMany({
        where: {
            id: Number(existingUserId),
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