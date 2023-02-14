import CustomError from "../CustomError";

class InvalidPassword extends CustomError{
    constructor(){
        super(422, "Password must be at least 6 characters long.")
    }
}

export default InvalidPassword