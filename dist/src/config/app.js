"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const Session_1 = __importDefault(require("../libs/session/Session"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
let appConfig = {
    use: [
        {
            key: '/assets/js',
            value: express_1.default.static(path_1.default.join(__dirname, '../../reactjs'))
        },
        {
            key: '/assets/picture',
            value: express_1.default.static(path_1.default.join(__dirname, '../../pictures'))
        },
        {
            key: '',
            value: body_parser_1.default.urlencoded({ extended: false })
        },
        {
            key: '',
            value: body_parser_1.default.json()
        },
        {
            key: '',
            value: express_session_1.default({
                secret: "GestionPhoto",
                resave: false,
                saveUninitialized: false,
                cookie: { secure: false }
            })
        },
        {
            key: '',
            value: Session_1.default.getUser
        },
        {
            key: '',
            value: express_fileupload_1.default()
        }
    ],
    set: [
        {
            key: 'view engine',
            value: 'handlebars'
        }
    ],
    engine: [
        {
            key: 'handlebars',
            value: express_handlebars_1.default()
        }
    ]
};
exports.default = appConfig;
