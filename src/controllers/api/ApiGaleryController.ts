import { Request, Response } from "express";
import Picture from "../../models/Picture";

export default class ApiGaleryController {
    private picture: Picture

    constructor (picture: Picture) {
        this.picture = picture
    }

    public galery (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.params.id || ''
            let offset: number = +request.query.offset || 0
            if (id === 'all') {
                this.picture.getLastPosted(offset, (count: number, pictures: Picture[]) => {
                    if (count <= offset) {
                        response.setHeader('cant-fetch', 'true')
                    }
                    response.status(200).json(pictures)
                })
            } else {
                this.picture.getByCategory(id, offset, (count, pictures: Picture[]) => {
                    if (count <= offset) {
                        response.setHeader('cant-fetch', 'true')
                    }
                    response.status(200).json(pictures)
                })
            }
        } else {
            response.render("404")
        }
    }
}