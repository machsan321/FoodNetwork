import ShoppingCart from './models/ShoppingCart';
import Iingredient from './interfaces/Iingredient';

export class ShoppingCartDAL {
    public async getCart(email: string) {
        ShoppingCart.findOne({ email }).exec((error: any, cart: any))
    }

    public async updateCart(email: string, ingredients: Array<Iingredient>) {

    }
}
