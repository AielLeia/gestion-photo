import { Request, Response } from "express";
import Category from "../../models/Category";

export default class ApiCategoryController {
    private category: Category

    constructor (category: Category) {
        this.category = category
    }

    public categories (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            this.category.getAllCategories((categories: Category[]) => {
                response.status(200).json(categories)
            })
        } else {
            response.render("404")
        }
    }
}