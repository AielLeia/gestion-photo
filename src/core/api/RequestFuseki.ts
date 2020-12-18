import queryString from 'querystring'
import http from 'http'

export default class RequestFuseki {
    public get (parameters: { query: string, format: 'JSON' }, fn: (chunk: any) => void): void {
        const options = {
            url: 'http://localhost',
            port: "3030",
            path: '/GestionPhoto/query?' + queryString.stringify(parameters),
            method: 'GET'
        }
        const req = http.request(options, res => {
            res.setEncoding('utf-8')
            res.on('data', (chunk) => {
                chunk = JSON.parse(chunk)
                fn(chunk)
            });
        })

        req.on('error', error => {
            throw error
        })
        req.end()
    }

    public post (parameters: { update: string }, fn: (statusCode: number) => void) {
        const options = {
            hostname: 'localhost',
            port: 3030,
            path: '/GestionPhoto/update',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        let req = http.request(options, (res) => {
            fn(res.statusCode || 404)
        })
        req.write(queryString.stringify(parameters))
        req.end()
    }
}