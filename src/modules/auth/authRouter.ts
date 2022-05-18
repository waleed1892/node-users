import { login, register } from './authController';
import express from 'express'
import userLoginValidation from './validators/login';
const authRouter = express.Router();

authRouter.route('/login').post(userLoginValidation, login)
authRouter.route('/register').post(register)

export default authRouter