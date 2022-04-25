import { ValidationError } from "joi";
import { ValidationError as SequelizeValidationError } from 'sequelize';
interface messages {
    [key: string]: string
}
export default function makeErrorMessages(error: ValidationError | SequelizeValidationError) {
    let messages: messages = {};
    if (error instanceof SequelizeValidationError) {
        messages = error.errors.reduce((total: Record<string, string>, current) => {
            if (current.path !== null) {
                total[current.path] = current.message
            }
            return total;
        }, {})
    } else {
        messages = error.details.reduce((total: Record<string, string>, current) => {
            total[current.path[0]] = current.message.replace(/\"/g, '');
            return total;
        }, {})
    }

    return messages;
}
