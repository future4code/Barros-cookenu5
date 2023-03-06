import express from 'express'
import UsersController from '../controller/UsersController'

export const usersRouter = express.Router()

const usersController = new UsersController()

usersRouter.get("/", usersController.getAllUsers)

usersRouter.get("/feed", usersController.getUserFeed)

usersRouter.get("/profile", usersController.getProfile)

usersRouter.get("/profile/:user_id", usersController.getUserProfile)

usersRouter.post("/signup", usersController.signUp)

usersRouter.post("/login", usersController.login)

usersRouter.delete("/delete/:user_id", usersController.deleteUser)
