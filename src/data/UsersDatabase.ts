import AuthenticationData from "../model/Authenticator/AuthenticationData";
import User from "../model/Users/User";
import { GetUserProfileInputDTO } from "../model/Users/UsersDTO";
import BaseDatabase from "./BaseDatabase";

class UsersDatabase extends BaseDatabase {
    TABLE_NAME = "cookenu_users"

    getAllUsers = async () => {
        const users = await UsersDatabase.connection(this.TABLE_NAME).select("*")
        return users
    }

    insertUser = async (newUser: User) => {
        await UsersDatabase.connection(this.TABLE_NAME).insert(newUser)
    }

    findUser = async (email: string) => {
        const user = await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("email", email)
        return user
    }

    getProfile = async (userIdByToken: AuthenticationData) => {
        const profile = await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", userIdByToken.id)
        return profile
    }

    getUserProfile = async (input: GetUserProfileInputDTO) => {
        const profile = await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", input.userId)
        return profile
    }

}

export default UsersDatabase