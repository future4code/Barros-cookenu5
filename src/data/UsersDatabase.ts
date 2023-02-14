import AuthenticationData from "../model/Authenticator/AuthenticationData";
import User from "../model/Users/User";
import BaseDatabase from "./BaseDatabase";

class UsersDatabase extends BaseDatabase {
    TABLE_NAME = "cookenu_users"

    insertUser = async (newUser: User) => {
        await UsersDatabase.connection(this.TABLE_NAME).insert(newUser)
    }

    findUser = async (email: string) => {
        const result = await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("email", email)
        return result
    }

    getProfile = async (userId: AuthenticationData) => {
        const result = await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", userId.id)
        return result
    }

}

export default UsersDatabase