import { StatusCodes } from "http-status-codes"

export default class CustomError extends Error {
    public statusCode
    constructor(message: string) {
        super(message)
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }
}