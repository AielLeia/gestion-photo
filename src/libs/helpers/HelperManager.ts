import HelperInterface from './HelperInterface'
import helpers from "./helpers"
import Handlebars from 'handlebars'
import * as core from 'express-serve-static-core'

export default class HelperManager {
    private app: core.Express

    private helpers: HelperInterface[] = []

    constructor (app: core.Express) {
        this.app = app
        this.helpers = helpers
    }

    public compile (): void {
        this.helpers.forEach(helper => {
            Handlebars.registerHelper(helper.name, helper.fn)
        })
    }
}