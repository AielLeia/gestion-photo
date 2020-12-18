const faker = require('faker')
const { v4: uuidv4 } = require('uuid')

module.exports = () => {
    faker.locale = 'fr'
    const usersData = []

    for (let i = 0; i < 5; i++) {
        usersData.push(
            {
                id: 'user-' + uuidv4(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                pseudo: faker.internet.userName(),
                password: faker.internet.password(8),
                phoneNumer: faker.phone.phoneNumber()
            }
        )
    }

    return usersData
}