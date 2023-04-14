import prismaClient from "../../prisma";

class dadosPessoaisControllers{
    async createDadosPessoais(req, res){
        try{
        const id = request.params.id;
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

        const dadosPessoais = await prismaClient.DadosPessoais.create({
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
                userId: id,
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
        return res.status(400).json('Erro na criação de usuarios');
    }
}
}

export default new dadosPessoaisControllers();