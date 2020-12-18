"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("../../config/routes"));
const controllers_1 = __importDefault(require("../../config/controllers"));
class AppRouter {
    constructor(app) {
        this.routeList = [];
        this.app = app;
        routes_1.default.forEach(route => {
            this.routeList.push({
                name: route.name,
                link: route.link,
                method: route.method,
                action: route.action
            });
        });
    }
    getApp() {
        return this.app;
    }
    getRoutes() {
        return this.routeList;
    }
    run() {
        this.routeList.forEach(route => {
            if (route.method.toUpperCase() === 'GET')
                this.get(route);
            else if (route.method.toUpperCase() === 'POST')
                this.post(route);
        });
    }
    get(route) {
        let result = controllers_1.default.getController(route.action.split('@')[0]);
        let controller = result.value;
        this.app.get(route.link, controller[route.action.split('@')[1]].bind(controller));
    }
    post(route) {
        let result = controllers_1.default.getController(route.action.split('@')[0]);
        let controller = result.value;
        this.app.post(route.link, controller[route.action.split('@')[1]].bind(controller));
    }
}
exports.default = AppRouter;
