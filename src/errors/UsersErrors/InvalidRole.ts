import CustomError from "../CustomError";

class InvalidRole extends CustomError{
    constructor(){
        super(422, "Role must be 'ADMIN' or 'NORMAL'.")
    }
}

export default InvalidRole