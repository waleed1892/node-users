import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import User from '../user/userModel';
import UnAuthenticated from '../../errors/UnAuthenticated';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    if (!user) {
        throw new UnAuthenticated('email or password might not be correct.')
    }
    const isVerified = await user.verifyPassword(password);
    if (!isVerified) {
        throw new UnAuthenticated('email or password might not be correct.')
    }
    return res.status(StatusCodes.OK).json({ user: { email: user.email, name: user.fullName() }, token: user.createJWT() });

}

export const register = async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
}