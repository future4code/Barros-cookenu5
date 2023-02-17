import { Request, Response } from "express"
import FollowsBusiness from "../business/FollowsBusiness"
import { FollowUserInputDTO, UnfollowUserInputDTO } from "../model/Follows/FollowsDTO"
import { TokenInputDTO } from "../model/Users/UsersDTO"

const followsBusiness = new FollowsBusiness()

class FollowsController {

    getAllFollows = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: TokenInputDTO = {
                token: req.headers.authorization as string
            }

            const follows = await followsBusiness.getAllFollows(input)

            res.status(200).send(follows)
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }        
    }

    followUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: FollowUserInputDTO = {
                userToFollowId: req.body.userToFollowId,
                token: req.headers.authorization as string
            }

            await followsBusiness.followUser(input)

            res.status(201).send("User followed.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    unfollowUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: UnfollowUserInputDTO = {
                userToUnfollowId: req.body.userToFollowId,
                token: req.headers.authorization as string
            }

            await followsBusiness.unfollowUser(input)

            res.status(200).send("User unfollowed.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


}

export default FollowsController