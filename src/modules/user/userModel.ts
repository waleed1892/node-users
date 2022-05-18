import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../../DB/connect";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

declare const process: {
    env: {
        JWT_SECRET: string,
        JWT_LIFETIME: string
    }
}
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare email: string;
    declare firstName: string;
    declare lastName: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    //accessor
    cleanUserResponse() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
    fullName() {
        return [this.firstName, this.lastName].join(' ')
    }
    async verifyPassword(password: string) {
        return await bcryptjs.compare(password, this.password)
    }
    createJWT() {
        const token = jwt.sign({ id: this.id, name: this.fullName() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
        return token;
    }
}

User.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: true,
                isEmail: true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
            // defaultValue: 'test' This is used to define default value for a column
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: 'User',
        // freezeTableName: true  This options causes modelName to be exact as tableName instaed of making plurals
        tableName: 'users',
        // timestamps: false This flag enables/disables the timestamps in database
    }
)


//hooks
User.beforeCreate('hashPassword', async (user) => {
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(user.password, salt)
    user.password = hashedPassword;
})

// Create Table in database, use force flag to drop if exists and re-create.
User.sync({ force: true })

export default User;