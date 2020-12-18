"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Autowiring_1 = __importDefault(require("../core/autowiring/Autowiring"));
const AccueilController_1 = __importDefault(require("../controllers/AccueilController"));
const Picture_1 = __importDefault(require("../models/Picture"));
const ApiPictureController_1 = __importDefault(require("../controllers/api/ApiPictureController"));
const ApiUserController_1 = __importDefault(require("../controllers/api/ApiUserController"));
const User_1 = __importDefault(require("../models/User"));
const ApiCommentController_1 = __importDefault(require("../controllers/api/ApiCommentController"));
const Comment_1 = __importDefault(require("../models/Comment"));
const ApiCategoryController_1 = __importDefault(require("../controllers/api/ApiCategoryController"));
const Category_1 = __importDefault(require("../models/Category"));
const ApiGaleryController_1 = __importDefault(require("../controllers/api/ApiGaleryController"));
const VirtualFolder_1 = __importDefault(require("../models/VirtualFolder"));
const ApiVirtualFolderController_1 = __importDefault(require("../controllers/api/ApiVirtualFolderController"));
let controllers = new Autowiring_1.default();
controllers
    .setController('AccueilController', new AccueilController_1.default())
    .setController('ApiPictureController', new ApiPictureController_1.default(new Picture_1.default(), new Category_1.default(), new VirtualFolder_1.default(), new Comment_1.default()))
    .setController('ApiUserController', new ApiUserController_1.default(new User_1.default(), new VirtualFolder_1.default()))
    .setController('ApiCommentController', new ApiCommentController_1.default(new Comment_1.default()))
    .setController('ApiCategoryController', new ApiCategoryController_1.default(new Category_1.default()))
    .setController('ApiGaleryController', new ApiGaleryController_1.default(new Picture_1.default()))
    .setController('ApiVirtualFolderController', new ApiVirtualFolderController_1.default(new VirtualFolder_1.default()));
exports.default = controllers;
