import CustomError from "../CustomError";

class NotNormalUser extends CustomError {
    constructor(){
        super(422, "Only users with 'NORMAL' role can edit their own recipes.")
    }
}

export default NotNormalUser