import prismaClient from "../../prisma";
// import * as bcrypt from "bcrypt";

export class createUsers{
    async createUsers(req,res){
        try {
            const { name, email, password } = req.body;

            const getEmail = await prismaClient.user.findFirst({
                where:{
                    email,
                },
            });

                if (getEmail){
                    return res.status(400).json({ message: "Email Already exists!" });
                }
                const users = await prismaClient.user.create({
                    data:{
                        name,
                        email,
                        password,
                    },

                    select: {
                        id: true,
                        name: true,
                        email: true,
                        dadosPessoais: true,
                        profissional: true,
                        financeiro: true,
                        despesa: true,
                        receita: true,
                        transferencia: true,
                        cartaoCredito: true,
                        contaBancaria: true,
                    },

                });

                const getIdUser = await prismaClient.user.findFirst({
                    where:{
                        email,
                    },
                });

                const dadosPessoais = await prismaClient.DadosPessoais.create({
                data:{
                    userId: getIdUser.id,
                },

                });

                const profissional = await prismaClient.Profissional.create({
                    data:{
                        userId: getIdUser.id,
                },
                });

                const financeiro = await prismaClient.Financeiro.create({
                    data:{
                        userId: getIdUser.id,
                    },
                });

                const despesa = await prismaClient.Despesa.create({
                    data:{
                        userId: getIdUser.id,
                },
                });

                const receita = await prismaClient.Receita.create({
                    data:{
                        userId: getIdUser.id,
                },
                });

                const transferencia = await prismaClient.Transferencia.create({
                    data:{
                        userId: getIdUser.id,
                },
                });

                const cartaoCredito = await prismaClient.CartaoCredito.create({
                    data:{
                        userId: getIdUser.id,
                },
                });

                const contaBancaria = await prismaClient.ContaBancaria.create({
                    data:{
                        userId: getIdUser.id,
                },
                });

            return res.status(201).json(users);
                        
        } catch (error) {
            console.log(error);
            return res.status(400).json('Erro na criação de usuarios')
        }
    }

    async listUsers(req,res){
        try {
            const users = await prismaClient.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(400).json('Erro na listagem de usuarios')
        }
    }

    async listUsersEmail(req,res){
        try {
            const { email } = req.params;
            const users = await prismaClient.user.findFirst({
                where:{
                    email,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    dadosPessoais: true,
                    profissional: true,
                    financeiro: true,
                    despesa: true,
                    receita: true,
                    transferencia: true,
                    cartaoCredito: true,
                    contaBancaria: true,
                },
            });
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(400).json('Erro na listagem de usuarios')
        }
    }

}

export default new createUsers();