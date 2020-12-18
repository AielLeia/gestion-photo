import { VirtualFolderAttribute } from "./ModelsInterface";
import Model from "./Model";

export default class VirtualFolder extends Model {
    private row: VirtualFolderAttribute

    constructor () {
        super()
        this.row = {
            id: '',
            name: '',
            isCreated: '',
            count: 0
        }
    }

    public setAttribute<K extends keyof VirtualFolderAttribute> (key: K, value: any): this {
        this.row[key] = value
        return this
    }

    public getAttribute<K extends keyof VirtualFolderAttribute> (key: K) {
        return this.row[key]
    }

    public findFoldersByUserID (id: string, fn: (virtualFolders: VirtualFolder[] | null) => void): void {
        let query: string = this.queryBuilder
            .select('virtualFolderID', 'virtualFolderName', '(COUNT(?id) as ?count)')
            .where(
                ['virtualFolderID', ':isCreated', `:${id}`],
                ['virtualFolderID', ':virtualFolderName', 'virtualFolderName']
            )
            .optional(
                ['id', ':isStored', 'virtualFolderID']
            )
            .groupBy('virtualFolderID', 'virtualFolderName')
            .getQuery()
        this.requestFuseki
            .get({
                query,
                format: 'JSON'
            }, chunk => {
                let results = chunk.results.bindings
                let result: VirtualFolder[] = []
                if (results.length !== 0) {
                    for (let i: number = 0; i < results.length; i++) {
                        result.push(
                            new VirtualFolder()
                                .setAttribute('id', results[i].virtualFolderID.value)
                                .setAttribute('name', results[i].virtualFolderName.value)
                                .setAttribute('count', results[i].count.value)
                        )
                    }
                    fn(result)
                } else {
                    fn(null)
                }
            })
    }

    public addVirtualFolder (data: VirtualFolderAttribute, fn: (status: number) => void): void {
        let query: string = this.queryBuilder
            .insert(
                { subject: `${data.id}`, prediacte: `isCreated`, object: `:${data.isCreated}` },
                { subject: `${data.id}`, prediacte: `virtualFolderName`, object: `${data.name}` }
            )
            .getQueryInsert()
        this.requestFuseki
            .post({
                update: query
            }, status => {
                fn(status)
            })
    }
}