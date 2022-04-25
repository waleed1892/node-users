"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../DB/connect"));
class User extends sequelize_1.Model {
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
    }
}, {
    sequelize: connect_1.default,
    modelName: 'User',
    // freezeTableName: true  This options causes modelName to be exact as tableName instaed of making plurals
    tableName: 'users',
    // timestamps: false This flag enables/disables the timestamps in database
});
User.sync({ force: true });
exports.default = User;
