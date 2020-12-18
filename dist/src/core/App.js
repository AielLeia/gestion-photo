"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AppRouter_1 = __importDefault(require("./router/AppRouter"));
const HelperManager_1 = __importDefault(require("../libs/helpers/HelperManager"));
const app_1 = __importDefault(require("../config/app"));
let App = /** @class */ (() => {
    class App {
        constructor() {
            this.app = express_1.default();
            new HelperManager_1.default(this.app).compile();
            this.defineConfig();
            this.appRouter = new AppRouter_1.default(this.app);
        }
        start(port) {
            this.appRouter.run();
            this.app.listen(port, () => console.log("Application disponible sur: http://localhost:3000/"));
        }
        static getInstance() {
            return App.instance;
        }
        getAppRouter() {
            return this.appRouter;
        }
        defineConfig() {
            let config = app_1.default;
            this.setConfig(config.set);
            this.useConfig(config.use);
            this.engineConfig(config.engine);
        }
        setConfig(sConfig) {
            for (let i = 0; i < sConfig.length; i++)
                this.app.set(sConfig[i].key, sConfig[i].value);
        }
        useConfig(uConfig) {
            for (let i = 0; i < uConfig.length; i++)
                this.app.use(uConfig[i].key, uConfig[i].value);
        }
        engineConfig(uConfig) {
            for (let i = 0; i < uConfig.length; i++)
                this.app.engine(uConfig[i].key, uConfig[i].value);
        }
    }
    App.instance = new App();
    return App;
})();
exports.default = App;
