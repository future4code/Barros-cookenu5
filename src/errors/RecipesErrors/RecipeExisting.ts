import CustomError from "../CustomError";

class RecipeExisting extends CustomError{
    constructor(){
        super(409, "This recipe already exists.")
    }
}

export default RecipeExisting