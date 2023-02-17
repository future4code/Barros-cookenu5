import CustomError from "../CustomError";

class UserAlreadyFollowed extends CustomError{
    constructor(){
        super(409, "User already followed.")
    }
}

export default UserAlreadyFollowed