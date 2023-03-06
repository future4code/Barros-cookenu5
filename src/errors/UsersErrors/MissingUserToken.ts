import CustomError from "../CustomError";

class MissingUserToken extends CustomError{
    constructor(){
        super(422, "User token required.")
    }
}

export default MissingUserToken