import CustomError from "../CustomError";

class MissingInfosUnfollowUser extends CustomError{
    constructor(){
        super(422, "User token and user to unfollow id required.")
    }
}

export default MissingInfosUnfollowUser