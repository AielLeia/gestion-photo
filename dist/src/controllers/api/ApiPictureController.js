"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiPictureController {
    constructor(picture, category, virtualFolder, comment) {
        this.picture = picture;
        this.category = category;
        this.comment = comment;
        this.virtualFolder = virtualFolder;
    }
    index(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let offset = +request.query.offset || 0;
            this.picture.getLastPosted(offset, (count, pictures) => {
                if (count <= offset) {
                    response.setHeader('cant-fetch', 'true');
                }
                response.status(200).json(pictures);
            });
        }
        else {
            response.render("404");
        }
    }
    detail(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.params.id || '';
            this.picture.findByID(id, (picture) => {
                response.status(200).json(picture);
            });
        }
        else {
            response.render("404");
        }
    }
    picturesByID(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.params.id || '';
            let field = request.query.field;
            let limit = +(request.query.limit) || 4;
            this.picture.picturesByID(field, id, limit, (pictures) => {
                response.status(200).json(pictures);
            });
        }
        else {
            response.render("404");
        }
    }
    pictureDetail(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.params.id || '';
            this.picture.findByID(id, (picture) => {
                this.category.getAllCategories((categories) => {
                    this.comment.findCommentsByPictureID(id, (comments) => {
                        this.virtualFolder.findFoldersByUserID(picture.getAttribute('isPosted').replace('http://gestion-photo.com/', ''), (virtualFolders) => {
                            response.status(200).json({ picture, categories, comments, virtualFolders });
                        });
                    });
                });
            });
        }
        else {
            response.render("404");
        }
    }
    updatePicture(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.body.id || '';
            let title = request.body.title || '';
            let category = request.body.category || '';
            let virtualFolder = request.body.virtualFolder || '';
            let description = request.body.description || '';
            this.picture.updatePicture({
                id, title, category, virtualFolder, description
            }, (statusCode) => {
                response.status(statusCode).json(statusCode);
            });
        }
        else {
            response.render("404");
        }
    }
}
exports.default = ApiPictureController;
