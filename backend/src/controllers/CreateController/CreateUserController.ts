import UserBL from "../../BL/UserBL";
import { UserDAL } from "../../DAL/UserDAL";
import UserController from "../UserController";

const userDl = new UserDAL();
const userBl = new UserBL(userDl);
const userController = new UserController(userBl);
export {userController} 