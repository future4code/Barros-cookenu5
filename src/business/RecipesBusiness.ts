import RecipesDatabase from "../data/RecipesDatabase"
import UsersDatabase from "../data/UsersDatabase"
import CustomError from "../errors/CustomError"
import EmptyList from "../errors/EmptyList"
import MissingAuthorToken from "../errors/RecipesErrors/MissingAuthorId"
import MissingDescription from "../errors/RecipesErrors/MissingDescription"
import MissingInfosCreate from "../errors/RecipesErrors/MissingInfosCreate"
import MissingInfosEdit from "../errors/RecipesErrors/MissingInfosEdit"
import MissingRecipeId from "../errors/RecipesErrors/MissingRecipeId"
import MissingTitle from "../errors/RecipesErrors/MissingTitle"
import NotNormalUser from "../errors/RecipesErrors/NotNormalUser"
import RecipeAnotherUser from "../errors/RecipesErrors/RecipeAnotherUser"
import RecipeNotFound from "../errors/RecipesErrors/RecipeNotFound"
import MissingUserToken from "../errors/UsersErrors/MissingUserToken"
import UserNotFound from "../errors/UsersErrors/UserNotFound"
import Recipe from "../model/Recipes/Recipe"
import { CreateRecipeInputDTO, DeleteRecipeInputDTO, EditRecipeInputDTO, GetRecipeInputDTO } from "../model/Recipes/RecipesDTO"
import { TokenInputDTO } from "../model/Users/UsersDTO"
import Authenticator from "../services/Authenticator"
import IdGenerator from "../services/IdGenerator"

const recipesDatabase = new RecipesDatabase()
const authenticatorManager = new Authenticator()
const usersDatabase = new UsersDatabase()
const idGenerator = new IdGenerator()

class RecipesBusiness {

    getAllRecipes = async (input: TokenInputDTO): Promise<Recipe[]> => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            }

            const recipes = await recipesDatabase.getAllRecipes()

            if(recipes.length < 1){
                throw new EmptyList()
            }

            authenticatorManager.getTokenPayload(input.token)

            return await recipesDatabase.getAllRecipes()
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getRecipe = async (input: GetRecipeInputDTO) => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            } if(input.recipeId === ":recipe_id"){
                throw new MissingRecipeId()
            }

            const recipes = await recipesDatabase.getAllRecipes()
            const recipeExisting = recipes.filter(recipe => recipe.id === input.recipeId)

            if(recipeExisting.length < 1){
                throw new RecipeNotFound()
            }

            authenticatorManager.getTokenPayload(input.token)

            return await recipesDatabase.getRecipe(input)

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

            const userData = authenticatorManager.getTokenPayload(input.token)

            const users = await usersDatabase.getAllUsers()
            const userExisting = users.filter(user => user.id === userData.id)

            if(userExisting.length < 1){
                throw new UserNotFound()
            }

            const newRecipe = new Recipe(
                idGenerator.idGenerator(), 
                input.title,
                input.description,
                new Date(),
                userData.id
            )

            await recipesDatabase.insertRecipe(newRecipe)
            
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    editRecipe = async (input: EditRecipeInputDTO) => {
        try {

            if(input.recipeId === ":recipe_id"){
                throw new MissingRecipeId()
            } if(!input.title && !input.description){
                throw new MissingInfosEdit()
            } if(!input.token){
                throw new MissingAuthorToken()
            }

            const userData = authenticatorManager.getTokenPayload(input.token)

            const allRecipes = await recipesDatabase.getAllRecipes()

            const recipeExisting = allRecipes.filter(recipe => recipe.id === input.recipeId)
            
            if(recipeExisting.length < 1){
                throw new RecipeNotFound()
            }

            if(recipeExisting[0].author_id !== userData.id){
                throw new RecipeAnotherUser()
            }

            if(userData.role === "NORMAL"){
                await recipesDatabase.updateRecipe(input)
            } else {
                throw new NotNormalUser()
            }
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }        
    }

    deleteRecipe = async (input: DeleteRecipeInputDTO) => {
        if(input.recipeId === ":recipe_id"){
            throw new MissingRecipeId()
        } if(!input.token){
            throw new MissingAuthorToken()
        }

        const userData = authenticatorManager.getTokenPayload(input.token)

        const allRecipes = await recipesDatabase.getAllRecipes()

        const recipeExisting = allRecipes.filter(recipe => recipe.id === input.recipeId)
        
        if(recipeExisting.length < 1){
            throw new RecipeNotFound()
        }

        if(userData.role === "ADMIN"){
            await recipesDatabase.deleteRecipe(input)
        }

        if(recipeExisting[0].author_id !== userData.id){
            throw new RecipeAnotherUser()
        }

        await recipesDatabase.deleteRecipe(input)
    }
}

export default RecipesBusiness