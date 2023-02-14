import CustomError from "../CustomError";

class MissingInfos extends CustomError{
    constructor(){
        super(422, "User full name, e-mail and password required.")
    }
}

export default MissingInfos