import CustomError from "../CustomError";

class UserNotFollowed extends CustomError{
    constructor(){
        super(409, "This user is not followed by you.")
    }
}

export default UserNotFollowed