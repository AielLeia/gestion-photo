const faker = require('faker')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')

module.exports = (users, filesNames, virtualFolders, categories) => {
    faker.locale = 'fr'
    const picturesData = []

    for (let i = 0; i < 104; i++) {
        picturesData.push(
            {
                id: 'photo-' + uuidv4(),
                fileName: filesNames[i],
                postedAt: moment(faker.date.recent(365)).format('YYYY-MM-DD'),
                isStored: virtualFolders[i % 10].id,
                belongsTo: categories[faker.random.number(4)].id,
                isPosted: users[i % 5].id,
                title: faker.lorem.words(3),
                description: faker.lorem.sentences(4),
                isVisible: faker.random.boolean(),
                like: faker.random.number(),
                dislike: faker.random.number(),
                view: faker.random.number()
            }
        )
    }

    return picturesData
}