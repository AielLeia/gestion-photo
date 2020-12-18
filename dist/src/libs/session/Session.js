"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Session {
    static getUser(request, response, next) {
        if (request.session && request.session.user) {
            response.locals.user = request.session.user;
        }
        next();
    }
}
exports.default = Session;
