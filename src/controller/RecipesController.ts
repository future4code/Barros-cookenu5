import { Request, Response } from "express"
import RecipesBusiness from "../business/RecipesBusiness"
import { CreateRecipeInputDTO } from "../model/Recipes/RecipesDTO"

const recipesBusiness = new RecipesBusiness()

class RecipesController {

    getAllRecipes = async (req: Request, res: Response): Promise<void> => {
        try {
            const recipes = await recipesBusiness.getAllRecipes()

            res.status(200).send(recipes)            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage) 
        }
    }

    createRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: CreateRecipeInputDTO = {
                title: req.body.title,
                description: req.body.description,
                token: req.headers.authorization as string
            }

            await recipesBusiness.createRecipe(input)

            res.status(201).send("Recipe created.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}

export default RecipesController