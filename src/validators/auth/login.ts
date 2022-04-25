import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export default async function userLoginValidation(req: Request, res: Response, next: NextFunction) {
    await schema.validateAsync(req.body, { abortEarly: false })
    next();
}