import { Router } from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/user';
import userStoreValidator from '../validators/user/create';

const userRouter= Router();

userRouter.route('/').post(userStoreValidator, createUser).get(getUsers)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)


export default userRouter