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
exports.deleteUser = exports.getUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFound_1 = __importDefault(require("../errors/NotFound"));
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.status(http_status_codes_1.StatusCodes.OK).json(users);
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(user.cleanUserResponse());
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByPk(req.params.id);
    if (!user) {
        throw new NotFound_1.default('User not found.');
    }
    user === null || user === void 0 ? void 0 : user.set(req.body);
    yield (user === null || user === void 0 ? void 0 : user.save());
    res.status(http_status_codes_1.StatusCodes.OK).json(user.cleanUserResponse());
});
exports.updateUser = updateUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByPk(req.params.id);
    if (!user) {
        throw new NotFound_1.default('User not found.');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(user.cleanUserResponse());
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByPk(req.params.id);
    if (!user) {
        throw new NotFound_1.default('User not found.');
    }
    yield user.destroy();
    return res.status(http_status_codes_1.StatusCodes.OK).send('User deleted successfully.');
});
exports.deleteUser = deleteUser;
