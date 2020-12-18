"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiUserController {
    constructor(user, virtualFolder) {
        this.user = user;
        this.virtualFolder = virtualFolder;
    }
    detail(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.params.id || '';
            this.user.find(id, (user) => {
                response.status(200).json(user);
            });
        }
        else {
            response.render("404");
        }
    }
    statistics(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.params.id || '';
            this.user.getStatistics(id, (data) => {
                response.status(200).json(data);
            });
        }
        else {
            response.render("404");
        }
    }
    statisticsByMonth(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.params.id || '';
            this.user.getStatisticsByMonth(id, (data) => {
                response.status(200).json(data);
            });
        }
        else {
            response.render("404");
        }
    }
    virtualFolders(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.params.id || '';
            this.virtualFolder.findFoldersByUserID(id, (data) => {
                response.status(200).json(data);
            });
        }
        else {
            response.render("404");
        }
    }
}
exports.default = ApiUserController;
