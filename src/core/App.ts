import * as core from 'express-serve-static-core'
import express from 'express'
import AppRouter from './router/AppRouter'
import HelperManager from '../libs/helpers/HelperManager'
import appConfig from '../config/app'

export default class App {
    private app: core.Express

    private appRouter: AppRouter

    private static instance: App = new App()

    constructor () {
        this.app = express()
        new HelperManager(this.app).compile()
        this.defineConfig()
        this.appRouter = new AppRouter(this.app)
    }

    public start (port: number): void {
        this.appRouter.run()
        this.app.listen(port, () => console.log("Application disponible sur: http://localhost:3000/"))
    }

    public static getInstance (): App {
        return App.instance
    }

    public getAppRouter (): AppRouter {
        return this.appRouter
    }

    private defineConfig (): void {
        let config = appConfig
        this.setConfig(config.set)
        this.useConfig(config.use)
        this.engineConfig(config.engine)
    }

    private setConfig (sConfig: any) {
        for (let i: number = 0; i < sConfig.length; i++)
            this.app.set(sConfig[i].key, sConfig[i].value)
    }

    private useConfig (uConfig: any) {
        for (let i: number = 0; i < uConfig.length; i++)
            this.app.use(uConfig[i].key, uConfig[i].value)
    }

    private engineConfig (uConfig: any) {
        for (let i: number = 0; i < uConfig.length; i++)
            this.app.engine(uConfig[i].key, uConfig[i].value)
    }
}