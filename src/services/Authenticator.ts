import * as jwt from 'jsonwebtoken'
import AuthenticationData from '../model/Authenticator/AuthenticationData'
import dotenv from 'dotenv'

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

    getTokenPayload = (token: string) => {
        return jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
    }
}

export default Authenticator 