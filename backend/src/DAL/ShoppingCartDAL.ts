import ShoppingCart from './models/ShoppingCart';
import Iingredient from '../common/interfaces/Iingredient';
import { Result } from "../common/response/IResultT";
import { CartResponse } from "../common/entityBL/cart/CartResponse";

export class ShoppingCartDAL {
  public async getCart(email: string): Promise<Result<UserLoginResponse>> {
    try {
      const cart = await ShoppingCart.findOne({ email }).exec();
        if (cart !== null) {
            return new CartResponse(cart.ShoppingCartIngredients);
      } else {
        console.error("No Cart Found.");
        return null;
      }
    } catch (e) {
      console.error(e);
    }
  }

  public async updateCart(email: string, ingredients: Array<Iingredient>) {}
}
