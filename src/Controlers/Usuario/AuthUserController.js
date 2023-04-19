import prismaClient from "../../prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../Config/auth";


class AuthUserController{
    async authUserController(req,res){
        const { email, password } = req.query;

        const getEmail = await prismaClient.user.findFirst({
            where:{
                email,
            },
        });

        if (!getEmail || getEmail === undefined) {
            return res.status(400).json({error: "User not found"});
        }

        const auth = await bcrypt.compare(password, getEmail.password);

        if (!auth || auth === undefined || auth === false) {
            return res.status(400).json({error: "Password incorrect"});
        }


        const token = jwt.sign(
            { id: getEmail.id },
            config.secret,
            { expiresIn: config.expireIn }
          );
      
          return res.json({
            auth,
            token,
            message: "User authenticated",
            getEmail
          });
    }
}

export default new AuthUserController();


