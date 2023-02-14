import CustomError from "../CustomError";

class UserExisting extends CustomError{
    constructor(){
        super(409, "This user already exists.")
    }
}

export default UserExisting