import UsersDatabase from "../data/UsersDatabase"
import CustomError from "../errors/CustomError"
import EmptyList from "../errors/EmptyList"
import IncorrectPassword from "../errors/UsersErrors/IncorrectPassword"
import InvalidPassword from "../errors/UsersErrors/InvalidPassword"
import MissingEmail from "../errors/UsersErrors/MissingEmail"
import MissingFullName from "../errors/UsersErrors/MissingFullName"
import MissingInfosLogin from "../errors/UsersErrors/MissingInfosLogin"
import MissingInfosSignUp from "../errors/UsersErrors/MissingInfosSignUp"
import MissingPassword from "../errors/UsersErrors/MissingPassword"
import MissingUserId from "../errors/UsersErrors/MissingUserId"
import MissingUserToken from "../errors/UsersErrors/MissingUserToken"
import UserExisting from "../errors/UsersErrors/UserExisting"
import UserNotFound from "../errors/UsersErrors/UserNotFound"
import User from "../model/Users/User"
import { GetProfileInputDTO, GetUserProfileInputDTO, LoginInputDTO, SignUpInputDTO, TokenInputDTO } from "../model/Users/UsersDTO"
import Authenticator from "../services/Authenticator"
import HashManager from "../services/HashManager"
import IdGenerator from "../services/IdGenerator"

const usersDatabase = new UsersDatabase()
const authenticatorManager = new Authenticator()
const idGenerator = new IdGenerator()
const hashManager = new HashManager()

class UsersBusiness {

    getAllUsers = async (input: TokenInputDTO): Promise<User[]> => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            }

            const users = await usersDatabase.getAllUsers()

            if(users.length < 1){
                throw new EmptyList()
            }

            authenticatorManager.getTokenPayload(input.token)

            return await usersDatabase.getAllUsers()
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    signUp = async (input: SignUpInputDTO): Promise<string> => {
        try {
            if(!input.fullName && !input.email && !input.password){
                throw new MissingInfosSignUp()
            } if(!input.fullName){
                throw new MissingFullName()
            } if(!input.email){
                throw new MissingEmail()
            } if(!input.password){
                throw new MissingPassword()
            } if(input.password.length < 6){
                throw new InvalidPassword()
            }

            const userExisting = await usersDatabase.findUser(input.email)

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

    login = async (input: LoginInputDTO): Promise<string> => {
        try {
            if(!input.email && !input.password){
                throw new MissingInfosLogin()
            } if(!input.email){
                throw new MissingEmail()
            } if(!input.password){
                throw new MissingPassword()
            } if(input.password.length < 6){
                throw new InvalidPassword()
            }

            const userExisting = await usersDatabase.findUser(input.email)

            if(userExisting.length < 1){
                throw new UserNotFound()
            }

            const hashPasswordCompare = await hashManager.compare(input.password, userExisting[0].password)

            if(!hashPasswordCompare){
                throw new IncorrectPassword()
            }

            const token = authenticatorManager.generateToken({id: userExisting[0].id})

            return token

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getProfile = async (input: GetProfileInputDTO): Promise<User[]> => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            }

            const userIdByToken = authenticatorManager.getTokenPayload(input.token)

            return await usersDatabase.getProfile(userIdByToken)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getUserProfile = async (input: GetUserProfileInputDTO): Promise<User[]> => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            } if(input.userId === ":user_id"){
                throw new MissingUserId()
            }

            authenticatorManager.getTokenPayload(input.token)

            return await usersDatabase.getUserProfile(input)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getUserFeed = async (input: TokenInputDTO) => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            }

            const userId = await authenticatorManager.getTokenPayload(input.token)

            return await usersDatabase.getUserFeed(userId)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default UsersBusiness