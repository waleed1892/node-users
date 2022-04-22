const makeErrorMessages = (error) => {
    let messages = [];
    if (error.name === 'SequelizeUniqueConstraintError') {
        messages = error.errors.reduce((total, current) => {
            total[current.path] = current.message
            return total;
        }, {})
    } else {
        messages = error.details.reduce((total, current) => {
            total[current.path[0]] = current.message.replace(/\"/g, '');
            return total;
        }, {})
    }

    return messages;
}

module.exports = makeErrorMessages;