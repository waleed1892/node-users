"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function makeErrorMessages(error) {
    let messages = {};
    if (error instanceof sequelize_1.ValidationError) {
        messages = error.errors.reduce((total, current) => {
            if (current.path !== null) {
                total[current.path] = current.message;
            }
            return total;
        }, {});
    }
    else {
        messages = error.details.reduce((total, current) => {
            total[current.path[0]] = current.message.replace(/\"/g, '');
            return total;
        }, {});
    }
    return messages;
}
exports.default = makeErrorMessages;
