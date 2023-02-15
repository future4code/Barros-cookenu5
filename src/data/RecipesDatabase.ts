import Recipe from "../model/Recipes/Recipe";
import { GetRecipeInputDTO } from "../model/Recipes/RecipesDTO";
import BaseDatabase from "./BaseDatabase";

class RecipesDatabase extends BaseDatabase {
    TABLE_NAME = "cookenu_recipes"

    getAllRecipes = async () => {
        const recipes = await RecipesDatabase.connection(this.TABLE_NAME).select("*")
        return recipes
    }

    getRecipe = async (input: GetRecipeInputDTO) => {
        const recipe = await RecipesDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", input.recipeId)
        return recipe
    }

    insertRecipe = async (newRecipe: Recipe) => {
        await RecipesDatabase.connection(this.TABLE_NAME).insert(newRecipe)
    }
}

export default RecipesDatabase