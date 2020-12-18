"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiCategoryController {
    constructor(category) {
        this.category = category;
    }
    categories(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            this.category.getAllCategories((categories) => {
                response.status(200).json(categories);
            });
        }
        else {
            response.render("404");
        }
    }
}
exports.default = ApiCategoryController;
