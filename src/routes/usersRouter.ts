import express from 'express'
import UsersController from '../controller/UsersController'

export const usersRouter = express.Router()

const usersController = new UsersController()

usersRouter.get("/profile", usersController.getProfile)

usersRouter.post("/signup", usersController.signUp)

usersRouter.post("/login", usersController.login)
