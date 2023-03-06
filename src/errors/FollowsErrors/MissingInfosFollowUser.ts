import CustomError from "../CustomError";

class MissingInfosFollowUser extends CustomError{
    constructor(){
        super(422, "User token and user to follow id required.")
    }
}

export default MissingInfosFollowUser