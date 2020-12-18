import VirtualFolder from '../../models/VirtualFolder'
import { Request, Response } from 'express'
import { v4 } from 'uuid'

export default class ApiVirtualFolderController {
    private virtualFolder: VirtualFolder

    constructor (virtualFolder: VirtualFolder) {
        this.virtualFolder = virtualFolder
    }

    public addVirtualFolder (request: Request, response: Response): void {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id: string = 'virtualFolder-' + v4()
            let name: string = request.body.name || ''
            let userId: string = request.body.userId || ''
            this.virtualFolder.addVirtualFolder({
                id: id,
                name: name,
                isCreated: userId,
                count: 0
            }, (data) => {
                response.status(200).json(data)
            })
        } else {
            response.render("404")
        }
    }
}