"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const userModel_1 = __importDefault(require("../user/userModel"));
const UnAuthenticated_1 = __importDefault(require("../../errors/UnAuthenticated"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({
        where: {
            email: email
        }
    });
    if (!user) {
        throw new UnAuthenticated_1.default('email or password might not be correct.');
    }
    const isVerified = yield user.verifyPassword(password);
    if (!isVerified) {
        throw new UnAuthenticated_1.default('email or password might not be correct.');
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: { email: user.email, name: user.fullName() }, token: user.createJWT() });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(user);
});
exports.register = register;
