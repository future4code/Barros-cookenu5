import Recipe from "../model/Recipes/Recipe";
import BaseDatabase from "./BaseDatabase";

class RecipesDatabase extends BaseDatabase {
    TABLE_NAME = "cookenu_recipes"

    insertRecipe = async (newRecipe: Recipe) => {
        await RecipesDatabase.connection(this.TABLE_NAME).insert(newRecipe)
    }

    findRecipe = async (title: string) => {
        const recipe = RecipesDatabase.connection(this.TABLE_NAME).select("*").whereLike("title", title)
        return recipe
    }
}

export default RecipesDatabase