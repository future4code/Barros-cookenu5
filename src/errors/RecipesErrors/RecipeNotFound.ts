import CustomError from "../CustomError";

class RecipeNotFound extends CustomError{
    constructor(){
        super(404, "Recipe not found.")
    }
}

export default RecipeNotFound