import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "sequelize";
import User from "../models/user";
import makeErrorMessages from "../utils/makeErrorMessages";

export const getUsers = async (req: Request, res: Response) => {
    res.send('test')
}

export const createUser = async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
    // try {
       
    // } catch (error) {
    //     const messages = makeErrorMessages(error)
    //     res.status(StatusCodes.BAD_REQUEST).json(messages)
    // }
}

export const updateUser = async (req: Request, res: Response) => {

}

export const getUser = async (req: Request, res: Response) => {

}

export const deleteUser = async (req: Request, res: Response) => {

}