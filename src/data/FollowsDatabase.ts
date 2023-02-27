import AuthenticationData from "../model/Authenticator/AuthenticationData";
import Follow from "../model/Follows/Follow";
import { UnfollowUserInputDTO } from "../model/Follows/FollowsDTO";
import BaseDatabase from "./BaseDatabase";

class FollowsDatabase extends BaseDatabase {
    TABLE_NAME = "cookenu_follows"

    getAllFollows = async () => {
        return await FollowsDatabase.connection(this.TABLE_NAME).select("*")
    }

    insertFollow = async (newFollow: Follow) => {
        await FollowsDatabase.connection(this.TABLE_NAME).insert(newFollow)
    }

    deleteFollow = async (input: UnfollowUserInputDTO, userData: AuthenticationData) => {
        await FollowsDatabase.connection(this.TABLE_NAME).whereLike("followed_user", input.userToUnfollowId).andWhereLike("user_id", userData.id).del()
    }
}

export default FollowsDatabase