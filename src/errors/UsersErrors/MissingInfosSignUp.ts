import CustomError from "../CustomError";

class MissingInfosSignUp extends CustomError{
    constructor(){
        super(422, "User full name, e-mail and password required.")
    }
}

export default MissingInfosSignUp