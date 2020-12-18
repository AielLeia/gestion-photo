import express, { request, Request, Response } from 'express'
import path from 'path'
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser'
import session from 'express-session'
import Session from '../libs/session/Session'
import upload from 'express-fileupload'

let appConfig: any = {
    use: [
        {
            key: '/assets/js',
            value: express.static(path.join(__dirname, '../../reactjs'))
        },
        {
            key: '/assets/picture',
            value: express.static(path.join(__dirname, '../../pictures'))
        },
        {
            key: '',
            value: bodyParser.urlencoded({ extended: false })
        },
        {
            key: '',
            value: bodyParser.json()
        },
        {
            key: '',
            value: session({
                secret: "GestionPhoto",
                resave: false,
                saveUninitialized: false,
                cookie: { secure: false }
            })
        },
        {
            key: '',
            value: Session.getUser
        },
        {
            key: '',
            value: upload()
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
            value: exphbs()
        }
    ]
}

export default appConfig 