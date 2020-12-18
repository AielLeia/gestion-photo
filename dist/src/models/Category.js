"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
class Category extends Model_1.default {
    constructor() {
        super();
        this.row = {
            id: '',
            name: '',
            count: 0
        };
    }
    setAttribute(key, value) {
        this.row[key] = value;
        return this;
    }
    getAttribute(key) {
        return this.row[key];
    }
    getAllCategories(fn) {
        let query = this.queryBuilder
            .select('id', 'name', '(COUNT(DISTINCT ?picID) as ?count)')
            .where(['id', ':categoryName', 'name'], ['picID', ':belongsTo', 'id'])
            .groupBy('id', 'name')
            .getQuery();
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            let result = [];
            let results = chunk.results.bindings;
            for (let index = 0; index < chunk.results.bindings.length; index++)
                result.push(new Category()
                    .setAttribute('id', results[index].id.value)
                    .setAttribute('name', results[index].name.value)
                    .setAttribute('count', results[index].count.value));
            fn(result);
        });
    }
}
exports.default = Category;
