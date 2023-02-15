import RecipesDatabase from "../data/RecipesDatabase"
import UsersDatabase from "../data/UsersDatabase"
import CustomError from "../errors/CustomError"
import EmptyList from "../errors/EmptyList"
import MissingAuthorToken from "../errors/RecipesErrors/MissingAuthorId"
import MissingDescription from "../errors/RecipesErrors/MissingDescription"
import MissingInfosCreate from "../errors/RecipesErrors/MissingInfosCreate"
import MissingTitle from "../errors/RecipesErrors/MissingTitle"
import RecipeExisting from "../errors/RecipesErrors/RecipeExisting"
import UserNotFound from "../errors/UsersErrors/UserNotFound"
import Recipe from "../model/Recipes/Recipe"
import { CreateRecipeInputDTO } from "../model/Recipes/RecipesDTO"
import Authenticator from "../services/Authenticator"
import IdGenerator from "../services/IdGenerator"

const recipesDatabase = new RecipesDatabase()
const authenticatorManager = new Authenticator()
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
            if(!input.title && !input.description && !input.token){
                throw new MissingInfosCreate()
            } if(!input.title){
                throw new MissingTitle()
            } if(!input.description){
                throw new MissingDescription()
            } if(!input.token){
                throw new MissingAuthorToken()
            }

            const userId = authenticatorManager.getTokenPayload(input.token)

            const users = await usersDatabase.getAllUsers()
            const userExisting = users.filter(user => user.id === userId.id)

            if(userExisting.length < 1){
                throw new UserNotFound()
            }

            const id = idGenerator.idGenerator()

            const newRecipe = new Recipe(
                id, 
                input.title,
                input.description,
                new Date(),
                userId.id
            )

            await recipesDatabase.insertRecipe(newRecipe)
            
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default RecipesBusiness