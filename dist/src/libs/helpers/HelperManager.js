"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __importDefault(require("./helpers"));
const handlebars_1 = __importDefault(require("handlebars"));
class HelperManager {
    constructor(app) {
        this.helpers = [];
        this.app = app;
        this.helpers = helpers_1.default;
    }
    compile() {
        this.helpers.forEach(helper => {
            handlebars_1.default.registerHelper(helper.name, helper.fn);
        });
    }
}
exports.default = HelperManager;
