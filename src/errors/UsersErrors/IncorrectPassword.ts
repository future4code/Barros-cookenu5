import CustomError from "../CustomError";

class IncorrectPassword extends CustomError{
    constructor(){
        super(422, "Incorrect password.")
    }
}

export default IncorrectPassword