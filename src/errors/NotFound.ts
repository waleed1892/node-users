import { StatusCodes } from "http-status-codes";
import CustomError from ".";

export default class NotFound extends CustomError {
    public statusCode;
    constructor(message: string) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
