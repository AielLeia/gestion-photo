"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
const uuid = __importStar(require("uuid"));
const moment_1 = __importDefault(require("moment"));
class Comment extends Model_1.default {
    constructor() {
        super();
        this.row = {
            id: '',
            visitorName: '',
            content: '',
            to: '',
            createAt: ''
        };
    }
    setAttribute(key, value) {
        this.row[key] = value;
        return this;
    }
    getAttribute(key) {
        return this.row[key];
    }
    findCommentsByPictureID(id, fn) {
        let query = this.queryBuilder
            .select('id', 'visitorName', 'createdAt', 'content')
            .where(['id', ':to', `:${id}`], ['id', ':visitorName', 'visitorName'], ['id', ':createAt', 'createdAt'], ['id', ':content', 'content'])
            .orderBy('createdAt', 'DESC')
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let result = [];
                let results = chunk.results.bindings;
                for (let index = 0; index < chunk.results.bindings.length; index++) {
                    result.push(new Comment()
                        .setAttribute('id', results[index].id.value)
                        .setAttribute('content', results[index].content.value)
                        .setAttribute('visitorName', results[index].visitorName.value)
                        .setAttribute('createAt', results[index].createdAt.value)
                        .setAttribute('to', id));
                }
                fn(result);
            }
            else {
                fn(null);
            }
        });
    }
    delete(id, fn) {
        let query = `
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
        `;
        this.requestFuseki
            .post({
            update: query
        }, chunk => {
            fn(chunk);
        });
    }
    add(newData, fn) {
        let commentID = 'comment-' + uuid.v4();
        let query = this.queryBuilder
            .insert({ subject: commentID, prediacte: 'visitorName', object: newData.firstName + ' ' + newData.lastName.toUpperCase() }, { subject: commentID, prediacte: 'content', object: newData.content }, { subject: commentID, prediacte: 'to', object: ':' + newData.to }, { subject: commentID, prediacte: 'createAt', object: moment_1.default().format('YYYY-MM-DD') })
            .getQueryInsert();
        this.requestFuseki
            .post({
            update: query
        }, chunk => {
            fn(chunk);
        });
    }
}
exports.default = Comment;
