import CustomError from "./CustomError";

class EmptyList extends CustomError {
    constructor(){
        super(400, "Empty list.")
    }
}

export default EmptyList