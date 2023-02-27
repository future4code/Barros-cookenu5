import CustomError from "../CustomError";

class MissingInfosEdit extends CustomError{
    constructor(){
        super(422, "Title or/and description required to edit.")
    }
}

export default MissingInfosEdit