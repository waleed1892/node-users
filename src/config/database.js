console.log(process.env.NODE_ENV);
const config = {
    "test": {
        "username": process.env.DATABASE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_PASSWORD,
        "host": "127.0.0.1",
        dialect: process.env.DATABASE_DRIVER
    }
}
module.exports = config