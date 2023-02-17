import CustomError from "../CustomError";

class MissingUserToUnfollowId extends CustomError{
    constructor(){
        super(422, "User to unfollow id required.")
    }
}

export default MissingUserToUnfollowId