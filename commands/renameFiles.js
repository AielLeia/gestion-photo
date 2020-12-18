const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

module.exports = () => {
    const directoryPath = path.join(__dirname, '..', 'dist', 'pictures')
    let newFilesNames = fs.readdirSync(directoryPath)
    newFilesNames.forEach((file, index, theArray) => {
        let id = 'photo-' + uuidv4() + '.jpg'
        theArray[index] = id
        fs.rename(path.join(directoryPath, file), path.join(directoryPath, id), () => { })
    }, newFilesNames)
    return newFilesNames
}