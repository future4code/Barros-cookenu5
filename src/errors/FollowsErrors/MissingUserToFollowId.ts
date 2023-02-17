import CustomError from "../CustomError";

class MissingUserToFollowId extends CustomError{
    constructor(){
        super(422, "User to follow id required.")
    }
}

export default MissingUserToFollowId