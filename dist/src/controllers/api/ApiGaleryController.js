"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiGaleryController {
    constructor(picture) {
        this.picture = picture;
    }
    galery(request, response) {
        if (request.headers.from !== undefined && request.headers.from === 'js-react') {
            let id = request.params.id || '';
            let offset = +request.query.offset || 0;
            if (id === 'all') {
                this.picture.getLastPosted(offset, (count, pictures) => {
                    if (count <= offset) {
                        response.setHeader('cant-fetch', 'true');
                    }
                    response.status(200).json(pictures);
                });
            }
            else {
                this.picture.getByCategory(id, offset, (count, pictures) => {
                    if (count <= offset) {
                        response.setHeader('cant-fetch', 'true');
                    }
                    response.status(200).json(pictures);
                });
            }
        }
        else {
            response.render("404");
        }
    }
}
exports.default = ApiGaleryController;
