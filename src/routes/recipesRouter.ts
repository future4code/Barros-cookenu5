import express from 'express'
import RecipesController from '../controller/RecipesController'

export const recipesRouter = express.Router()

const recipesController = new RecipesController()

recipesRouter.get("/", recipesController.getAllRecipes)

recipesRouter.get("/:recipe_id", recipesController.getRecipe)

recipesRouter.post("/create", recipesController.createRecipe)