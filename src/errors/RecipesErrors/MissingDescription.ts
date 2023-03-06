import CustomError from "../CustomError";

class MissingDescription extends CustomError {
    constructor(){
        super(422, "Recipe description required.")
    }
}

export default MissingDescription