import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "./interfaces/IControllerBase";
import UserBL from "../BL/UserBL";
import { UserLoginInput } from "../common/entityBL/user/UserLoginInput";
import { UserRegisterInput } from "../common/entityBL/user/UserRegisterInput";


class UserController implements IControllerBase {
  public path = "/";
  public router = express.Router();
  private userBL: UserBL;

  constructor() {
    this.userBL = new UserBL();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/user/register", this.register);
    this.router.post("/user/login", this.login);
  }

  login = async (req: Request, res: Response) => {
    const data = await this.userBL.login(new UserLoginInput(req.body.email, req.body.password));
   
    return res.status(200).json({ data });
  }

  register = async (req: Request, res: Response) => {
    const data = await this.userBL.register(req.body as UserRegisterInput);
    return res.status(201).json({ data });
  };
}

export default UserController;
