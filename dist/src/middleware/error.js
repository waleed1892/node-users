"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const joi_1 = require("joi");
const errors_1 = __importDefault(require("../errors"));
const makeErrorMessages_1 = __importDefault(require("../utils/makeErrorMessages"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(err, req, res, next) {
    if (err instanceof sequelize_1.BaseError) {
        if (err instanceof sequelize_1.ValidationError) {
            const messages = (0, makeErrorMessages_1.default)(err);
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(messages);
        }
    }
    if (err instanceof errors_1.default) {
        res.status(err.statusCode).json(err.message);
    }
    if (err instanceof joi_1.ValidationError) {
        const messages = (0, makeErrorMessages_1.default)(err);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(messages);
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(err);
}
exports.default = errorMiddleware;
