import RequestFuseki from "../core/api/RequestFuseki";
import QueryBuilder from '../libs/queryBuilder/QueryBuilder'

export default class Model {
    protected requestFuseki: RequestFuseki
    protected queryBuilder: QueryBuilder

    constructor () {
        this.requestFuseki = new RequestFuseki()
        this.queryBuilder = new QueryBuilder()
    }
}