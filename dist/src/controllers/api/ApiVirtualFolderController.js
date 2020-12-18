"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class ApiVirtualFolderController {
    constructor(virtualFolder) {
        this.virtualFolder = virtualFolder;
    }
    addVirtualFolder(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = 'virtualFolder-' + uuid_1.v4();
            let name = request.body.name || '';
            let userId = request.body.userId || '';
            this.virtualFolder.addVirtualFolder({
                id: id,
                name: name,
                isCreated: userId,
                count: 0
            }, (data) => {
                response.status(200).json(data);
            });
        }
        else {
            response.render("404");
        }
    }
}
exports.default = ApiVirtualFolderController;
