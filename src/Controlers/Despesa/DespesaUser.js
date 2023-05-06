import prismaClient from "../../prisma";

class DespesaUserControler {
  async createDespesa(req, res) {
    try {
      const { valor, status, data, descricao, categoria, conta } = req.body;
  
      const existingUserId = req.query.id;
      let tipo;

      if (!/^\d+$/.test(existingUserId)) {
        return res.status(400).json({ message: "Invalid user ID" });
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
      const despesa = await prismaClient.Despesa.create({
        data: {
          valor: Number(valor),
          tipo: "Despesa",
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
  
      return res.status(200).json(despesa);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao criar Despesa" });
    }
  }
  async updateDespesa(req, res) {
    try {
      const existingUserId = req.query.id;

      const {
        valor,
        status,
        data,
        descricao,
        categoria,
        conta,
      } = req.body;

      const despesa = await prismaClient.Despesa.update({
        where: {
          id: Number(existingUserId),
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
      return res.status(200).json(despesa);
    } catch (err) {
      console.log(err);
    }
  }
  async getDespesaById(req, res) {
    try {
      const existingUserId = req.query.id;

      const despesa = await prismaClient.Despesa.findMany({
        where: {
          user: {
            id: parseInt(existingUserId),
          },
        },
      });
      return res.status(200).json(despesa);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
    }
  }
  async getDespesaByIdDespesa(req, res) {

    const existingUserId = req.query.id;

    if (existingUserId == null){
      return res.status(400).json({ message: "ID não encontrado" });
    }

    if (!/^\d+$/.test(existingUserId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
      const despesa = await prismaClient.Despesa.findMany({
        where: {
            id: parseInt(existingUserId),
        },
      });

      return res.status(200).json(despesa);

    } catch (error) {

      console.log(error);
      return res.status(400).json({ message: "Erro ao buscar Despesa" });
      
    }
  }
  async getDespesaAll(req, res) {
    try {
      const despesa = await prismaClient.Despesa.findMany();
      return res.status(200).json(despesa);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
    }
  }
  async deleteDespesa(req, res) {
    try {
      const existingUserId = req.query.id;

      const despesa = await prismaClient.Despesa.deleteMany({
        where: {
            id: Number(existingUserId),
        },
      });
      return res.status(200).json(despesa);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
    }
  }
}

export default new DespesaUserControler();