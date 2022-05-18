import { Router } from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser } from './userController';
import userStoreValidator from './validators/create';

const userRouter= Router();

userRouter.route('/').post(userStoreValidator, createUser).get(getUsers)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)


export default userRouter