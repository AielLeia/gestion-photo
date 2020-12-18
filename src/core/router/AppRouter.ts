import routes from '../../config/routes'
import controllers from '../../config/controllers'
import { RouteInterface } from './RouterInterface'
import * as core from 'express-serve-static-core'
import { AutowiringInterface } from '../autowiring/AutowiringInterface'


export default class AppRouter {
    private routeList: RouteInterface[] = []

    private app: core.Express

    constructor (app: core.Express) {
        this.app = app
        routes.forEach(route => {
            this.routeList.push(
                {
                    name: route.name,
                    link: route.link,
                    method: route.method,
                    action: route.action
                }
            )
        })
    }

    public getApp (): core.Express {
        return this.app
    }

    public getRoutes (): RouteInterface[] {
        return this.routeList
    }

    public run (): void {
        this.routeList.forEach(route => {
            if (route.method.toUpperCase() === 'GET') this.get(route)
            else if (route.method.toUpperCase() === 'POST') this.post(route)
        })
    }

    private get (route: RouteInterface): void {
        let result: AutowiringInterface = controllers.getController(route.action.split('@')[0])
        let controller = result.value
        this.app.get(route.link, controller[route.action.split('@')[1]].bind(controller))
    }

    private post (route: RouteInterface): void {
        let result: AutowiringInterface = controllers.getController(route.action.split('@')[0])
        let controller = result.value
        this.app.post(route.link, controller[route.action.split('@')[1]].bind(controller))
    }
}