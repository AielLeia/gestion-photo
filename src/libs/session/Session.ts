import { Request, Response } from "express";

export default class Session {
    static getUser (request: Request, response: Response, next: Function): void {
        if (request.session && request.session.user) {
            response.locals.user = request.session.user
        }
        next()
    }
}