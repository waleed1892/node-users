import { StatusCodes } from "http-status-codes"

export default class BadRequest extends Error {
    public statusCode;
    constructor(message: string) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}