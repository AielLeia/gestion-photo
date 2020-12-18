"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiCommentController {
    constructor(comment) {
        this.comment = comment;
    }
    comments(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.params.id || '';
            this.comment.findCommentsByPictureID(id, (comments) => {
                response.status(200).json(comments);
            });
        }
        else {
            response.render("404");
        }
    }
    deleteComment(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.body.id || '';
            this.comment.delete(id, (statusCode) => {
                response.status(statusCode).json(statusCode);
            });
        }
        else {
            response.render("404");
        }
    }
    addComment(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let to = request.body.to || '';
            let firstName = request.body.firstName || '';
            let lastName = request.body.lastName || '';
            let content = request.body.content || '';
            this.comment.add({ firstName, lastName, content, to }, (statusCode) => {
                response.status(statusCode).json(statusCode);
            });
        }
        else {
            response.render("404");
        }
    }
}
exports.default = ApiCommentController;
