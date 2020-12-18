"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestFuseki_1 = __importDefault(require("../core/api/RequestFuseki"));
const QueryBuilder_1 = __importDefault(require("../libs/queryBuilder/QueryBuilder"));
class Model {
    constructor() {
        this.requestFuseki = new RequestFuseki_1.default();
        this.queryBuilder = new QueryBuilder_1.default();
    }
}
exports.default = Model;
