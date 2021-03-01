import { ShoppingCartDAL } from "../DAL/ShoppingCartDAL";

import { IngredientListResponse } from '../common/entityBL/ingredients/GetCartResponse';
import { UserLoginInput } from "../common/entityBL/user/UserLoginInput";
import { Result } from "../common/response/Result";

export default class ShoppingCartBL {
    private shoppingCartDal: ShoppingCartDAL;

    constructor() {
        this.shoppingCartDal = new ShoppingCartDAL();
    }

    public async getCart(data:any): Promise<Result<IngredientListResponse>> {
        let x = await this.shoppingCartDal.getCart(data);
        return x;
    }

    public async updateCart() { }
}

