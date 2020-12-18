export interface RDFPropertie {
    subject: string
    prediacte: string
    object: string
}

export interface QueryBuilderInsertAttribute {
    data: Array<string>
}

export interface QueryBuilderAttribute {
    select: Array<string>
    where: Array<string>
    groupBy: Array<string>
    limit: number
    orderBy: string
    offset: number
    optional: Array<string>
}