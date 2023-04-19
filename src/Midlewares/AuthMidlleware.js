import { promisify } from "util";
import jwt from "jsonwebtoken";
import authConfig from "../../src/Config/auth";

async function Midlewares(req, res, next){
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;
        

        if (!decoded) {
            return res.status(401).json({ error: "Token invalid" });
        }

        if(decoded.id === undefined){
            return res.status(401).json({ error: "Token invalid" });
        }
        
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Token invalid" });
    }
}

export default Midlewares;