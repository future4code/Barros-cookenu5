import { Request, Response } from "express"
import RecipesBusiness from "../business/RecipesBusiness"
import { CreateRecipeInputDTO, DeleteRecipeInputDTO, EditRecipeInputDTO, GetRecipeInputDTO } from "../model/Recipes/RecipesDTO"
import { TokenInputDTO } from "../model/Users/UsersDTO"

const recipesBusiness = new RecipesBusiness()

class RecipesController {

    getAllRecipes = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: TokenInputDTO = {
                token: req.headers.authorization as string
            }

            const recipes = await recipesBusiness.getAllRecipes(input)

            res.status(200).send(recipes)            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage) 
        }
    }

    getRecipe = async (req: Request, res: Response) => {
        try {
            const input: GetRecipeInputDTO = {
                recipeId: req.params.recipe_id,
                token: req.headers.authorization as string
            }

            const recipe = await recipesBusiness.getRecipe(input)

            res.status(200).send(recipe)
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

    editRecipe = async (req: Request, res: Response) => {
        try {
            const input: EditRecipeInputDTO = {
                title: req.body.title,
                description: req.body.description,
                recipeId: req.params.recipe_id,
                token: req.headers.authorization as string
            }

            await recipesBusiness.editRecipe(input)

            res.status(200).send("Recipe edited.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    deleteRecipe = async (req: Request, res: Response) => {
        try {
            const input: DeleteRecipeInputDTO = {
                recipeId: req.params.recipe_id,
                token: req.headers.authorization as string
            }

            await recipesBusiness.deleteRecipe(input)

            res.status(200).send("Recipe deleted.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}

export default RecipesController