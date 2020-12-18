"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_input_validator_1 = __importDefault(require("node-input-validator"));
const User_1 = __importDefault(require("../models/User"));
class AccueilController {
    index(request, response) {
        response.render('accueil');
    }
    galery(request, response) {
        response.render('galery');
    }
    detail(request, response) {
        response.render("detail", { id: request.params.id });
    }
    login(request, response) {
        response.render("login");
    }
    logout(request, response) {
        if (request.session && request.session.user) {
            request.session.user = null;
            response.redirect('/');
        }
        else
            response.status(404).render('404');
    }
    dashboard(request, response) {
        if (request.session && request.session.user)
            response.render('user/dashboard');
        else
            response.status(404).render('404');
    }
    table(request, response) {
        if (request.session && request.session.user)
            response.render('user/table');
        else
            response.status(404).render('404');
    }
    newPicture(request, response) {
        if (request.session && request.session.user)
            response.render('user/new');
        else
            response.status(404).render('404');
    }
    addPicture(request, response) {
        // Recuperation des données postées
        let title = request.body.title;
        let categories = request.body.categories;
        let virtualFolders = request.body.virtualFolders;
        let fileName = request.files.fileName;
        let description = request.body.description;
    }
    detailPicture(request, response) {
        let id = request.params.id || '';
        if (id !== '') {
            if (request.session && request.session.user)
                response.render('user/detail', {
                    pictureID: id
                });
            else
                response.status(404).render('404');
        }
        else {
            response.status(404).render('404');
        }
    }
    connection(request, response) {
        // Récuperation des données postées
        let username = request.body.username;
        let password = request.body.password;
        // Préparation du système de validation
        const validation = new node_input_validator_1.default.Validator({
            username: username,
            password: password
        }, {
            username: 'required',
            password: 'required'
        });
        node_input_validator_1.default.niceNames({
            username: 'Pseudo',
            password: 'Mot de passe'
        });
        node_input_validator_1.default.extendMessages({
            required: 'Le champs :attribute est requis'
        });
        // Vérification des contraintres de validation
        validation.check()
            .then(matched => {
            // Contrainte non respecté
            if (!matched) {
                let usernameMessage = validation.errors.username !== undefined ? validation.errors.username.message : '';
                let passwordMessage = validation.errors.password !== undefined ?
                    validation.errors.password.message : '';
                response.render('login', {
                    username: usernameMessage,
                    password: passwordMessage,
                    usernameData: username
                });
                // Contrainte respecté
            }
            else {
                let user = new User_1.default();
                user.getUserByIdentifier(username, password, (user) => {
                    // Vérification des données récupere du model
                    // Mauvais identifiants
                    if (user === null) {
                        response.render('login', {
                            usernameData: username,
                            error: 'Identifiants incorrect'
                        });
                        // Bon identifiant
                    }
                    else {
                        let id = user.getAttribute('id').replace('http://gestion-photo.com/', '');
                        if (request.session) {
                            if (!request.session.user)
                                request.session.user = new User_1.default();
                            request.session.user = user;
                            response.redirect('/dashboard');
                        }
                    }
                });
            }
        });
    }
}
exports.default = AccueilController;
