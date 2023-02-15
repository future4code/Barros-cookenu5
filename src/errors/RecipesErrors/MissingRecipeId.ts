import CustomError from "../CustomError";

class MissingRecipeId extends CustomError{
    constructor(){
        super(422, "Recipe id required.")
    }
}

export default MissingRecipeId