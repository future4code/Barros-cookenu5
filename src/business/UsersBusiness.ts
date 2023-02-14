import UsersDatabase from "../data/UsersDatabase"
import CustomError from "../errors/CustomError"
import InvalidPassword from "../errors/UsersErrors/InvalidPassword"
import MissingEmail from "../errors/UsersErrors/MissingEmail"
import MissingFullName from "../errors/UsersErrors/MissingFullName"
import MissingInfos from "../errors/UsersErrors/MissingInfos"
import MissingPassword from "../errors/UsersErrors/MissingPassword"
import UserExisting from "../errors/UsersErrors/UserExisting"
import User from "../model/Users/User"
import { SignUpInputDTO } from "../model/Users/UsersDTO"
import Authenticator from "../services/Authenticator"
import HashManager from "../services/HashManager"
import IdGenerator from "../services/IdGenerator"

const usersDatabase = new UsersDatabase()
const authenticatorManager = new Authenticator()
const idGenerator = new IdGenerator()
const hashManager = new HashManager()

class UsersBusiness {
    signUp = async (input: SignUpInputDTO) => {
        try {
            if(!input.fullName && !input.email && !input.password){
                throw new MissingInfos()
            } if(!input.fullName){
                throw new MissingFullName()
            } if(!input.email){
                throw new MissingEmail()
            } if(!input.password){
                throw new MissingPassword()
            } if(input.password.length < 6){
                throw new InvalidPassword()
            }

            const userExisting = await usersDatabase.findUser(input)

            if(userExisting.length > 0){
                throw new UserExisting()
            }

            const id = idGenerator.idGenerator()

            const hashPassword = await hashManager.hash(input.password)
            
            const newUser = new User(
                id,
                input.fullName,
                input.email, 
                hashPassword
            )
            
            await usersDatabase.insertUser(newUser)

            const token = authenticatorManager.generateToken({id})

            return token

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default UsersBusiness