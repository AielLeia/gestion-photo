import { Request, Response } from "express";
import Comment from "../../models/Comment";

export default class ApiCommentController {
    private comment: Comment

    constructor (comment: Comment) {
        this.comment = comment
    }

    public comments (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.params.id || ''
            this.comment.findCommentsByPictureID(id, (comments: Comment[] | null) => {
                response.status(200).json(comments)
            })
        } else {
            response.render("404")
        }
    }

    public deleteComment (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.body.id || ''
            this.comment.delete(id, (statusCode: number) => {
                response.status(statusCode).json(statusCode)
            })
        } else {
            response.render("404")
        }
    }

    public addComment (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let to: string = request.body.to || ''
            let firstName: string = request.body.firstName || ''
            let lastName: string = request.body.lastName || ''
            let content: string = request.body.content || ''
            this.comment.add({ firstName, lastName, content, to }, (statusCode: number) => {
                response.status(statusCode).json(statusCode)
            })
        } else {
            response.render("404")
        }
    }
}