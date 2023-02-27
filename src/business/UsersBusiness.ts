import UsersDatabase from "../data/UsersDatabase"
import CustomError from "../errors/CustomError"
import EmptyList from "../errors/EmptyList"
import IncorrectPassword from "../errors/UsersErrors/IncorrectPassword"
import InvalidPassword from "../errors/UsersErrors/InvalidPassword"
import InvalidRole from "../errors/UsersErrors/InvalidRole"
import MissingEmail from "../errors/UsersErrors/MissingEmail"
import MissingFullName from "../errors/UsersErrors/MissingFullName"
import MissingInfosLogin from "../errors/UsersErrors/MissingInfosLogin"
import MissingInfosSignUp from "../errors/UsersErrors/MissingInfosSignUp"
import MissingPassword from "../errors/UsersErrors/MissingPassword"
import MissingRole from "../errors/UsersErrors/MissingRole"
import MissingUserId from "../errors/UsersErrors/MissingUserId"
import MissingUserToken from "../errors/UsersErrors/MissingUserToken"
import NotAdminUser from "../errors/UsersErrors/NotAdminUser"
import UserExisting from "../errors/UsersErrors/UserExisting"
import UserNotFound from "../errors/UsersErrors/UserNotFound"
import User from "../model/Users/User"
import { DeleteUserInputDTO, GetProfileInputDTO, GetUserProfileInputDTO, LoginInputDTO, SignUpInputDTO, TokenInputDTO } from "../model/Users/UsersDTO"
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
            if(!input.fullName && !input.email && !input.password && !input.role){
                throw new MissingInfosSignUp()
            } if(!input.fullName){
                throw new MissingFullName()
            } if(!input.email){
                throw new MissingEmail()
            } if(!input.password){
                throw new MissingPassword()
            } if(!input.role){
                throw new MissingRole()
            } if(input.password.length < 6){
                throw new InvalidPassword()
            } if(input.role.toUpperCase() !== "ADMIN" && input.role.toUpperCase() !== "NORMAL"){
                throw new InvalidRole()
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
                hashPassword,
                input.role.toUpperCase()
            )
            
            await usersDatabase.insertUser(newUser)

            const token = authenticatorManager.generateToken({id, role: input.role})

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

            const token = authenticatorManager.generateToken({id: userExisting[0].id, role: userExisting[0].role})

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

            const userData = authenticatorManager.getTokenPayload(input.token)

            return await usersDatabase.getProfile(userData)
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

            const userData = await authenticatorManager.getTokenPayload(input.token)

            return await usersDatabase.getUserFeed(userData)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    deleteUser = async (input: DeleteUserInputDTO) => {

        if(!input.token){
            throw new MissingUserToken()
        } if(input.userId === ":user_id"){
            throw new MissingUserId()
        }

        const userData = authenticatorManager.getTokenPayload(input.token)

        const allUsers = await usersDatabase.getAllUsers()

        const userExisting = allUsers.filter(user => user.id === input.userId)

        if(userExisting.length < 1){
            throw new UserNotFound()
        }

        if(userData.role === "ADMIN"){
            await usersDatabase.deleteUser(input)
        } else {
            throw new NotAdminUser()
        }
    }
}

export default UsersBusiness