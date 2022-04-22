const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const makeErrorMessages = require("../utils/makeErrorMessages");

const getUsers = async (req, res) => {
    res.send('test')
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        const messages = makeErrorMessages(error)
        res.status(StatusCodes.BAD_REQUEST).json(messages)
    }
}

const updateUser = async (req, res) => {

}

const getUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

module.exports = {
    getUsers, createUser, updateUser, getUser, deleteUser
}