const renameFiles = require('./renameFiles')()
const users = require('./users')()
const categories = require('./categories')()
const virtualFolders = require('./virtualFolders')(users)
const pictures = require('./pictures')(users, renameFiles, virtualFolders, categories)
const comments = require('./comments')(pictures)

const http = require('http')
const options = {
    hostname: 'localhost',
    port: 3030,
    path: '/GestionPhoto/update',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

let init = http.request(options, (res) => {
    console.log(`Graph droped: ${res.statusCode}`)
    for (let i = 0; i < users.length; i++) {
        let query = 'update=' + `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
            INSERT DATA {
                GRAPH <gestion:photo> {
                    gestionPhoto:${users[i].id} gestionPhoto:firstName '${users[i].firstName}'.
                    gestionPhoto:${users[i].id} gestionPhoto:lastName '${users[i].lastName}'.
                    gestionPhoto:${users[i].id} gestionPhoto:pseudo '${users[i].pseudo}'.
                    gestionPhoto:${users[i].id} gestionPhoto:password '${users[i].password}'.
                    gestionPhoto:${users[i].id} gestionPhoto:phoneNumber '${users[i].phoneNumer}'
                }
            }
        `
        let req = http.request(options, (res) => {
            console.log(`user ${i + 1} added: ${res.statusCode}`)
        })
        req.write(query)
        req.end()
    }

    for (let i = 0; i < categories.length; i++) {
        let query = 'update=' + `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
            INSERT DATA {
                GRAPH <gestion:photo> {
                    gestionPhoto:${categories[i].id} gestionPhoto:categoryName '${categories[i].name}'.
                }
            }
        `
        let req = http.request(options, (res) => {
            console.log(`category ${i + 1} added: ${res.statusCode}`)
        })
        req.write(query)
        req.end()
    }

    for (let i = 0; i < virtualFolders.length; i++) {
        let query = 'update=' + `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
            INSERT DATA {
                GRAPH <gestion:photo> {
                    gestionPhoto:${virtualFolders[i].id} gestionPhoto:virtualFolderName '${virtualFolders[i].name}'.
                    gestionPhoto:${virtualFolders[i].id} gestionPhoto:isCreated gestionPhoto:${virtualFolders[i].isCreated}
                }
            }
        `
        let req = http.request(options, (res) => {
            console.log(`virtual folder ${i + 1} added: ${res.statusCode}`)
        })
        req.write(query)
        req.end()
    }

    for (let i = 0; i < pictures.length; i++) {
        let query = 'update=' + `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
            INSERT DATA {
                GRAPH <gestion:photo> {
                    gestionPhoto:${pictures[i].id} gestionPhoto:fileName '${pictures[i].fileName}'.
                    gestionPhoto:${pictures[i].id} gestionPhoto:postedAt '${pictures[i].postedAt}'.
                    gestionPhoto:${pictures[i].id} gestionPhoto:isStored gestionPhoto:${pictures[i].isStored}.
                    gestionPhoto:${pictures[i].id} gestionPhoto:belongsTo gestionPhoto:${pictures[i].belongsTo}.
                    gestionPhoto:${pictures[i].id} gestionPhoto:isPosted gestionPhoto:${pictures[i].isPosted}.
                    gestionPhoto:${pictures[i].id} gestionPhoto:title '${pictures[i].title}'.
                    gestionPhoto:${pictures[i].id} gestionPhoto:description '${pictures[i].description}'.
                    gestionPhoto:${pictures[i].id} gestionPhoto:isVisible ${pictures[i].isVisible}.
                    gestionPhoto:${pictures[i].id} gestionPhoto:like ${pictures[i].like}.
                    gestionPhoto:${pictures[i].id} gestionPhoto:dislike ${pictures[i].dislike}.
                    gestionPhoto:${pictures[i].id} gestionPhoto:view ${pictures[i].view}.
                }
            }
        `
        let req = http.request(options, (res) => {
            console.log(`pictures ${i + 1} added: ${res.statusCode}`)
        })
        req.write(query)
        req.end()
    }

    for (let i = 0; i < comments.length; i++) {
        let query = 'update=' + `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
            INSERT DATA {
                GRAPH <gestion:photo> {
                    gestionPhoto:${comments[i].id} gestionPhoto:visitorName '${comments[i].visitorName}'.
                    gestionPhoto:${comments[i].id} gestionPhoto:content '${comments[i].content}'.
                    gestionPhoto:${comments[i].id} gestionPhoto:createAt '${comments[i].createAt}'.
                    gestionPhoto:${comments[i].id} gestionPhoto:to gestionPhoto:${comments[i].to}.
                }
            }
        `
        let req = http.request(options, (res) => {
            console.log(`comment ${i + 1} added: ${res.statusCode}`)
        })
        req.write(query)
        req.end()
    }
})
init.write('update=' + `DROP GRAPH <gestion:photo>`)
init.end()
