"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
class VirtualFolder extends Model_1.default {
    constructor() {
        super();
        this.row = {
            id: '',
            name: '',
            isCreated: '',
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
    findFoldersByUserID(id, fn) {
        let query = this.queryBuilder
            .select('virtualFolderID', 'virtualFolderName', '(COUNT(?id) as ?count)')
            .where(['virtualFolderID', ':isCreated', `:${id}`], ['virtualFolderID', ':virtualFolderName', 'virtualFolderName'])
            .optional(['id', ':isStored', 'virtualFolderID'])
            .groupBy('virtualFolderID', 'virtualFolderName')
            .getQuery();
        this.requestFuseki
            .get({
            query,
            format: 'JSON'
        }, chunk => {
            let results = chunk.results.bindings;
            let result = [];
            if (results.length !== 0) {
                for (let i = 0; i < results.length; i++) {
                    result.push(new VirtualFolder()
                        .setAttribute('id', results[i].virtualFolderID.value)
                        .setAttribute('name', results[i].virtualFolderName.value)
                        .setAttribute('count', results[i].count.value));
                }
                fn(result);
            }
            else {
                fn(null);
            }
        });
    }
    addVirtualFolder(data, fn) {
        let query = this.queryBuilder
            .insert({ subject: `${data.id}`, prediacte: `isCreated`, object: `:${data.isCreated}` }, { subject: `${data.id}`, prediacte: `virtualFolderName`, object: `${data.name}` })
            .getQueryInsert();
        this.requestFuseki
            .post({
            update: query
        }, status => {
            fn(status);
        });
    }
}
exports.default = VirtualFolder;
