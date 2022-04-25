import { login, register } from './../controllers/auth';
import express from 'express'
import userLoginValidation from '../validators/auth/login';
const authRouter = express.Router();

authRouter.route('/login').post(userLoginValidation, login)
authRouter.route('/register').post(register)

export default authRouter