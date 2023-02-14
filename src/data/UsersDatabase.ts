import User from "../model/Users/User";
import { SignUpInputDTO } from "../model/Users/UsersDTO";
import BaseDatabase from "./BaseDatabase";

class UsersDatabase extends BaseDatabase {
    TABLE_NAME = "cookenu_users"

    insertUser = async (newUser: User) => {
        await UsersDatabase.connection(this.TABLE_NAME).insert(newUser)
    }

    findUser = async (input: SignUpInputDTO) => {
        const result = await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("email", input.email)
        return result
    }
}

export default UsersDatabase