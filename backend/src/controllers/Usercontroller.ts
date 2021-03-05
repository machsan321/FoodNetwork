import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "./interfaces/IControllerBase";
import UserBL from "../BL/UserBL";
import { UserLoginInput } from "../common/DTO/Services/BL/Input/UserLoginInput";
import { UserRegisterInput } from "../common/DTO/Services/BL/Input/UserRegisterInput";
import { IUserBL } from "../BL/interfaces/IUserBL";


class UserController implements IControllerBase {
  public path = "/";
  public router = express.Router();
  private userBL: IUserBL;

  constructor(_userBL:IUserBL) {
    this.userBL = _userBL;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/user/register", this.register);
    this.router.post("/user/login", this.login);
    this.router.get("/user/confirmation/:token", this.emailConfirmation);
  }

  login = async (req: Request, res: Response) => {
    const data = await this.userBL.login(new UserLoginInput(req.body.email, req.body.password));
   
    return res.status(200).json({ data });
  }

  register = async (req: Request, res: Response) => {
    const data = await this.userBL.register(req.body as UserRegisterInput);
    return res.status(201).json({ data });
  };

  emailConfirmation = async (req: Request, res: Response) => {
    const confirmation = await this.userBL.emailConfirmation(req.params.token)
  }
}

export default UserController;
