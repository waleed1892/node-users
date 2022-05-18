import Joi from 'joi';
import { Response, Request, NextFunction } from 'express';

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
})

export default async function userStoreValidator(req: Request, res: Response, next: NextFunction) {
    await schema.validateAsync(req.body, { abortEarly: false })
    next();
}