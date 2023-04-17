import prismaClient from "../../prisma";
import * as bcrypt from "bcrypt";

class AuthUserController{
    async authUserController(req,res){
        const { email, password } = req.query;

        const getEmail = await prismaClient.user.findFirst({
            where:{
                email,
            },
        });

        const auth = await bcrypt.compare(password, getEmail.password);

        console.log(auth);
        console.log(getEmail);
        return res.json(auth);
        
    }
}

export default new AuthUserController();


