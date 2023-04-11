import { Router } from "express";
import UserControllers from "./Controlers/UserControllers/UserControllers";
import searchUser from "./Controlers/UserControllers/searchUser";


const routes = new Router();

routes.post("/createUser", UserControllers.createUsers);
routes.get("/searchUser", searchUser.searchUser);

export default routes;
