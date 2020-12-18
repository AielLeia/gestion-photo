"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(require("querystring"));
const http_1 = __importDefault(require("http"));
const Model_1 = __importDefault(require("./Model"));
class Picture extends Model_1.default {
    constructor() {
        super();
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
        };
    }
    setAttribute(key, value) {
        this.row[key] = value;
        return this;
    }
    getAttribute(key) {
        return this.row[key];
    }
    updatePicture(newData, fn) {
        let query = `
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
        `;
        this.requestFuseki
            .post({
            update: query
        }, chunk => {
            fn(chunk);
        });
    }
    addPicture(newData, fn) {
    }
    getByCategory(key, offset, fn) {
        let query = this.queryBuilder
            .select('id', 'fileName', 'postedAt', 'isStored', 'belongsTo', 'isPosted', 'title', 'description', 'isVisible', 'like', 'dislike', 'view')
            .where(['id', ':belongsTo', `:${key}`], ['id', ':fileName', 'fileName'], ['id', ':postedAt', 'postedAt'], ['id', ':isStored', 'isStored'], ['id', ':isPosted', 'isPosted'], ['id', ':title', 'title'], ['id', ':description', 'description'], ['id', ':isVisible', 'isVisible'], ['id', ':like', 'like'], ['id', ':dislike', 'dislike'], ['id', ':view', 'view'])
            .orderBy('postedAt', 'DESC')
            .limit(12)
            .offset(offset)
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            this.getCountByCategory(key, (count) => {
                let results = [];
                for (let index = 0; index < chunk.results.bindings.length; index++) {
                    results.push(new Picture()
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
                        .setAttribute('view', chunk.results.bindings[index].view.value));
                }
                fn(count, results);
            });
        });
    }
    getLastPosted(offset, fn) {
        let query = this.queryBuilder
            .select('id', 'fileName', 'postedAt', 'isStored', 'belongsTo', 'isPosted', 'title', 'description', 'isVisible', 'like', 'dislike', 'view')
            .where(['id', ':belongsTo', 'belongsTo'], ['id', ':fileName', 'fileName'], ['id', ':postedAt', 'postedAt'], ['id', ':isStored', 'isStored'], ['id', ':isPosted', 'isPosted'], ['id', ':title', 'title'], ['id', ':description', 'description'], ['id', ':isVisible', 'isVisible'], ['id', ':like', 'like'], ['id', ':dislike', 'dislike'], ['id', ':view', 'view'])
            .orderBy('postedAt', 'DESC')
            .limit(12)
            .offset(offset)
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            this.getCount(count => {
                let results = [];
                for (let index = 0; index < chunk.results.bindings.length; index++) {
                    results.push(new Picture()
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
                        .setAttribute('view', chunk.results.bindings[index].view.value));
                }
                fn(count, results);
            });
        });
    }
    findByID(key, fn) {
        let query = this.queryBuilder
            .select('fileName', 'postedAt', 'isStored', 'belongsTo', 'isPosted', 'title', 'description', 'isVisible', 'like', 'dislike', 'view')
            .where([`:${key}`, ':fileName', 'fileName'], [`:${key}`, ':postedAt', 'postedAt'], [`:${key}`, ':isStored', 'isStored'], [`:${key}`, ':belongsTo', 'belongsTo'], [`:${key}`, ':isPosted', 'isPosted'], [`:${key}`, ':title', 'title'], [`:${key}`, ':description', 'description'], [`:${key}`, ':isVisible', 'isVisible'], [`:${key}`, ':like', 'like'], [`:${key}`, ':dislike', 'dislike'], [`:${key}`, ':view', 'view'])
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let result = new Picture()
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
                    .setAttribute('view', chunk.results.bindings[0].view.value);
                fn(result);
            }
            else {
                fn(null);
            }
        });
    }
    picturesByID(field, id, limite = 4, fn) {
        let whereClause = this.buildQuery(field, [
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
        ]);
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
        };
        const options = {
            url: 'http://localhost',
            port: "3030",
            path: '/GestionPhoto/query?' + querystring_1.default.stringify(parameters),
            method: 'GET'
        };
        const req = http_1.default.request(options, res => {
            res.on('data', (chunk) => {
                chunk = JSON.parse(chunk);
                if (chunk.results.bindings.length !== 0) {
                    let result = [];
                    let results = chunk.results.bindings;
                    for (let index = 0; index < chunk.results.bindings.length; index++) {
                        result.push(new Picture()
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
                            .setAttribute('view', results[index].view === undefined ? id : results[index].view.value));
                    }
                    fn(result);
                }
                else {
                    fn(null);
                }
            });
        });
        req.on('error', error => {
            throw error;
        });
        req.end();
    }
    getCount(fn) {
        let query = this.queryBuilder
            .select('(COUNT (*) as ?count)')
            .where(['id', ':fileName', 'fileName'])
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            fn(chunk.results.bindings[0].count.value);
        });
    }
    getCountByCategory(key, fn) {
        let query = this.queryBuilder
            .select('cID', '(COUNT(?id) as ?count)')
            .where(['id', ':belongsTo', `:${key}`])
            .groupBy('cID')
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => fn(chunk.results.bindings[0].count.value));
    }
    buildQuery(field, triplePatternArray) {
        triplePatternArray.sort((a, b) => a.includes(field) ? -1 : b.includes(field) ? 1 : 0);
        return triplePatternArray.join('.');
    }
}
exports.default = Picture;
