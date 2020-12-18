const faker = require('faker')
const { v4: uuidv4 } = require('uuid')

module.exports = () => {
    faker.locale = 'fr'
    const categoriesData = []

    for (let i = 0; i < 5; i++) {
        categoriesData.push(
            {
                id: 'category-' + uuidv4(),
                name: faker.lorem.words(2)
            }
        )
    }

    return categoriesData
}