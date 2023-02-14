import { Request, Response } from "express"
import UsersBusiness from "../business/UsersBusiness"
import { GetProfileInputDTO, LoginInputDTO, SignUpInputDTO } from "../model/Users/UsersDTO"

const usersBusiness = new UsersBusiness()

class UsersController {
    signUp = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: SignUpInputDTO = {
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password
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
}

export default UsersController