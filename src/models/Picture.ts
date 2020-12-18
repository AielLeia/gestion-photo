import queryString from 'querystring'
import http from 'http'
import { PictureAttribute } from './ModelsInterface'
import Model from './Model'

export default class Picture extends Model {
    private row: PictureAttribute

    constructor () {
        super()
        this.row = {
            id: 'string',
            fileName: 'string',
            postedAt: 'string',
            isStored: 'string',
            belongsTo: 'string',
            isPosted: 'string',
            title: 'string',
            description: 'string',
            isVisible: false,
            like: 0,
            dislike: 0,
            view: 0
        }
    }

    public setAttribute<K extends keyof PictureAttribute> (key: K, value: any): this {
        this.row[key] = value
        return this
    }

    public getAttribute<K extends keyof PictureAttribute> (key: K) {
        return this.row[key]
    }

    public updatePicture (newData: { id: string, title: string, category: string, virtualFolder: string, description: string }, fn: (statusCode: number) => void) {
        let query: string = `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
            DELETE {
                GRAPH <gestion:photo> {
                    gestionPhoto:${newData.id} gestionPhoto:title ?title.
                    gestionPhoto:${newData.id} gestionPhoto:belongsTo ?category.
                    gestionPhoto:${newData.id} gestionPhoto:isStored ?virtualFolder.
                    gestionPhoto:${newData.id} gestionPhoto:description ?description.
                }
            }
            INSERT {
                GRAPH <gestion:photo> {
                    gestionPhoto:${newData.id} gestionPhoto:title '${newData.title}'.
                    gestionPhoto:${newData.id} gestionPhoto:belongsTo gestionPhoto:${newData.category}.
                    gestionPhoto:${newData.id} gestionPhoto:isStored gestionPhoto:${newData.virtualFolder}.
                    gestionPhoto:${newData.id} gestionPhoto:description '${newData.description}'.
                }
            }
            USING <gestion:photo>
            WHERE {
                gestionPhoto:${newData.id} gestionPhoto:title ?title.
                gestionPhoto:${newData.id} gestionPhoto:belongsTo ?category.
                gestionPhoto:${newData.id} gestionPhoto:isStored ?virtualFolder.
                gestionPhoto:${newData.id} gestionPhoto:description ?description.
            }
        `
        this.requestFuseki
            .post({
                update: query
            }, chunk => {
                fn(chunk)
            })
    }

    public addPicture (newData: { isPosted: string, title: string, category: string, virtualFolder: string, description: string }, fn: (statusCode: number) => void) {

    }

