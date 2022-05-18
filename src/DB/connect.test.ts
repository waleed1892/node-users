import sequelize from "./connect";

describe('connect to database', () => {
    beforeAll(async () => {
        await sequelize.authenticate()
    })
    afterAll(async () => {
        await sequelize.close()
    })
})