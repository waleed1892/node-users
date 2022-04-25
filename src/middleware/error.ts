import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseError, ValidationError } from 'sequelize';
import CustomError from '../errors';
import makeErrorMessages from '../utils/makeErrorMessages';
export default function errorMiddleware(err: Error | CustomError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof BaseError) {
        if (err instanceof ValidationError) {
            const messages = makeErrorMessages(err)
            res.status(StatusCodes.BAD_REQUEST).json(messages)
        }
    }
    if (err instanceof CustomError) {
        res.status(err.statusCode).json(err.message)
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
}