"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Autowiring {
    constructor() {
        this.controllers = [];
        this.default = {
            key: '',
            value: ''
        };
    }
    setController(key, value) {
        this.controllers.push({
            key,
            value
        });
        return this;
    }
    getController(key) {
        return this.controllers.find(controller => controller.key === key) || this.default;
    }
}
exports.default = Autowiring;
