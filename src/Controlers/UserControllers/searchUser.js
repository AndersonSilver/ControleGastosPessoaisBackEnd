import prismaClient from "../../prisma";

export class searchUser{
    async searchUser(req,res){
    
        const email = req.query.email;
        console.log(email);
        const user = await prismaClient.user.findMany({
            where: {
                email: email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            }
        });
        
        return user
        ? res.status(200).json(user)
        : res.status(200).json("Selected coment does not exist");
        }
}

export default new searchUser();

