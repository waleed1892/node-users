import dotenv from 'dotenv';
require('express-async-errors');
import express from 'express';
import sequelize from './src/DB/connect';
import errorMiddleware from './src/middleware/error';
import notFound from './src/middleware/not-found';
import authRouter from './src/modules/auth/authRouter';
import userRouter from './src/modules/user/userRotuer';

dotenv.config();

const app = express();

app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
start();