    public getByCategory (key: string, offset: number, fn: (count: number, pictures: Picture[]) => void): void {
        let query: string = this.queryBuilder
            .select('id', 'fileName', 'postedAt', 'isStored', 'belongsTo', 'isPosted', 'title', 'description', 'isVisible', 'like', 'dislike', 'view')
            .where(
                ['id', ':belongsTo', `:${key}`],
                ['id', ':fileName', 'fileName'],
                ['id', ':postedAt', 'postedAt'],
                ['id', ':isStored', 'isStored'],
                ['id', ':isPosted', 'isPosted'],
                ['id', ':title', 'title'],
                ['id', ':description', 'description'],
                ['id', ':isVisible', 'isVisible'],
                ['id', ':like', 'like'],
                ['id', ':dislike', 'dislike'],
                ['id', ':view', 'view'],
            )
            .orderBy('postedAt', 'DESC')
            .limit(12)
            .offset(offset)
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            this.getCountByCategory(key, (count: number) => {
                let results: Picture[] = []
                for (let index: number = 0; index < chunk.results.bindings.length; index++) {
                    results.push(
                        new Picture()
                            .setAttribute('id', chunk.results.bindings[index].id.value)
                            .setAttribute('fileName', chunk.results.bindings[index].fileName.value)
                            .setAttribute('postedAt', chunk.results.bindings[index].postedAt.value)
                            .setAttribute('isStored', chunk.results.bindings[index].isStored.value)
                            .setAttribute('belongsTo', key)
                            .setAttribute('isPosted', chunk.results.bindings[index].isPosted.value)
                            .setAttribute('title', chunk.results.bindings[index].title.value)
                            .setAttribute('description', chunk.results.bindings[index].description.value)
                            .setAttribute('isVisible', chunk.results.bindings[index].isVisible.value)
                            .setAttribute('like', chunk.results.bindings[index].like.value)
                            .setAttribute('dislike', chunk.results.bindings[index].dislike.value)
                            .setAttribute('view', chunk.results.bindings[index].view.value)
                    )
                }
                fn(count, results)
            })
        })
    }

    public getLastPosted (offset: number, fn: (cout: number, pictures: Picture[]) => void): void {
        let query: string = this.queryBuilder
            .select('id', 'fileName', 'postedAt', 'isStored', 'belongsTo', 'isPosted', 'title', 'description', 'isVisible', 'like', 'dislike', 'view')
            .where(
                ['id', ':belongsTo', 'belongsTo'],
                ['id', ':fileName', 'fileName'],
                ['id', ':postedAt', 'postedAt'],
                ['id', ':isStored', 'isStored'],
                ['id', ':isPosted', 'isPosted'],
                ['id', ':title', 'title'],
                ['id', ':description', 'description'],
                ['id', ':isVisible', 'isVisible'],
                ['id', ':like', 'like'],
                ['id', ':dislike', 'dislike'],
                ['id', ':view', 'view'],
            )
            .orderBy('postedAt', 'DESC')
            .limit(12)
            .offset(offset)
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            this.getCount(count => {
                let results: Picture[] = []
                for (let index: number = 0; index < chunk.results.bindings.length; index++) {
                    results.push(
                        new Picture()
                            .setAttribute('id', chunk.results.bindings[index].id.value)
                            .setAttribute('fileName', chunk.results.bindings[index].fileName.value)
                            .setAttribute('postedAt', chunk.results.bindings[index].postedAt.value)
                            .setAttribute('isStored', chunk.results.bindings[index].isStored.value)
                            .setAttribute('belongsTo', chunk.results.bindings[index].belongsTo.value)
                            .setAttribute('isPosted', chunk.results.bindings[index].isPosted.value)
                            .setAttribute('title', chunk.results.bindings[index].title.value)
                            .setAttribute('description', chunk.results.bindings[index].description.value)
                            .setAttribute('isVisible', chunk.results.bindings[index].isVisible.value)
                            .setAttribute('like', chunk.results.bindings[index].like.value)
                            .setAttribute('dislike', chunk.results.bindings[index].dislike.value)
                            .setAttribute('view', chunk.results.bindings[index].view.value)
                    )
                }
                fn(count, results)
            })
        })
    }

    public findByID (key: string, fn: (picture: Picture | null) => void): void {
        let query: string = this.queryBuilder
            .select('fileName', 'postedAt', 'isStored', 'belongsTo', 'isPosted', 'title', 'description', 'isVisible', 'like', 'dislike', 'view')
            .where(
                [`:${key}`, ':fileName', 'fileName'],
                [`:${key}`, ':postedAt', 'postedAt'],
                [`:${key}`, ':isStored', 'isStored'],
                [`:${key}`, ':belongsTo', 'belongsTo'],
                [`:${key}`, ':isPosted', 'isPosted'],
                [`:${key}`, ':title', 'title'],
                [`:${key}`, ':description', 'description'],
                [`:${key}`, ':isVisible', 'isVisible'],
                [`:${key}`, ':like', 'like'],
                [`:${key}`, ':dislike', 'dislike'],
                [`:${key}`, ':view', 'view'],
            )
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let result: Picture =
                    new Picture()
                        .setAttribute('id', key)
                        .setAttribute('fileName', chunk.results.bindings[0].fileName.value)
                        .setAttribute('postedAt', chunk.results.bindings[0].postedAt.value)
                        .setAttribute('isStored', chunk.results.bindings[0].isStored.value)
                        .setAttribute('belongsTo', chunk.results.bindings[0].belongsTo.value)
                        .setAttribute('isPosted', chunk.results.bindings[0].isPosted.value)
                        .setAttribute('title', chunk.results.bindings[0].title.value)
                        .setAttribute('description', chunk.results.bindings[0].description.value)
                        .setAttribute('isVisible', chunk.results.bindings[0].isVisible.value)
                        .setAttribute('like', chunk.results.bindings[0].like.value)
                        .setAttribute('dislike', chunk.results.bindings[0].dislike.value)
                        .setAttribute('view', chunk.results.bindings[0].view.value)
                fn(result)
            } else {
                fn(null)
            }
        })
    }

    public picturesByID (field: string, id: string, limite: number = 4, fn: (pictures: Picture[] | null) => void): void {
        let whereClause: string = this.buildQuery(field, [
            `?id gestionPhoto:belongsTo ${field === 'belongsTo' ? `gestionPhoto:${id}` : '?belongsTo'}`,
            `?id gestionPhoto:fileName ${field === 'fileName' ? `${id}` : '?fileName'}`,
            `?id gestionPhoto:postedAt ${field === 'postedAt' ? `${id}` : '?postedAt'}`,
            `?id gestionPhoto:isStored ${field === 'isStored' ? `gestionPhoto:${id}` : '?isStored'}`,
            `?id gestionPhoto:isPosted ${field === 'isPosted' ? `gestionPhoto:${id}` : '?isPosted'}`,
            `?id gestionPhoto:title ${field === 'title' ? `${id}` : '?title'}`,
            `?id gestionPhoto:description ${field === 'description' ? `${id}` : '?description'}`,
            `?id gestionPhoto:isVisible ${field === 'isVisible' ? ` ${id}` : '?isVisible'}`,
            `?id gestionPhoto:like ${field === 'like' ? `${id}` : '?like'}`,
            `?id gestionPhoto:dislike ${field === 'dislike' ? `${id}` : '?dislike'}`,
            `?id gestionPhoto:view ${field === 'view' ? `${id}` : '?view'}`
        ])
        const parameters = {
            query: `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
    
            SELECT ?id ?fileName ?postedAt ?isStored ?belongsTo ?isPosted ?title ?description ?isVisible ?like ?dislike ?view
            FROM <gestion:photo>
            WHERE {
                ${whereClause}
            }
            LIMIT ${limite}
            `,
            format: 'JSON'
        }
        const options = {
            url: 'http://localhost',
            port: "3030",
            path: '/GestionPhoto/query?' + queryString.stringify(parameters),
            method: 'GET'
        }
        const req = http.request(options, res => {
            res.on('data', (chunk) => {
                chunk = JSON.parse(chunk)
                if (chunk.results.bindings.length !== 0) {
                    let result: Picture[] = []
                    let results = chunk.results.bindings
                    for (let index: number = 0; index < chunk.results.bindings.length; index++) {
                        result.push(
                            new Picture()
                                .setAttribute('id', results[index].id === undefined ? id : results[index].id.value)
                                .setAttribute('fileName', results[index].fileName === undefined ? id : results[index].fileName.value)
                                .setAttribute('postedAt', results[index].postedAt === undefined ? id : results[index].postedAt.value)
                                .setAttribute('isStored', results[index].isStored === undefined ? id : results[index].isStored.value)
                                .setAttribute('belongsTo', results[index].belongsTo === undefined ? id : results[index].belongsTo.value)
                                .setAttribute('isPosted', results[index].isPosted === undefined ? id : results[index].isPosted.value)
                                .setAttribute('title', results[index].title === undefined ? id : results[index].title.value)
                                .setAttribute('description', results[index].description === undefined ? id : results[index].description.value)
                                .setAttribute('isVisible', results[index].isVisible === undefined ? id : results[index].isVisible.value)
                                .setAttribute('like', results[index].like === undefined ? id : results[index].like.value)
                                .setAttribute('dislike', results[index].dislike === undefined ? id : results[index].dislike.value)
                                .setAttribute('view', results[index].view === undefined ? id : results[index].view.value)
                        )
                    }
                    fn(result)
                } else {
                    fn(null)
                }
            });
        })

        req.on('error', error => {
            throw error
        })
        req.end()
    }

    public getCount (fn: (count: number) => void): void {
        let query: string = this.queryBuilder
            .select('(COUNT (*) as ?count)')
            .where(
                ['id', ':fileName', 'fileName']
            )
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            fn(chunk.results.bindings[0].count.value)
        })
    }

    public getCountByCategory (key: string, fn: (count: number) => void): void {
        let query: string = this.queryBuilder
            .select('cID', '(COUNT(?id) as ?count)')
            .where(['id', ':belongsTo', `:${key}`])
            .groupBy('cID')
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => fn(chunk.results.bindings[0].count.value))
    }

    private buildQuery (field: string, triplePatternArray: Array<string>): string {
        triplePatternArray.sort((a, b) => a.includes(field) ? -1 : b.includes(field) ? 1 : 0)
        return triplePatternArray.join('.')
    }
}