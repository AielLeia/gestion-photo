"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("../../core/App"));
const moment_1 = __importDefault(require("moment"));
let helpers = [
    {
        name: 'path',
        fn: (name) => {
            let routes = App_1.default.getInstance().getAppRouter().getRoutes();
            let route;
            route = routes.find(r => r.name === name);
            return route === undefined ? '' : route.link;
        }
    },
    {
        name: 'dateParser',
        fn: (date) => {
            return moment_1.default(new Date(date)).format('DD-MM-YYYY');
        }
    },
    {
        name: 'base_url',
        fn: (url) => {
            return 'http://localhost:3000' + url;
        }
    },
    {
        name: 'not',
        fn: (value) => {
            return !value;
        }
    },
    {
        name: 'replace',
        fn: (value, oldValue, newValue) => {
            return value.replace(oldValue, newValue);
        }
    }
];
exports.default = helpers;
