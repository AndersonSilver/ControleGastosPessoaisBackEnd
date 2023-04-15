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
  }
  async getReceitaAll(req, res) {
  }
  async deleteReceita(req, res) {
  }
}

export default new ReceitaUserControler();