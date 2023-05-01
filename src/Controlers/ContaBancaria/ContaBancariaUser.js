import prismaClient from "../../prisma";

class ContaBancariaUserControler {

    async createContaBancaria(req, res) {
        try {
            const existingUserId = parseInt(req.query.id);
            const {
                instituicao,
                descricao,
                tipoConta,
                saldo,
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

            const contaBancaria = await prismaClient.ContaBancaria.create({
                data: {
                    instituicao,
                    descricao,
                    tipoConta,
                    saldo: Number(saldo),
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });
            return res.status(200).json(contaBancaria);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao criar Conta Bancária" });
        }
    }
    async updateContaBancaria(req, res) {
        try {
            const existingUserId = req.params.id;
            const {
                instituicao,
                descricao,
                tipoConta,
                saldo,
            } = req.body;
            const contaBancaria = await prismaClient.ContaBancaria.update({
                where: {
                    id: Number(existingUserId),
                },
                data: {
                    instituicao,
                    descricao,
                    tipoConta,
                    saldo: Number(saldo),
                },
            });
            return res.status(200).json(contaBancaria);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao atualizar Conta Bancária" });
        }
    }
    async getContaBancariaById(req, res) {
        try{
            const existingUserId = req.query.id;

            const contaBancaria = await prismaClient.ContaBancaria.findMany({
                where: {
                    user:{
                        id: parseInt(existingUserId),
                    }
                },
            });
            return res.status(200).json(contaBancaria);
        }catch(error){
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar Conta Bancária" });
        }
    }
    async getContaBancariaAll(req, res) {
        try{
            const contaBancaria = await prismaClient.ContaBancaria.findMany();
            return res.status(200).json(contaBancaria);
        }catch(error){
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar Conta Bancária" });
        }
    }
    async deleteContaBancaria(req, res) {
        try{
            const existingUserId = req.query.id;

            const contaBancaria = await prismaClient.ContaBancaria.deleteMany({
                where:{
                        id: Number(existingUserId),
                }
            });
            return res.status(200).json(contaBancaria);
        }catch(error){
            console.log(error);
            return res.status(400).json({ message: "Erro ao deletar Conta Bancária" });
        }
    }
}

export default new ContaBancariaUserControler();