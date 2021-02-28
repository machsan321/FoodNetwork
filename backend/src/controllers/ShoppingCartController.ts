import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "./interfaces/IControllerBase";
import ShoppingCartBL from '../BL/ShoppingCartBL';

class ShoppingController implements IControllerBase {
  public path = "/";
  public router = express.Router();
  private shoppingCartBL: ShoppingCartBL;

  constructor() {
    this.initRoutes();
    this.shoppingCartBL = new ShoppingCartBL();
  }

  public initRoutes() {
    this.router.get("/cart/getCart", this.getCart);
    this.router.post("/cart/updateCart", this.updateCart);
  }

  getCart = async (req: Request, res: Response) => {
    let data = await this.shoppingCartBL.getCart(req.body.email);
    return res.status(200).send(data);
  };

  updateCart = async (req: Request, res: Response) => {

  }
}

export default ShoppingController;
