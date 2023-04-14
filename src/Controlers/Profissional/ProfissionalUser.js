import prismaClient from "../../prisma";

class ProfissionalControllers{
    async updateProfissional(req, res){
        try{
            const existingUserId = req.params.id;

            const { 
                escolaridade,
                profissao,
                fonteRenda,
                rendaMensal,
             } = req.body;

            const dados = await prismaClient.Profissional.update({
                where:{
                    id: parseInt(existingUserId),
                },
                data:{
                    escolaridade,
                    profissao,
                    fonteRenda,
                    rendaMensal,
                },
            });
            return res.status(200).json(dados);
        }catch(err){
            console.log(err);
            return res.status(400).json('Erro na pesquisa de usuarios');
        }
    }

    async getProfissionalByEmail(req, res){
        try{
            const existingUserEmail = req.params.email;

            const dados = await prismaClient.Profissional.findMany({
                where:{
                    user:{
                        email: existingUserEmail,
                    }
                    
                },
            });
            return res.status(200).json(dados);
        }catch(err){
            console.log(err);
            return res.status(400).json('Erro na pesquisa de usuarios');
        }
    }

    async getProfissionalAll(req, res){
        try{
            const dados = await prismaClient.Profissional.findMany();
            return res.status(200).json(dados);
        }catch(err){
            console.log(err);
            return res.status(400).json('Erro na pesquisa de usuarios');
        }
    }

    async deleteProfissional(req, res){
        try{
            const existingUserEmail = req.params.email;

            const dados = await prismaClient.Profissional.deleteMany({
                where:{
                    user:{
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

export default new ProfissionalControllers();