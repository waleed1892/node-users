require('dotenv').config()
const express = require('express');
const sequelize = require('./DB/connect');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json())

app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
start();