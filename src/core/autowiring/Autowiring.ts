import { AutowiringInterface } from "./AutowiringInterface";

export default class Autowiring {
    private controllers: Array<AutowiringInterface>

    private default: AutowiringInterface

    constructor () {
        this.controllers = []
        this.default = {
            key: '',
            value: ''
        }
    }

    public setController (key: string, value: any): this {
        this.controllers.push({
            key,
            value
        })
        return this
    }

    public getController (key: string): AutowiringInterface {
        return this.controllers.find(controller => controller.key === key) || this.default
    }
}