import prismaClient from "../../prisma";

class dadosPessoaisControllers{
    async updateDadosPessoais(req, res){
        try{
        const existingUserId = req.query.id;
        const {
            nameCompleto,     
            telefone,           
            cep,                
            estado,             
            cidade,             
            aniversario,        
            sexo,               
            nascionalidade,     
            cpf,                
            objetivoFinanceiro,
         } = req.body;

        const dadosPessoais = await prismaClient.DadosPessoais.update({
            where:{
                userId: parseInt(existingUserId),
            },
            data:{
                nameCompleto,
                telefone,
                cep ,
                estado ,
                cidade ,
                aniversario,
                sexo,
                nascionalidade,
                cpf,
                objetivoFinanceiro,
                user: { connect: { id: parseInt(existingUserId) } },
            },
            select:{
                id: true,
                nameCompleto: true,
                telefone: true,
                cep: true,
                estado: true,
                cidade: true,
                aniversario: true,
                sexo: true,
                nascionalidade: true,
                cpf: true,
                objetivoFinanceiro: true,
                userId: true,
            }
        });
        
        return res.status(201).json(dadosPessoais);
    }catch(err){
        console.log(err);
        return res.status(400).json('Erro na criação de usuarios');
    }
    }

    async getDadosPessoaisById(req, res){
        try{
            const existingUserId = req.query.id;

            const dados = await prismaClient.DadosPessoais.findFirst({
                where:{
                    user: {
                        id: parseInt(existingUserId),
                    },
                },

            });
            return res.status(200).json(dados);
        }catch(err){
            console.log(err);
            return res.status(400).json('Erro na pesquisa de usuarios');
        }
    }

    async getDadosPessoaisAll(req, res){
        try{
            const dados = await prismaClient.DadosPessoais.findMany({
                include:{
                    user: true,
                },
            });
            return res.status(200).json(dados);
        }catch(err){
            console.log(err);
            return res.status(400).json('Erro na pesquisa de usuarios');
        }
    }

    async deleteDadosPessoais(req, res){

            try{
                const existingUserEmail = req.params.email;

                const dados = await prismaClient.DadosPessoais.deleteMany({
                    where:{
                        user: {
                            email: existingUserEmail,
                        },
                    },
                });
                return res.status(200).json(dados);
            }catch(err){
                console.log(err);
                return res.status(400).json('Erro na pesquisa de usuarios');
            }


    }
}   

export default new dadosPessoaisControllers();