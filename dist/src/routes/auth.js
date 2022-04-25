"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../controllers/auth");
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../validators/auth/login"));
const authRouter = express_1.default.Router();
authRouter.route('/login').post(login_1.default, auth_1.login);
authRouter.route('/register').post(auth_1.register);
exports.default = authRouter;
