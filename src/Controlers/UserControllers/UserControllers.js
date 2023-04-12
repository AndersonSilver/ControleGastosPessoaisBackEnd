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

            // const salt = bcrypt.genSaltSync(10);
            // const hash = bcrypt.hashSync(password, salt);

            const users = await prismaClient.user.create({
                data:{
                    name,
                    email,
                    password,
                },

                // Retorna apenas os dados listados abaixo
                select: {
                    id: true,
                    name: true,
                    email: true,
                    perfilUser: true,
                }
            });

                const getIdUser = await prismaClient.user.findFirst({
                    where:{
                        email,
                    },
                });

                const perfilUsers = await prismaClient.perfilUser.create({
                data:{
                    userId: getIdUser.id,
                },

                // Retorna apenas os dados listados abaixo
                select: {
                    cep: true,
                    rua: true,
                    numero: true,
                    bairro: true,
                    cidade: true,
                    estado: true,
                    complemento: true,
                }
                });
            return res.status(201).json(users);
                        
        } catch (error) {
            return res.status(400).json('Erro na criação de usuarios')
        }
    }
}

export default new createUsers();