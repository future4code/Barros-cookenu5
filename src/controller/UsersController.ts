import { Request, Response } from "express"
import UsersBusiness from "../business/UsersBusiness"
import { DeleteUserInputDTO, GetProfileInputDTO, GetUserProfileInputDTO, LoginInputDTO, SignUpInputDTO, TokenInputDTO } from "../model/Users/UsersDTO"

const usersBusiness = new UsersBusiness()

class UsersController {

    getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: TokenInputDTO = {
                token: req.headers.authorization as string
            }

            const users = await usersBusiness.getAllUsers(input)

            res.status(200).send(users)            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage) 
        }
    }

    signUp = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: SignUpInputDTO = {
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const token = await usersBusiness.signUp(input)

            res.status(201).send({token})
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)   
        }
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await usersBusiness.login(input)

            res.status(200).send({token})
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)   
        }
    }

    getProfile = async (req: Request, res: Response): Promise<void>  => {
        try {
            const input: GetProfileInputDTO = {
                token: req.headers.authorization as string
            }
            
            const userProfile = await usersBusiness.getProfile(input)

            res.status(200).send(userProfile)
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage) 
        }
    }

    getUserProfile = async (req: Request, res: Response): Promise<void>  => {
        try {
            const input: GetUserProfileInputDTO = {
                userId: req.params.user_id,
                token: req.headers.authorization as string
            }
            
            const userProfile = await usersBusiness.getUserProfile(input)

            res.status(200).send(userProfile)
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage) 
        }
    }

    getUserFeed = async (req: Request, res: Response) => {
        try {
            const input: TokenInputDTO = {
                token: req.headers.authorization as string
            }

            const feed = await usersBusiness.getUserFeed(input)

            res.status(200).send(feed)
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const input: DeleteUserInputDTO = {
                userId: req.params.user_id,
                token: req.headers.authorization as string
            }

            await usersBusiness.deleteUser(input)

            res.status(200).send("User deleted.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}

export default UsersController