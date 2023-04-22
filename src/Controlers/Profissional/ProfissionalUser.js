import prismaClient from "../../prisma";

class ProfissionalControllers{
    async updateProfissional(req, res){
        try{
            const existingUserId = req.query.id;

            const { 
                escolaridade,
                profissao,
                fonteRenda,
                rendaMensal,
                empresaAtual,
                atividadeDesenvolvida,
                emailComercial,
                telefoneComercial,
             } = req.body;
             
             const dadosExistentes = await prismaClient.Profissional.findUnique({
                where: {
                    userId: parseInt(existingUserId),
                },
              });
            
              if (!dadosExistentes) {
                return res.status(400).json('Registro não encontrado.');
              }

            const dados = await prismaClient.Profissional.update({
                where:{
                    userId: parseInt(existingUserId),
                },
                data:{
                escolaridade,
                profissao,
                fonteRenda,
                rendaMensal,
                empresaAtual,
                atividadeDesenvolvida,
                emailComercial,
                telefoneComercial,
                user: { connect: { id: parseInt(existingUserId) } },
                },
                select:{
                    escolaridade: true,
                    profissao: true,
                    fonteRenda: true,
                    rendaMensal: true,
                    empresaAtual: true,
                    atividadeDesenvolvida: true,
                    emailComercial: true,
                    telefoneComercial: true,
                }

            });
            return res.status(200).json(dados);
        }catch(err){
            console.log(err);
            return res.status(400).json('Erro na pesquisa de usuarios');
        }
    }

    async getProfissionalByEmail(req, res){
        try{
            const existingUserId = req.query.id;

            const dados = await prismaClient.Profissional.findMany({
                where:{

                    userId: parseInt(existingUserId),
   
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