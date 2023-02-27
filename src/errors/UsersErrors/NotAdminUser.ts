import CustomError from "../CustomError";

class NotAdminUser extends CustomError{
    constructor(){
        super(422, "Only users with the 'ADMIN' role can delete other users.")
    }
}

export default NotAdminUser