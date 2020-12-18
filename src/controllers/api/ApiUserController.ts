import User from "../../models/User";
import { Request, Response } from "express";
import VirtualFolder from "../../models/VirtualFolder";

export default class ApiUserController {
    private user: User
    private virtualFolder: VirtualFolder

    constructor (user: User, virtualFolder: VirtualFolder) {
        this.user = user
        this.virtualFolder = virtualFolder
    }

    public detail (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.params.id || ''
            this.user.find(id, (user: User | null) => {
                response.status(200).json(user)
            })
        } else {
            response.render("404")
        }
    }

    public statistics (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.params.id || ''
            this.user.getStatistics(id, (data) => {
                response.status(200).json(data)
            })
        } else {
            response.render("404")
        }
    }

    public statisticsByMonth (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.params.id || ''
            this.user.getStatisticsByMonth(id, (data) => {
                response.status(200).json(data)
            })
        } else {
            response.render("404")
        }
    }

    public virtualFolders (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = request.params.id || ''
            this.virtualFolder.findFoldersByUserID(id, (data) => {
                response.status(200).json(data)
            })
        } else {
            response.render("404")
        }
    }
}