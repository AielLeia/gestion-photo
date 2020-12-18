import { CategoryAttribute } from "./ModelsInterface";
import Model from "./Model";

export default class Category extends Model {
    private row: CategoryAttribute

    constructor () {
        super()
        this.row = {
            id: '',
            name: '',
            count: 0
        }
    }

    public setAttribute<K extends keyof CategoryAttribute> (key: K, value: any): this {
        this.row[key] = value
        return this
    }

    public getAttribute<K extends keyof CategoryAttribute> (key: K) {
        return this.row[key]
    }

    public getAllCategories (fn: (categories: Category[]) => void): void {
        let query: string = this.queryBuilder
            .select('id', 'name', '(COUNT(DISTINCT ?picID) as ?count)')
            .where(
                ['id', ':categoryName', 'name'],
                ['picID', ':belongsTo', 'id']
            )
            .groupBy('id', 'name')
            .getQuery()
        this.requestFuseki.get({
            query: query,
            format: 'JSON'
        }, chunk => {
            let result: Category[] = []
            let results = chunk.results.bindings
            for (let index: number = 0; index < chunk.results.bindings.length; index++)
                result.push(
                    new Category()
                        .setAttribute('id', results[index].id.value)
                        .setAttribute('name', results[index].name.value)
                        .setAttribute('count', results[index].count.value)
                )
            fn(result)
        })
    }
}