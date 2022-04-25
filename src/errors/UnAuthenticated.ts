import { StatusCodes } from "http-status-codes";
import CustomError from ".";

export default class UnAuthenticated extends CustomError {
    public statusCode;
    constructor(message: string) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
