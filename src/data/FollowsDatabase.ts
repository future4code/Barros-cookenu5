import Follow from "../model/Follows/Follow";
import BaseDatabase from "./BaseDatabase";

class FollowsDatabase extends BaseDatabase {
    TABLE_NAME = "cookenu_follows"

    getAllFollows = async () => {
        return await FollowsDatabase.connection(this.TABLE_NAME).select("*")
    }

    insertFollow = async (newFollow: Follow) => {
        await FollowsDatabase.connection(this.TABLE_NAME).insert(newFollow)
    }
}

export default FollowsDatabase