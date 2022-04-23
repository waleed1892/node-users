import { Dialect, Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

declare const process: {
    env: {
        DATABASE_NAME: string,
        DATABASE_USERNAME: string,
        DATABASE_PASSWORD: string,
        DATABASE_DRIVER: Dialect | undefined
    }
}
const sequelize: Sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    dialect: process.env.DATABASE_DRIVER,
})

export default sequelize;