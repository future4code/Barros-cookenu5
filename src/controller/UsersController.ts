import { Request, Response } from "express"
import UsersBusiness from "../business/UsersBusiness"
import { SignUpInputDTO } from "../model/Users/UsersDTO"

const usersBusiness = new UsersBusiness()

class UsersController {
    signUp = async (req: Request, res: Response) => {
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
}

export default UsersController