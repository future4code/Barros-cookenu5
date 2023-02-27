import CustomError from "../CustomError";

class MissingRole extends CustomError{
    constructor(){
        super(422, "Role required.")
    }
}

export default MissingRole