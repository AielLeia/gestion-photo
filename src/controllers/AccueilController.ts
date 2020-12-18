import { Request, Response } from "express";
import Validator from 'node-input-validator'
import User from "../models/User";
import path from 'path'

export default class AccueilController {
    public index (request: Request, response: Response): void {
        response.render('accueil')
    }

    public galery (request: Request, response: Response): void {
        response.render('galery')
    }

    public detail (request: Request, response: Response): void {
        response.render("detail", { id: request.params.id })
    }

    public login (request: Request, response: Response): void {
        response.render("login")
    }

    public logout (request: Request, response: Response): void {
        if (request.session && request.session.user) {
            request.session.user = null
            response.redirect('/')
        } else response.status(404).render('404')
    }

    public dashboard (request: Request, response: Response): void {
        if (request.session && request.session.user) response.render('user/dashboard')
        else response.status(404).render('404')

    }

    public table (request: Request, response: Response): void {
        if (request.session && request.session.user) response.render('user/table')
        else response.status(404).render('404')
    }

    public newPicture (request: Request, response: Response): void {
        if (request.session && request.session.user) response.render('user/new')
        else response.status(404).render('404')
    }

    public addPicture (request: Request, response: Response): void {
        // Recuperation des données postées
        let title = request.body.title
        let categories = request.body.categories
        let virtualFolders = request.body.virtualFolders
        let fileName = request.files.fileName
        let description = request.body.description

    }

    public detailPicture (request: Request, response: Response): void {
        let id: string = request.params.id || ''
        if (id !== '') {
            if (request.session && request.session.user) response.render('user/detail', {
                pictureID: id
            })
            else response.status(404).render('404')
        } else {
            response.status(404).render('404')
        }
    }

    public connection (request: Request, response: Response): void {
        // Récuperation des données postées
        let username = request.body.username
        let password = request.body.password

        // Préparation du système de validation
        const validation = new Validator.Validator({
            username: username,
            password: password
        }, {
            username: 'required',
            password: 'required'
        })
        Validator.niceNames({
            username: 'Pseudo',
            password: 'Mot de passe'
        })
        Validator.extendMessages({
            required: 'Le champs :attribute est requis'
        })

        // Vérification des contraintres de validation
        validation.check()
            .then(matched => {
                // Contrainte non respecté
                if (!matched) {
                    let usernameMessage = validation.errors.username !== undefined ? validation.errors.username.message : ''
                    let passwordMessage = validation.errors.password !== undefined ?
                        validation.errors.password.message : ''
                    response.render('login', {
                        username: usernameMessage,
                        password: passwordMessage,
                        usernameData: username
                    })
                    // Contrainte respecté
                } else {
                    let user: User = new User()
                    user.getUserByIdentifier(username, password, (user: User | null) => {
                        // Vérification des données récupere du model

                        // Mauvais identifiants
                        if (user === null) {
                            response.render('login', {
                                usernameData: username,
                                error: 'Identifiants incorrect'
                            })
                            // Bon identifiant
                        } else {
                            let id: string = user.getAttribute('id').replace('http://gestion-photo.com/', '')
                            if (request.session) {
                                if (!request.session.user)
                                    request.session.user = new User()
                                request.session.user = user
                                response.redirect('/dashboard')
                            }
                        }
                    })
                }
            })
    }
}