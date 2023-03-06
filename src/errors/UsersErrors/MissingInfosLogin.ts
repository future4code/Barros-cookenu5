import CustomError from "../CustomError";

class MissingInfosLogin extends CustomError{
    constructor(){
        super(422, "User e-mail and password required.")
    }
}

export default MissingInfosLogin