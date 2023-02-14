import * as jwt from 'jsonwebtoken'
import AuthenticationData from '../model/Authenticator/AuthenticationData'
import dotenv from 'dotenv'

dotenv.config()

class Authenticator {
    generateToken = ({id}: AuthenticationData): string => {
        const token = jwt.sign(
            { id },
            process.env.JWT_KEY as string,
            { expiresIn: "1h"}
        )
        return token
    }

    getTokenPayload = (token: string) => {
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
        return payload
    }
}

export default Authenticator 