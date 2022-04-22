const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const makeErrorMessages = require('../../utils/makeErrorMessages');

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required()
})

const userStoreValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, { abortEarly: false })
        next();
    } catch (error) {
        const messages = makeErrorMessages(error);
        res.status(StatusCodes.BAD_REQUEST).json(messages)
    }
}

module.exports = userStoreValidator;