import prismaClient from "../../prisma";

class dadosPessoaisControllers{
    async createDadosPessoais(req, res){
        try{
        const existingUserId = req.params.id;
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
}

export default new dadosPessoaisControllers();