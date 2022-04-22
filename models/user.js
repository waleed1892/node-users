const { Model, DataTypes } = require("sequelize");
const sequelize = require("../DB/connect");

class User extends Model {
    //accessor
    getFullName() {
        return [this.firstName, this.lastName].join(' ')
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
        }
    },
    {
        sequelize,
        modelName: 'User',
        // freezeTableName: true  This options causes modelName to be exact as tableName instaed of making plurals
        tableName: 'users',
        // timestamps: false This flag enables/disables the timestamps in database
    }
)

User.sync({ force: true })

module.exports = User;