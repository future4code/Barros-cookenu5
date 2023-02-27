import CustomError from "../CustomError";

class RecipeAnotherUser extends CustomError{
    constructor(){
        super(422, "This recipe is from another user.")
    }
}

export default RecipeAnotherUser