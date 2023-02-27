import AuthenticationData from "../model/Authenticator/AuthenticationData";
import User from "../model/Users/User";
import { DeleteUserInputDTO, GetUserProfileInputDTO } from "../model/Users/UsersDTO";
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

    getProfile = async (userData: AuthenticationData) => {
        const profile = await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", userData.id)
        return profile
    }

    getUserProfile = async (input: GetUserProfileInputDTO) => {
        const profile = await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", input.userId)
        return profile
    }

    getUserFeed = async (userData: AuthenticationData) => {
        const feed = await UsersDatabase.connection("cookenu_recipes")
        .select("cookenu_recipes.id", 
        "cookenu_recipes.title", 
        "cookenu_recipes.description", 
        "cookenu_recipes.created_at",
        "cookenu_recipes.author_id")
        .join("cookenu_follows", "cookenu_follows.followed_user", "cookenu_recipes.author_id")
        .whereLike("cookenu_follows.user_id", userData.id)
        return feed
    }

    deleteUser = async (input: DeleteUserInputDTO) => {
        await UsersDatabase.connection("cookenu_follows")
        .whereLike("user_id", input.userId)
        .orWhereLike("followed_user", input.userId)
        .del()

        await  UsersDatabase.connection("cookenu_recipes")
        .whereLike("author_id", input.userId)
        .del()
        
        await UsersDatabase.connection("cookenu_users")
        .whereLike("id", input.userId)
        .del()
    }
}

export default UsersDatabase