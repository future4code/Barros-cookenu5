import { Request, Response } from "express"
import RecipesBusiness from "../business/RecipesBusiness"
import { CreateRecipeInputDTO } from "../model/Recipes/RecipesDTO"

const recipesBusiness = new RecipesBusiness()

class RecipesController {
    createRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: CreateRecipeInputDTO = {
                title: req.body.title,
                description: req.body.description,
                authorId: req.body.authorId
            }

            await recipesBusiness.createRecipe(input)

            res.status(201).send("Recipe created.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}

export default RecipesController