"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("./authController");
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./validators/login"));
const authRouter = express_1.default.Router();
authRouter.route('/login').post(login_1.default, authController_1.login);
authRouter.route('/register').post(authController_1.register);
exports.default = authRouter;
