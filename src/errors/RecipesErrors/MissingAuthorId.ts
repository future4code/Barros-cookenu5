import CustomError from "../CustomError";

class MissingAuthorToken extends CustomError {
    constructor(){
        super(422, "Author token required.")
    }
}

export default MissingAuthorToken