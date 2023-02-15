import RecipesDatabase from "../data/RecipesDatabase"
import UsersDatabase from "../data/UsersDatabase"
import CustomError from "../errors/CustomError"
import EmptyList from "../errors/EmptyList"
import MissingAuthorId from "../errors/RecipesErrors/MissingAuthorId"
import MissingDescription from "../errors/RecipesErrors/MissingDescription"
import MissingInfosCreate from "../errors/RecipesErrors/MissingInfosCreate"
import MissingTitle from "../errors/RecipesErrors/MissingTitle"
import RecipeExisting from "../errors/RecipesErrors/RecipeExisting"
import UserNotFound from "../errors/UsersErrors/UserNotFound"
import Recipe from "../model/Recipes/Recipe"
import { CreateRecipeInputDTO } from "../model/Recipes/RecipesDTO"
import IdGenerator from "../services/IdGenerator"

const recipesDatabase = new RecipesDatabase()
const usersDatabase = new UsersDatabase()
const idGenerator = new IdGenerator()

class RecipesBusiness {

    getAllRecipes = async (): Promise<Recipe[]> => {
        try {
            const recipes = await recipesDatabase.getAllRecipes()

            if(recipes.length < 1){
                throw new EmptyList()
            }

            return await recipesDatabase.getAllRecipes()
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    createRecipe = async (input: CreateRecipeInputDTO): Promise<void> => {
        try {
            if(!input.title && !input.description && !input.authorId){
                throw new MissingInfosCreate()
            } if(!input.title){
                throw new MissingTitle()
            } if(!input.description){
                throw new MissingDescription()
            } if(!input.authorId){
                throw new MissingAuthorId()
            }

            const recipeExisting = await recipesDatabase.findRecipe(input.title)

            if(recipeExisting.length > 0){
                throw new RecipeExisting()
            }

            const users = await usersDatabase.getAllUsers()
            const userExisting = users.filter(user => user.id === input.authorId)

            if(userExisting.length < 1){
                throw new UserNotFound()
            }

            const id = idGenerator.idGenerator()

            const newRecipe = new Recipe(
                id, 
                input.title,
                input.description,
                new Date(),
                input.authorId
            )

            await recipesDatabase.insertRecipe(newRecipe)
            
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default RecipesBusiness