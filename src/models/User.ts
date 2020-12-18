import { UserAttribute } from './ModelsInterface'
import Model from './Model'

interface DataAttribute {
    data: Array<number>
    labels: Array<string>
}

export default class User extends Model {
    private row: UserAttribute

    constructor () {
        super()
        this.row = {
            id: '',
            firstName: '',
            lastName: '',
            pseudo: '',
            password: '',
            phoneNumber: ''
        }
    }

    public setAttribute<T extends string, K extends keyof UserAttribute> (key: K, value: T): this {
        this.row[key] = value
        return this
    }

    public getAttribute<T extends string, K extends keyof UserAttribute> (key: K): T {
        return this.row[key] as T
    }

    public find (id: string, fn: (user: User | null) => void): void {
        let query: string = this.queryBuilder
            .select('firstName', 'lastName', 'pseudo', 'password', 'phoneNumber')
            .where(
                [`:${id}`, ':firstName', 'firstName'],
                [`:${id}`, ':lastName', 'lastName'],
                [`:${id}`, ':pseudo', 'pseudo'],
                [`:${id}`, ':password', 'password'],
                [`:${id}`, ':phoneNumber', 'phoneNumber'],
            )
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let result: User = new User()
                    .setAttribute('id', id)
                    .setAttribute('firstName', chunk.results.bindings[0].firstName.value)
                    .setAttribute('lastName', chunk.results.bindings[0].lastName.value)
                    .setAttribute('password', chunk.results.bindings[0].password.value)
                    .setAttribute('pseudo', chunk.results.bindings[0].pseudo.value)
                    .setAttribute('phoneNumber', chunk.results.bindings[0].phoneNumber.value)
                fn(result)
            } else {
                fn(null)
            }
        })
    }

    public getUserByIdentifier (username: string, password: string, fn: (user: User | null) => void): void {
        let query: string = this.queryBuilder
            .select('id', 'firstName', 'lastName', 'pseudo', 'password', 'phoneNumber')
            .where(
                ['id', ':pseudo', `'${username}'`],
                ['id', ':password', `'${password}'`],
                ['id', ':firstName', 'firstName'],
                ['id', ':lastName', 'lastName'],
                ['id', ':phoneNumber', 'phoneNumber']
            )
            .getQuery()

        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let result: User = new User()
                    .setAttribute('id', chunk.results.bindings[0].id.value)
                    .setAttribute('firstName', chunk.results.bindings[0].firstName.value)
                    .setAttribute('lastName', chunk.results.bindings[0].lastName.value)
                    .setAttribute('password', password)
                    .setAttribute('pseudo', username)
                    .setAttribute('phoneNumber', chunk.results.bindings[0].phoneNumber.value)
                fn(result)
            } else {
                fn(null)
            }
        })
    }

    public getStatistics (id: string, fn: (statistics: { like: number, dislike: number, view: number }) => void): void {
        let query: string = this.queryBuilder
            .select('(SUM(?sumLike) as ?like)', '(SUM(?sumDislike) as ?dislike)', '(SUM(?sumView) as ?view)')
            .where(
                ['id', ':isPosted', `:${id}`],
                ['id', ':like', 'sumLike'],
                ['id', ':dislike', 'sumDislike'],
                ['id', ':view', 'sumView'],
            )
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                fn({
                    like: chunk.results.bindings[0].like.value,
                    dislike: chunk.results.bindings[0].dislike.value,
                    view: chunk.results.bindings[0].view.value
                })
            }
        })
    }

    public getStatisticsByMonth (id: string, fn: (statistics: { like: DataAttribute, dislike: DataAttribute, view: DataAttribute }) => void): void {
        let query: string = this.queryBuilder
            .select('date', '(SUM(?sumLike) as ?like)', '(SUM(?sumDislike) as ?dislike)', '(SUM(?sumView) as ?view)')
            .where(
                ['id', ':isPosted', `:${id}`],
                ['id', ':postedAt', 'postedAt'],
                ['id', ':like', 'sumLike'],
                ['id', ':dislike', 'sumDislike'],
                ['id', ':view', 'sumView']
            )
            .groupBy('(strdt(concat(substr(?postedAt, 1, 4), \'-\', substr(?postedAt, 6, 2), \'-\', \'01\'), xsd:dateTime) as ?date)')
            .orderBy('date', 'ASC')
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let results = chunk.results.bindings
                let result: any = {
                    like: {
                        data: [],
                        labels: []
                    },
                    dislike: {
                        data: [],
                        labels: []
                    },
                    view: {
                        data: [],
                        labels: []
                    }
                }
                for (let i: number = 0; i < results.length; i++) {
                    result.like.data.push(results[i].like.value)
                    result.like.labels.push(results[i].date.value)

                    result.dislike.data.push(results[i].dislike.value)
                    result.dislike.labels.push(results[i].date.value)

                    result.view.data.push(results[i].view.value)
                    result.view.labels.push(results[i].date.value)
                }
                fn(result)
            }
        })
    }
}