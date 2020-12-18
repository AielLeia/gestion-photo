const faker = require('faker')
const { v4: uuidv4 } = require('uuid')

module.exports = (pictures) => {
    faker.locale = 'fr'
    const commentsData = []

    for (let i = 0; i < 104; i++) {
        commentsData.push(
            {
                id: 'comment-' + uuidv4(),
                visitorName: faker.name.firstName() + ' ' + faker.name.lastName().toUpperCase(),
                content: faker.lorem.sentences(5),
                to: pictures[faker.random.number(103)].id,
                createAt: pictures[faker.random.number(103)].postedAt
            }
        )
    }

    return commentsData
}