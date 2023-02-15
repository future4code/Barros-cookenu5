import CustomError from "../CustomError";

class MissingAuthorId extends CustomError {
    constructor(){
        super(422, "Recipe author id required.")
    }
}

export default MissingAuthorId