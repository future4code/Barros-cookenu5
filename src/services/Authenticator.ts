import * as jwt from 'jsonwebtoken'
import AuthenticationData from '../model/Authenticator/AuthenticationData'
import dotenv from 'dotenv'
import CustomError from '../errors/CustomError'

dotenv.config()

class Authenticator {
    generateToken = ({id}: AuthenticationData): string => {
        const token = jwt.sign(
            { id },
            process.env.JWT_KEY as string,
            { expiresIn: "24h"}
        )
        return token
    }

    getTokenPayload = (token: string): AuthenticationData => {
        try {
            return jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData            
        } catch (err: any) {
            throw new CustomError(401, `Unauthorized - ${err.message}.`)            
        }
    }
}

export default Authenticator 