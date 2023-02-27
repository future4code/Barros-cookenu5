import express from 'express'
import RecipesController from '../controller/RecipesController'

export const recipesRouter = express.Router()

const recipesController = new RecipesController()

recipesRouter.get("/", recipesController.getAllRecipes)

recipesRouter.get("/:recipe_id", recipesController.getRecipe)

recipesRouter.post("/create", recipesController.createRecipe)

recipesRouter.patch("/edit/:recipe_id", recipesController.editRecipe)

recipesRouter.delete("/delete/:recipe_id", recipesController.deleteRecipe)