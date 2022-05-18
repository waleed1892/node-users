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
const dotenv_1 = __importDefault(require("dotenv"));
require('express-async-errors');
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./src/DB/connect"));
const error_1 = __importDefault(require("./src/middleware/error"));
const not_found_1 = __importDefault(require("./src/middleware/not-found"));
const authRouter_1 = __importDefault(require("./src/modules/auth/authRouter"));
const userRotuer_1 = __importDefault(require("./src/modules/user/userRotuer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/users', userRotuer_1.default);
app.use('/api/v1/auth', authRouter_1.default);
app.use(not_found_1.default);
app.use(error_1.default);
const port = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connect_1.default.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
start();
