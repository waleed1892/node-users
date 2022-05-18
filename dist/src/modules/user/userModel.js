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
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../DB/connect"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User extends sequelize_1.Model {
    //accessor
    cleanUserResponse() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
    fullName() {
        return [this.firstName, this.lastName].join(' ');
    }
    verifyPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(password, this.password);
        });
    }
    createJWT() {
        const token = jsonwebtoken_1.default.sign({ id: this.id, name: this.fullName() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
        return token;
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: true,
            isEmail: true
        }
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
        // defaultValue: 'test' This is used to define default value for a column
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: connect_1.default,
    modelName: 'User',
    // freezeTableName: true  This options causes modelName to be exact as tableName instaed of making plurals
    tableName: 'users',
    // timestamps: false This flag enables/disables the timestamps in database
});
//hooks
User.beforeCreate('hashPassword', (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(user.password, salt);
    user.password = hashedPassword;
}));
// Create Table in database, use force flag to drop if exists and re-create.
User.sync({ force: true });
exports.default = User;
