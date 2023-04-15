import prismaClient from "../../prisma";

class ContaBancariaUserControler {
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
    async getContaBancariaByEmail(req, res) {
        try{
            const existingUserEmail = req.params.email;

            const contaBancaria = await prismaClient.ContaBancaria.findFirst({
                where: {
                    user:{
                        email: existingUserEmail,
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
            const existingUserEmail = req.params.email;

            const contaBancaria = await prismaClient.ContaBancaria.deleteMany({
                where:{
                    user:{
                        email: existingUserEmail,
                    }
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