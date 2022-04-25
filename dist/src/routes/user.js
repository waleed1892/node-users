"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const create_1 = __importDefault(require("../validators/user/create"));
const userRouter = (0, express_1.Router)();
userRouter.route('/').post(create_1.default, user_1.createUser).get(user_1.getUsers);
userRouter.route('/:id').get(user_1.getUser).patch(user_1.updateUser).delete(user_1.deleteUser);
exports.default = userRouter;
