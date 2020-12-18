import { CommentAttribute } from "./ModelsInterface"
import Model from './Model'
import * as uuid from 'uuid'
import moment from 'moment'

export default class Comment extends Model {
    private row: CommentAttribute

    constructor () {
        super()
        this.row = {
            id: '',
            visitorName: '',
            content: '',
            to: '',
            createAt: ''
        }
    }

    public setAttribute<K extends keyof CommentAttribute> (key: K, value: any): this {
        this.row[key] = value
        return this
    }

    public getAttribute<K extends keyof CommentAttribute> (key: K) {
        return this.row[key]
    }

    public findCommentsByPictureID (id: string, fn: (comments: Comment[] | null) => void): void {
        let query: string = this.queryBuilder
            .select('id', 'visitorName', 'createdAt', 'content')
            .where(
                ['id', ':to', `:${id}`],
                ['id', ':visitorName', 'visitorName'],
                ['id', ':createAt', 'createdAt'],
                ['id', ':content', 'content']
            )
            .orderBy('createdAt', 'DESC')
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let result: Comment[] = []
                let results = chunk.results.bindings
                for (let index: number = 0; index < chunk.results.bindings.length; index++) {
                    result.push(
                        new Comment()
                            .setAttribute('id', results[index].id.value)
                            .setAttribute('content', results[index].content.value)
                            .setAttribute('visitorName', results[index].visitorName.value)
                            .setAttribute('createAt', results[index].createdAt.value)
                            .setAttribute('to', id)
                    )
                }
                fn(result)
            } else {
                fn(null)
            }
        })
    }

    public delete (id: string, fn: (statusCode: number) => void): void {
        let query: string = `
            PREFIX gestionPhoto: <http://gestion-photo.com/>
            DELETE {
                GRAPH <gestion:photo> {
                    gestionPhoto:${id} gestionPhoto:content ?content.
                    gestionPhoto:${id} gestionPhoto:createAt ?createAt.
                    gestionPhoto:${id} gestionPhoto:to ?to.
                    gestionPhoto:${id} gestionPhoto:visitorName ?visitorName.
                }
            }
            USING <gestion:photo>
            WHERE {
                gestionPhoto:${id} gestionPhoto:content ?content.
                gestionPhoto:${id} gestionPhoto:createAt ?createAt.
                gestionPhoto:${id} gestionPhoto:to ?to.
                gestionPhoto:${id} gestionPhoto:visitorName ?visitorName.
            }
        `
        this.requestFuseki
            .post({
                update: query
            }, chunk => {
                fn(chunk)
            })
    }

    public add (newData: { firstName: string, lastName: string, content: string, to: string }, fn: (statusCode: number) => void): void {
        let commentID: string = 'comment-' + uuid.v4()
        let query: string = this.queryBuilder
            .insert(
                { subject: commentID, prediacte: 'visitorName', object: newData.firstName + ' ' + newData.lastName.toUpperCase() },
                { subject: commentID, prediacte: 'content', object: newData.content },
                { subject: commentID, prediacte: 'to', object: ':' + newData.to },
                { subject: commentID, prediacte: 'createAt', object: moment().format('YYYY-MM-DD') }
            )
            .getQueryInsert()
        this.requestFuseki
            .post({
                update: query
            }, chunk => {
                fn(chunk)
            })
    }
}   