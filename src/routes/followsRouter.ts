import express from 'express'
import FollowsController from '../controller/FollowsController'

export const followsRouter = express.Router()

const followsController = new FollowsController()

followsRouter.get("/", followsController.getAllFollows)

followsRouter.post("/", followsController.followUser)