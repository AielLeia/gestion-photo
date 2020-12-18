"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
class User extends Model_1.default {
    constructor() {
        super();
        this.row = {
            id: '',
            firstName: '',
            lastName: '',
            pseudo: '',
            password: '',
            phoneNumber: ''
        };
    }
    setAttribute(key, value) {
        this.row[key] = value;
        return this;
    }
    getAttribute(key) {
        return this.row[key];
    }
    find(id, fn) {
        let query = this.queryBuilder
            .select('firstName', 'lastName', 'pseudo', 'password', 'phoneNumber')
            .where([`:${id}`, ':firstName', 'firstName'], [`:${id}`, ':lastName', 'lastName'], [`:${id}`, ':pseudo', 'pseudo'], [`:${id}`, ':password', 'password'], [`:${id}`, ':phoneNumber', 'phoneNumber'])
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let result = new User()
                    .setAttribute('id', id)
                    .setAttribute('firstName', chunk.results.bindings[0].firstName.value)
                    .setAttribute('lastName', chunk.results.bindings[0].lastName.value)
                    .setAttribute('password', chunk.results.bindings[0].password.value)
                    .setAttribute('pseudo', chunk.results.bindings[0].pseudo.value)
                    .setAttribute('phoneNumber', chunk.results.bindings[0].phoneNumber.value);
                fn(result);
            }
            else {
                fn(null);
            }
        });
    }
    getUserByIdentifier(username, password, fn) {
        let query = this.queryBuilder
            .select('id', 'firstName', 'lastName', 'pseudo', 'password', 'phoneNumber')
            .where(['id', ':pseudo', `'${username}'`], ['id', ':password', `'${password}'`], ['id', ':firstName', 'firstName'], ['id', ':lastName', 'lastName'], ['id', ':phoneNumber', 'phoneNumber'])
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let result = new User()
                    .setAttribute('id', chunk.results.bindings[0].id.value)
                    .setAttribute('firstName', chunk.results.bindings[0].firstName.value)
                    .setAttribute('lastName', chunk.results.bindings[0].lastName.value)
                    .setAttribute('password', password)
                    .setAttribute('pseudo', username)
                    .setAttribute('phoneNumber', chunk.results.bindings[0].phoneNumber.value);
                fn(result);
            }
            else {
                fn(null);
            }
        });
    }
    getStatistics(id, fn) {
        let query = this.queryBuilder
            .select('(SUM(?sumLike) as ?like)', '(SUM(?sumDislike) as ?dislike)', '(SUM(?sumView) as ?view)')
            .where(['id', ':isPosted', `:${id}`], ['id', ':like', 'sumLike'], ['id', ':dislike', 'sumDislike'], ['id', ':view', 'sumView'])
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                fn({
                    like: chunk.results.bindings[0].like.value,
                    dislike: chunk.results.bindings[0].dislike.value,
                    view: chunk.results.bindings[0].view.value
                });
            }
        });
    }
    getStatisticsByMonth(id, fn) {
        let query = this.queryBuilder
            .select('date', '(SUM(?sumLike) as ?like)', '(SUM(?sumDislike) as ?dislike)', '(SUM(?sumView) as ?view)')
            .where(['id', ':isPosted', `:${id}`], ['id', ':postedAt', 'postedAt'], ['id', ':like', 'sumLike'], ['id', ':dislike', 'sumDislike'], ['id', ':view', 'sumView'])
            .groupBy('(strdt(concat(substr(?postedAt, 1, 4), \'-\', substr(?postedAt, 6, 2), \'-\', \'01\'), xsd:dateTime) as ?date)')
            .orderBy('date', 'ASC')
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            if (chunk.results.bindings.length !== 0) {
                let results = chunk.results.bindings;
                let result = {
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
                };
                for (let i = 0; i < results.length; i++) {
                    result.like.data.push(results[i].like.value);
                    result.like.labels.push(results[i].date.value);
                    result.dislike.data.push(results[i].dislike.value);
                    result.dislike.labels.push(results[i].date.value);
                    result.view.data.push(results[i].view.value);
                    result.view.labels.push(results[i].date.value);
                }
                fn(result);
            }
        });
    }
}
exports.default = User;
