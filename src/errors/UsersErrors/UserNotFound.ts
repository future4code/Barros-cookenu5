import CustomError from "../CustomError";

class UserNotFound extends CustomError{
    constructor(){
        super(404, "User not found.")
    }
}

export default UserNotFound