import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "./interfaces/IControllerBase";


class ShoppingController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("cart/getCart", this.getCart);
    this.router.post("cart/updateCart", this.updateCart);
  }

  getCart = async (req: Request, res: Response) => {
    
  };

  updateCart = async (req: Request, res: Response) => {

  }
}

export default ShoppingController;
