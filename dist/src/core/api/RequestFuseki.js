"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(require("querystring"));
const http_1 = __importDefault(require("http"));
class RequestFuseki {
    get(parameters, fn) {
        const options = {
            url: 'http://localhost',
            port: "3030",
            path: '/GestionPhoto/query?' + querystring_1.default.stringify(parameters),
            method: 'GET'
        };
        const req = http_1.default.request(options, res => {
            res.setEncoding('utf-8');
            res.on('data', (chunk) => {
                chunk = JSON.parse(chunk);
                fn(chunk);
            });
        });
        req.on('error', error => {
            throw error;
        });
        req.end();
    }
    post(parameters, fn) {
        const options = {
            hostname: 'localhost',
            port: 3030,
            path: '/GestionPhoto/update',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let req = http_1.default.request(options, (res) => {
            fn(res.statusCode || 404);
        });
        req.write(querystring_1.default.stringify(parameters));
        req.end();
    }
}
exports.default = RequestFuseki;
