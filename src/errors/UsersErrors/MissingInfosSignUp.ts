import CustomError from "../CustomError";

class MissingInfosSignUp extends CustomError{
    constructor(){
        super(422, "User full name, e-mail, password and role required.")
    }
}

export default MissingInfosSignUp