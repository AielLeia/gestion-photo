import { Request, Response } from "express"
import Picture from '../../models/Picture'
import Category from '../../models/Category'
import VirtualFolder from '../../models/VirtualFolder'
import Comment from '../../models/Comment'

export default class ApiPictureController {
    private picture: Picture

    private category: Category

    private virtualFolder: VirtualFolder

    private comment: Comment

    constructor (picture: Picture, category: Category, virtualFolder: VirtualFolder, comment: Comment) {
        this.picture = picture
        this.category = category
        this.comment = comment
        this.virtualFolder = virtualFolder
    }

    public index (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let offset: number = +request.query.offset || 0
            this.picture.getLastPosted(offset, (count: number, pictures: Picture[]) => {
                if (count <= offset) {
                    response.setHeader('cant-fetch', 'true')
                }
                response.status(200).json(pictures)
            })
        } else {
            response.render("404")
        }
    }

    public detail (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.params.id || ''
            this.picture.findByID(id, (picture) => {
                response.status(200).json(picture)
            })
        } else {
            response.render("404")
        }
    }

    public picturesByID (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.params.id || ''
            let field: string = request.query.field as string
            let limit: number = +(request.query.limit) || 4
            this.picture.picturesByID(field, id, limit, (pictures: Picture[] | null) => {
                response.status(200).json(pictures)
            })
        } else {
            response.render("404")
        }
    }

    public pictureDetail (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.params.id || ''
            this.picture.findByID(id, (picture: Picture | null) => {
                this.category.getAllCategories((categories: Category[]) => {
                    this.comment.findCommentsByPictureID(id, (comments: Comment[] | null) => {
                        this.virtualFolder.findFoldersByUserID(picture.getAttribute('isPosted').replace('http://gestion-photo.com/', ''), (virtualFolders: VirtualFolder[] | null) => {
                            response.status(200).json({ picture, categories, comments, virtualFolders })
                        })
                    })
                })
            })
        } else {
            response.render("404")
        }
    }

    public updatePicture (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.body.id || ''
            let title: string = request.body.title || ''
            let category: string = request.body.category || ''
            let virtualFolder: string = request.body.virtualFolder || ''
            let description: string = request.body.description || ''

            this.picture.updatePicture({
                id, title, category, virtualFolder, description
            }, (statusCode: number) => {
                response.status(statusCode).json(statusCode)
            })
        } else {
            response.render("404")
        }
    }
}