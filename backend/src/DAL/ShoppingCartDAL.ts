import ShoppingCart from "./models/ShoppingCart";
import Iingredient from "../common/interfaces/Iingredient";
import { Result } from "../common/response/IResultT";
import { IngredientListResponse } from "../common/entityBL/ingredients/GetCartResponse";

export class ShoppingCartDAL {
  public async getCart(_email: string): Promise<Result<IngredientListResponse>> {
    var res = new Result<IngredientListResponse>(
      new IngredientListResponse([]),
      "",
      "",
      false
    );

    try {
      const cart = await ShoppingCart.findOne({ email: _email });
      if (cart !== null) {
        res.data = new IngredientListResponse(cart.ShoppingCartIngredients);
        res.isSuccses = true;
        return res;
      } else {
        res.error = "Cart Doesn't found";
        res.isSuccses = false;
        return res;
      }
    } catch (e) {
      console.error(e);
      return res;
    }
    return res;
  }

  public async updateCart(email: string, ingredients: Array<Iingredient>) {
    var res = new Result<IngredientListResponse>(
      new IngredientListResponse([]),
      "",
      "",
      false
    );

    try {
      const cart = await ShoppingCart.findOneAndUpdate(
        { email },
        { ShoppingCartIngredients: ingredients }
      );
      if (cart !== null) {
        ShoppingCart;
        res.data = new IngredientListResponse(cart.ShoppingCartIngredients);
        res.isSuccses = true;
        return res;
      } else {
        res.error = "Cart Doesn't found";
        res.isSuccses = false;

        return res;
      }
    } catch (e) {
      console.error(e);
    }
  }
}
