import Recipe from "../model/Recipes/Recipe";
import { DeleteRecipeInputDTO, EditRecipeInputDTO, GetRecipeInputDTO } from "../model/Recipes/RecipesDTO";
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

    updateRecipe = async (input: EditRecipeInputDTO) => {
        if(input.description){
            await RecipesDatabase.connection(this.TABLE_NAME).update("description", input.description).whereLike("id", input.recipeId)
        } if(input.title){
            await RecipesDatabase.connection(this.TABLE_NAME).update("title", input.title).whereLike("id", input.recipeId)
        }
    }

    deleteRecipe = async (input: DeleteRecipeInputDTO) => {
        await RecipesDatabase.connection(this.TABLE_NAME).whereLike("id", input.recipeId).del()
    }
}

export default RecipesDatabase