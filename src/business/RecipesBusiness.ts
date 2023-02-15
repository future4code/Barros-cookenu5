import RecipesDatabase from "../data/RecipesDatabase"
import CustomError from "../errors/CustomError"
import MissingAuthorId from "../errors/RecipesErrors/MissingAuthorId"
import MissingDescription from "../errors/RecipesErrors/MissingDescription"
import MissingInfosCreate from "../errors/RecipesErrors/MissingInfosCreate"
import MissingTitle from "../errors/RecipesErrors/MissingTitle"
import RecipeExisting from "../errors/RecipesErrors/RecipeExisting"
import Recipe from "../model/Recipes/Recipe"
import { CreateRecipeInputDTO } from "../model/Recipes/RecipesDTO"
import IdGenerator from "../services/IdGenerator"

const recipesDatabase = new RecipesDatabase()
const idGenerator = new IdGenerator()

class RecipesBusiness {
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