import express from 'express'
import UsersController from '../controller/UsersController'

export const usersRouter = express.Router()

const usersController = new UsersController()

usersRouter.get("/", usersController.getAllUsers)

usersRouter.get("/profile", usersController.getProfile)

usersRouter.get("/profile/:user_id", usersController.getUserProfile)

usersRouter.post("/signup", usersController.signUp)

usersRouter.post("/login", usersController.login)
