"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor() {
        this.query = {
            select: [],
            where: [],
            groupBy: [],
            optional: [],
            limit: 0,
            orderBy: '',
            offset: 0
        };
        this.queryInsert = {
            data: []
        };
    }
    insert(...properties) {
        properties.forEach(p => {
            if (p.object.charAt(0) === ':')
                this.queryInsert.data.push(`gestionPhoto:${p.subject} gestionPhoto:${p.prediacte} gestionPhoto${p.object}`);
            else
                this.queryInsert.data.push(`gestionPhoto:${p.subject} gestionPhoto:${p.prediacte} '${p.object}'`);
        });
        return this;
    }
    select(...item) {
        item.forEach(i => {
            if (i.charAt(0) !== '(')
                this.query.select.push(`?${i}`);
            else
                this.query.select.push(i);
        });
        return this;
    }
    where(...item) {
        item.forEach(i => {
            if (i.length !== 3)
                throw new Error('Array item must be an array of 3 element');
            let result = ``;
            i.forEach(value => {
                if (value.charAt(0) === '\'')
                    result += `${value} `;
                else if (value.charAt(0) === ':')
                    result += `gestionPhoto${value} `;
                else
                    result += `?${value} `;
            });
            this.query.where.push(result.trim());
        });
        return this;
    }
    optional(...item) {
        item.forEach(i => {
            if (i.length !== 3)
                throw new Error('Array item must be an array of 3 element');
            let result = ``;
            i.forEach(value => {
                if (value.charAt(0) === '\'')
                    result += `${value} `;
                else if (value.charAt(0) === ':')
                    result += `gestionPhoto${value} `;
                else
                    result += `?${value} `;
            });
            this.query.optional.push(result.trim());
        });
        return this;
    }
    groupBy(...item) {
        item.forEach(i => {
            if (i.charAt(0) === '(')
                this.query.groupBy.push(`${i}`);
            else
                this.query.groupBy.push(`?${i}`);
        });
        return this;
    }
    limit(value) {
        this.query.limit = value;
        return this;
    }
    orderBy(field, direction = 'ASC') {
        if (this.query.select.indexOf(`?${field}`) === -1)
            return this;
        this.query.orderBy = `${direction.toUpperCase()}(?${field})`;
        return this;
    }
    offset(value) {
        this.query.offset = value;
        return this;
    }
    getQuery() {
        let query = `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            SELECT ${this.query.select.join(' ')}
            FROM <gestion:photo>
            WHERE {
                ${this.query.where.join('.')}
                ${this.query.optional.length !== 0 ? `OPTIONAL { ${this.query.optional.join('.')} }` : ''}
            }
            ${this.query.groupBy.length !== 0 ? `GROUP BY ${this.query.groupBy.join(' ')}` : ''}
            ${this.query.orderBy !== '' ? `ORDER BY ${this.query.orderBy}` : ''}
            ${this.query.limit !== 0 ? `LIMIT ${this.query.limit}` : ''}
            ${this.query.offset !== 0 ? `OFFSET ${this.query.offset}` : ''}
        `;
        this.query = {
            select: [],
            where: [],
            groupBy: [],
            optional: [],
            limit: 0,
            orderBy: '',
            offset: 0
        };
        return query;
    }
    getQueryInsert() {
        let query = `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
            INSERT DATA {
                GRAPH <gestion:photo> {
                    ${this.queryInsert.data.join('.\n')}
                }
            }
        `;
        this.queryInsert = {
            data: []
        };
        return query;
    }
}
exports.default = QueryBuilder;
