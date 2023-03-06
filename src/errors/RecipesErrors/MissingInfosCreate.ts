import CustomError from "../CustomError";

class MissingInfosCreate extends CustomError{
    constructor(){
        super(422, "Recipe title, description and token required.")
    }
}

export default MissingInfosCreate