const faker = require('faker')
const { v4: uuidv4 } = require('uuid')

module.exports = (users) => {
    faker.locale = 'fr'
    const virtualFoldersData = []

    for (let i = 0; i < 10; i++) {
        virtualFoldersData.push(
            {
                id: 'virtualFolder-' + uuidv4(),
                name: faker.lorem.words(1),
                isCreated: users[i % 5].id
            }
        )
    }

    return virtualFoldersData
}