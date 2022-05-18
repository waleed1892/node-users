"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./userController");
const create_1 = __importDefault(require("./validators/create"));
const userRouter = (0, express_1.Router)();
userRouter.route('/').post(create_1.default, userController_1.createUser).get(userController_1.getUsers);
userRouter.route('/:id').get(userController_1.getUser).patch(userController_1.updateUser).delete(userController_1.deleteUser);
exports.default = userRouter;
