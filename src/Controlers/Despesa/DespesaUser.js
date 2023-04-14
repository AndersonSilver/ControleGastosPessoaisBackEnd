import prismaClient from "../../prisma";

class DespesaUserControler {
  async updateDespesa(req, res) {
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
  async getDespesaByEmail(req, res) {
    try {
      const existingUserEmail = req.params.email;

      const despesa = await prismaClient.Despesa.findMany({
        where: {
          user: {
            email: existingUserEmail,
          },
        },
      });
      return res.status(200).json(despesa);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Erro ao buscar dados financeiros" });
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
      const existingUserEmail = req.params.email;

      const despesa = await prismaClient.Despesa.deleteMany({
        where: {
          user: {
            email: existingUserEmail,
          },
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