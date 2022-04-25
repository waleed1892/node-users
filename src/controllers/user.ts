import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import NotFound from "../errors/NotFound";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.status(StatusCodes.OK).json(users)
}

export const createUser = async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user.cleanUserResponse());
}

export const updateUser = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        throw new NotFound('User not found.')
    }
    user?.set(req.body)
    await user?.save();
    res.status(StatusCodes.OK).json(user.cleanUserResponse())
}

export const getUser = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        throw new NotFound('User not found.')
    }
    res.status(StatusCodes.OK).json(user.cleanUserResponse())
}

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        throw new NotFound('User not found.')
    }
    await user.destroy();
    return res.status(StatusCodes.OK).send('User deleted successfully.')
}