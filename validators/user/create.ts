import { ValidationError as SequelizeValidationError } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import Joi, { ValidationError } from 'joi';
import makeErrorMessages from '../../utils/makeErrorMessages';
import { Response, Request, NextFunction } from 'express';

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required()
})

export default async function userStoreValidator(req: Request, res: Response, next: NextFunction) {
    try {
        await schema.validateAsync(req.body, { abortEarly: false })
        next();
    } catch (error) {
        if (error instanceof ValidationError || error instanceof SequelizeValidationError) {
            const messages = makeErrorMessages(error);
            res.status(StatusCodes.BAD_REQUEST).json(messages)
        }
        res.json(error)
    }
}