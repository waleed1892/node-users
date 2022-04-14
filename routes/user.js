const express = require('express');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user');

const userRouter = express.Router();

userRouter.route('/').post(createUser).get(getUsers)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)


module.exports = userRouter