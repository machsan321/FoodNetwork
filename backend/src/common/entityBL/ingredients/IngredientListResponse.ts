import Iingredient from "../../interfaces/Iingredient";

export class IngredientListResponse {
    ingredients: Array<Iingredient>;

    constructor(ingredients: Array<Iingredient>) {
        this.ingredients = ingredients;
    }
}