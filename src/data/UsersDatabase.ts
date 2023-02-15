import AuthenticationData from "../model/Authenticator/AuthenticationData";
import User from "../model/Users/User";
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

    getProfile = async (userId: AuthenticationData) => {
        const profile = await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", userId.id)
        return profile
    }

}

export default UsersDatabase