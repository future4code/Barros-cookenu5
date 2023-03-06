import CustomError from "../CustomError";

class MissingTitle extends CustomError {
    constructor(){
        super(422, "Recipe title required.")
    }
}

export default MissingTitle