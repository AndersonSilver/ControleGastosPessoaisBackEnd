import prismaClient from "../../prisma";

class ReceitaUserControler {
  async updateReceita(req, res) {
    try {
      const existingUserId = req.params.id;

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
      return res.status(200).json(receita);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao atualizar dados financeiros" });
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