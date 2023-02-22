import CustomError from "../CustomError";

class OwnUser extends CustomError{
    constructor(){
        super(409, "Unable to follow yourself.")
    }
}

export default OwnUser