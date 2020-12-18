import React, { Component } from 'react'
import { VirtualFolderInterfaceProps, VirtualFolderInterfaceState, VirtualFolderAttribute, PictureAttribute } from '../Definition'
import Axios from 'axios'
import numeral from 'numeral'
import moment from 'moment'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import './VirtualFolder.css'

export default class VirtualFolder extends Component<VirtualFolderInterfaceProps, VirtualFolderInterfaceState> {
    constructor (props: VirtualFolderInterfaceProps) {
        super(props)
        this.state = {
            virtualFolders: [],
            pictures: [],
            showPictures: false,
            showAddVirtualFolder: false,
            title: '',
            addState: {
                error: undefined,
                success: undefined
            }
        }
    }

    componentDidMount () {
        Axios
            .get('http://localhost:3000/api/virtualFolders/' + this.props.userID.replace('http://gestion-photo.com/', ''), {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                let results: VirtualFolderAttribute[] = []
                for (let i = 0; i < response.data.length; i++)
                    results.push({
                        id: response.data[i].row.id,
                        name: response.data[i].row.name,
                        count: response.data[i].row.count
                    })
                this.setState({ virtualFolders: results })
            })
            .catch(error => { throw error })
    }

    public loadPictures = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault()
        let name = e.currentTarget.dataset.name
        Axios
            .get(e.currentTarget.href, {
                params: {
                    field: 'isStored',
                    limit: e.currentTarget.dataset.limit
                },
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                let results: PictureAttribute[] = []
                if (response.data !== null)
                    for (let i: number = 0; i < response.data.length; i++) {
                        results.push({
                            id: response.data[i].row.id,
                            fileName: response.data[i].row.fileName,
                            postedAt: response.data[i].row.postedAt,
                            isStored: response.data[i].row.isStored,
                            belongsTo: response.data[i].row.belongsTo,
                            isPosted: response.data[i].row.isPosted,
                            title: response.data[i].row.title,
                            description: response.data[i].row.description,
                            isVisible: response.data[i].row.isVisible,
                            like: response.data[i].row.like,
                            dislike: response.data[i].row.dislike,
                            view: response.data[i].row.view,
                        })
                    }
                this.setState({ pictures: results, showPictures: true, title: name || '' })
            })
            .catch(error => { throw error })
    }

    public handleHidePicturesModal = (): void => {
        this.setState({ pictures: [], showPictures: false, title: '' })
    }

    public handleAddVirtualFolderModal = (): void => {
        this.setState({ showAddVirtualFolder: !this.state.showAddVirtualFolder })
    }

    public addNewVirtualFolder = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        e.currentTarget.elements['submit-button' as any].setAttribute('disabled', '')
        e.currentTarget.elements['submit-button' as any].innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> En cours de création...'
        let name: string = (e.currentTarget.elements['name' as any] as HTMLInputElement).value || ''
        let userId = this.props.userID.replace('http://gestion-photo.com/', '')
        if (name !== '') {
            Axios
                .post('http://localhost:3000/api/addVirtualFolder', {
                    name: name,
                    userId: userId
                }, {
                    headers: {
                        from: 'js-react'
                    }
                })
                .then(response => {
                    if (response.data === 200)
                        this.setState({ addState: { error: undefined, success: 'Dossier ajouter avec succès. Actualisé la page pour constaté les changements' }, showAddVirtualFolder: false })
                    else {
                        this.setState({ addState: { error: 'Erreur', success: undefined }, showAddVirtualFolder: false })
                    }
                })
                .catch(error => { throw error })
        } else {
            this.setState({ addState: { error: 'Ce champs est requis', success: undefined } })
        }
    }

    render () {
        let { virtualFolders, pictures } = this.state
        return (
            <div>
                { this.state.addState.success &&
                    <div className="alert alert-success">
                        { this.state.addState.success }
                    </div>
                }
                { this.state.addState.error &&
                    <div className="alert alert-danger">
                        { this.state.addState.error }
                    </div>
                }
                <button className="btn btn-primary mr-4 mb-4" onClick={ this.handleAddVirtualFolderModal }>Ajouter un nouveau dossier</button>
                <a href="http://localhost:3000/new" className="btn btn-outline-success mb-4">Ajouter une nouvelle photo</a>
                <div className="row">
                    { virtualFolders.map((vf, index) => {
                        return (
                            <div key={ index } className="col-md-6">
                                <div className="card mb-3">
                                    <div className="card-header font-weight-bold"><a data-limit={ vf.count } data-name={ vf.name } href={ "http://localhost:3000/api/picturesBy/" + vf.id.replace('http://gestion-photo.com/', '') } onClick={ this.loadPictures }>{ vf.name.toUpperCase() }</a></div>
                                    <div className="card-body">
                                        <h5 className="card-title font-weight-bold">Total</h5>
                                        <p className="card-text float-right" style={ { fontSize: '24px' } }>{ numeral(vf.count).format('0,0') } photo{ vf.count > 1 ? 's' : '' }</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) }
                    <Modal
                        show={ this.state.showPictures }
                        onHide={ this.handleHidePicturesModal }
                        centered={ true }
                        dialogClassName="modal-97w"
                        aria-labelledby="model"
                        scrollable={ true }
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="modal">
                                { this.state.title.toUpperCase() }
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Titre</th>
                                        <th>Date de poste</th>
                                        <th>Nombres de j'aime</th>
                                        <th>Nombres de j'aime pas</th>
                                        <th>Nombres de vues</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { pictures.map((picture, index) => {
                                        return (
                                            <tr key={ index }>
                                                <td><a href={ "http://localhost:3000/detail-picture/" + picture.id.replace('http://gestion-photo.com/', '') }>{ picture.id.replace('http://gestion-photo.com/', '') }</a></td>
                                                <td>{ picture.title }</td>
                                                <td>{ moment(new Date(picture.postedAt)).format('DD/MM/YYYY') }</td>
                                                <td>{ numeral(picture.like).format('0,0') }</td>
                                                <td>{ numeral(picture.dislike).format('0,0') }</td>
                                                <td>{ numeral(picture.view).format('0,0') }</td>
                                            </tr>
                                        )
                                    }) }

                                </tbody>
                            </Table>
                        </Modal.Body>
                    </Modal>
                    <Modal
                        show={ this.state.showAddVirtualFolder }
                        onHide={ this.handleAddVirtualFolderModal }
                        centered={ true }
                        aria-labelledby="model"
                        scrollable={ true }
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="modal">
                                Ajout
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={ this.addNewVirtualFolder } action="http://localhost:3000/api/addVirtualFolder" method="post">
                                <div className="from-group">
                                    <label htmlFor="name">Nom du nouveau dossier</label>
                                    <input type="text" className={ 'form-control ' + (this.state.addState.error !== undefined ? 'is-invalid' : '') } name="name" id="name" />
                                    { this.state.addState.error &&
                                        <div className="invalid-feedback">
                                            { this.state.addState.error }
                                        </div>
                                    }
                                </div>
                                <button name="submit-button" type="submit" className="btn btn-primary mt-4">Ajouter</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}
