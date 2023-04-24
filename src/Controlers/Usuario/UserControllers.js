import prismaClient from "../../prisma";
import * as bcrypt from "bcrypt";

export class User{
    async createUsers(req,res){
        try {

            const { name, email, password } = req.body;
            
            const hash = await bcrypt.hash(req.body.password, 10);

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
                        password: hash,
                    },

                    select: {
                        id: true,
                        name: true,
                        email: true,
                        dadosPessoais: true,
                        profissional: true,
                        financeiro: true,
                        // despesa: true,
                        // receita: true,
                        // transferencia: true,
                        // cartaoCredito: true,
                        // contaBancaria: true,
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

                // const despesa = await prismaClient.Despesa.create({
                //     data:{
                //         userId: getIdUser.id,
                // },
                // });

                // const receita = await prismaClient.Receita.create({
                //     data:{
                //         userId: getIdUser.id,
                // },
                // });

                // const transferencia = await prismaClient.Transferencia.create({
                //     data:{
                //         userId: getIdUser.id,
                // },
                // });

                // const cartaoCredito = await prismaClient.CartaoCredito.create({
                //     data:{
                //         userId: getIdUser.id,
                // },
                // });

                // const contaBancaria = await prismaClient.ContaBancaria.create({
                //     data:{
                //         userId: getIdUser.id,
                // },
                // });

            return res.status(201).json(users);
                        
        } catch (error) {
            console.log(error);
            return res.status(400).json('Erro na criação de usuarios')
        }
    }

    async getUser(req,res){   
        try {
            const users = await prismaClient.User.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                },
            });
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(400).json('Erro na listagem de usuarios')
        }
    }

    async getUserByEmail(req,res){
        const email = req.query.email;
        try {
            const user = await prismaClient.User.findFirst({
                where: {
                    email: email,
                },
            });
            if (user === null) {
              return res.status(404).json('Usuário não encontrado');
            } else {
              return res.status(200).json(user);
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json('Erro na busca do usuário')
        }

        console.log(email);
    }

    async updateUser(req,res){
        const emailUpdate = req.params.email;
        const { name, email, password } = req.body;
        try {
            const user = await prismaClient.User.update({
                where: {
                    email: emailUpdate,
                },
                data: {
                    name,
                    email,
                    password,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                },
            });
            if (user === null) {
              return res.status(404).json('Usuário não encontrado');
            } else {
              return res.status(200).json(user);
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json('Erro na atualização do usuário')
        }
    }

    async deleteUser(req,res){
            const emailDelete = req.params.email;
            try {
                const user = await prismaClient.User.findUnique({
                    where: {
                        email: emailDelete,
                    },
                    include: {
                        dadosPessoais: true,
                        profissional: true,
                        financeiro: true,
                        despesa: true,
                        receita: true,
                        transferencia: true,
                        cartaoCredito: true,
                        contaBancaria: true,
                    }
                });
                if (user === null) {
                  return res.status(404).json('Usuário não encontrado');
                } else {
                  await prismaClient.Profissional.deleteMany({
                      where: {
                          userId: user.id
                      }
                  });
                    await prismaClient.DadosPessoais.deleteMany({
                        where: {
                            userId: user.id
                        }
                    });
                    await prismaClient.Financeiro.deleteMany({
                        where: {
                            userId: user.id
                        }
                    });
                    await prismaClient.Despesa.deleteMany({
                        where: {
                            userId: user.id
                        }
                    });
                    await prismaClient.Receita.deleteMany({
                        where: {
                            userId: user.id
                        }
                    });
                    await prismaClient.Transferencia.deleteMany({
                        where: {
                            userId: user.id
                        }
                    });
                    await prismaClient.CartaoCredito.deleteMany({
                        where: {
                            userId: user.id
                        }
                    });
                    await prismaClient.ContaBancaria.deleteMany({
                        where: {
                            userId: user.id
                        }
                    });

                  const deletedUser = await prismaClient.User.delete({
                      where: {
                          email: emailDelete,
                      },
                  });
                  return res.status(200).json(deletedUser);
                }
            } catch (error) {
                console.log(error);
                return res.status(400).json('Erro na exclusão do usuário')
            }
    }
}

export default new User();