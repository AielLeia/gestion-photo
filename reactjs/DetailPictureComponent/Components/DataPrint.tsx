import React, { Component } from 'react'
import { DataPrintInterfaceProps, DataPrintInterfaceState, PictureAttribute, CategoryAttribute, VirtualFolderAttribute, CommentAttribute } from '../Definitions'
import Axios from 'axios'
import numeral from 'numeral'

export default class DataPrint extends Component<DataPrintInterfaceProps, DataPrintInterfaceState> {
    constructor (props: DataPrintInterfaceProps) {
        super(props)
        this.state = {
            picture: {
                id: '',
                fileName: '',
                postedAt: '',
                isStored: '',
                belongsTo: '',
                isPosted: '',
                title: '',
                description: '',
                isVisible: false,
                like: 0,
                dislike: 0,
                view: 0,
            },
            categories: [],
            comments: [],
            virtualFolders: [],
            save: false,
            updated: false
        }
    }

    componentDidMount () {
        Axios
            .get('http://localhost:3000/api/detail-picture/' + this.props.pictureId.replace('http://gestion-photo.com/', ''), {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                let results = response.data
                let pic: PictureAttribute
                let cats: CategoryAttribute[] = []
                let vfs: VirtualFolderAttribute[] = []
                let comm: CommentAttribute[] = []

                pic = results.picture.row
                for (let i: number = 0; i < results.categories.length; i++)
                    cats.push({
                        id: results.categories[i].row.id,
                        name: results.categories[i].row.name
                    })
                if (results.virtualFolders !== null)
                    for (let i: number = 0; i < results.virtualFolders.length; i++)
                        vfs.push({
                            id: results.virtualFolders[i].row.id,
                            name: results.virtualFolders[i].row.name
                        })
                if (results.comments !== null)
                    for (let i: number = 0; i < results.comments.length; i++)
                        comm.push({
                            id: results.comments[i].row.id,
                            visitorName: results.comments[i].row.visitorName,
                            content: results.comments[i].row.content,
                            createAt: results.comments[i].row.createAt
                        })

                this.setState({ picture: pic, categories: cats, comments: comm, virtualFolders: vfs })

            })
            .catch(error => { throw error })
    }

    public handleFormInputElementsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ picture: { ... this.state.picture, title: e.currentTarget.value } })
        this.setState({ save: true })
    }

    public handleFormTextAreaElementsChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({ picture: { ... this.state.picture, description: e.currentTarget.value } })
        this.setState({ save: true })
    }

    public handleFormSelectElementsChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        if (e.currentTarget.getAttribute('name') === 'categories')
            this.setState({ picture: { ... this.state.picture, belongsTo: e.currentTarget.value } })
        else
            this.setState({ picture: { ... this.state.picture, isStored: e.currentTarget.value } })
        this.setState({ save: true })
    }

    public saveChange = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        e.currentTarget.elements['submit-button' as any].setAttribute('disabled', '')
        e.currentTarget.elements['submit-button' as any].innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> En cours de sauvegarde...'

        let id: string = this.state.picture.id.replace('http://gestion-photo.com/', '')
        let title: string = (e.currentTarget.elements['title' as any] as HTMLInputElement).value || ''
        let category: string = (e.currentTarget.elements['categories' as any] as HTMLSelectElement).value.replace('http://gestion-photo.com/', '') || ''
        let virtualFolder: string = (e.currentTarget.elements['virtualFolders' as any] as HTMLSelectElement).value.replace('http://gestion-photo.com/', '') || ''
        let description: string = (e.currentTarget.elements['description' as any] as HTMLTextAreaElement).value || ''
        Axios
            .post('http://localhost:3000/api/update-picture', {
                id, title, category, virtualFolder, description
            }, {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                if (response.data === 200) {
                    this.setState({ updated: !this.state.updated, save: !this.state.save })
                }
            })
            .catch(error => { throw error })
    }

    public handleDeleteComment = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        let button: HTMLButtonElement = e.currentTarget as HTMLButtonElement
        button.setAttribute('disabled', '')
        button.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Suppression en cours...'

        let id: string = button.dataset.value || ''
        Axios
            .post('http://localhost:3000/api/delete-comment', {
                id: id.replace('http://gestion-photo.com/', '')
            }, {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                if (response.data === 200) {
                    this.setState({ comments: this.state.comments.filter(c => c.id !== id) })
                }
            })
            .catch(error => { throw error })
    }

    render () {
        return (
            <div>
                { !this.state.updated ? null :
                    <div className="alert alert-success">Changement effectuer avec succès</div>
                }
                <form onSubmit={ this.saveChange }>
                    <div className="row">
                        <div className="col-md-12 offset-md-3">
                            <img src={ '/assets/picture/' + this.state.picture.fileName } style={ { width: '50%' } } />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="title">Titre</label>
                            <input type="text" className="form-control" name="title" id="title" onChange={ this.handleFormInputElementsChange } value={ this.state.picture.title } />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="categories">Catégories</label>
                            <select onChange={ this.handleFormSelectElementsChange } value={ this.state.picture.belongsTo } className="custom-select" name="categories" id="categories">
                                { this.state.categories.map((catgory, index) => {
                                    return (
                                        <option key={ index } value={ catgory.id }>{ catgory.name }</option>
                                    )
                                }) }
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="virtualFolders">Dossiers</label>
                            <select onChange={ this.handleFormSelectElementsChange } value={ this.state.picture.isStored } className="custom-select" name="virtualFolders" id="virtualFolders">
                                { this.state.virtualFolders.map((vf, index) => {
                                    return (
                                        <option key={ index } value={ vf.id }>{ vf.name }</option>
                                    )
                                }) }
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-4 mb-4">
                            <input type="text" className="form-control" value={ numeral(this.state.picture.like).format('0,0') + ' likes' } disabled />
                        </div>
                        <div className="col-md-4 mb-4">
                            <input type="text" className="form-control" value={ numeral(this.state.picture.dislike).format('0,0') + ' dislikes' } disabled />
                        </div>
                        <div className="col-md-4 mb-4">
                            <input type="text" className="form-control" value={ numeral(this.state.picture.view).format('0,0') + ' vues' } disabled />
                        </div>
                    </div>
                    <div className="form-row mb-4">
                        <div className="col-md-12">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={ this.handleFormTextAreaElementsChange } className="form-control" name="description" id="description" rows={ 5 } value={ this.state.picture.description } />
                        </div>
                    </div>
                    {
                        !this.state.save ? null :
                            <button type="submit" name="submit-button" className="btn btn-primary my-4">Sauvegarder les modifications</button>
                    }
                </form>
                <h3><i className="fas fa-comments"></i> { this.state.comments.length } Commentaire{ this.state.comments.length > 1 ? 's' : '' }</h3>
                <ul className="list-unstyled">
                    { this.state.comments.map((comment, index) => {
                        return (
                            <li key={ index } className="media my-4">
                                <img src="https://randomuser.me/api/portraits/lego/7.jpg" style={ { maxWidth: '50px' } } className="align-self-center mr-3" />
                                <div className="media-body">
                                    <h5 className="mt-0 mb-1">{ comment.visitorName }</h5>
                                    { comment.content }
                                </div>
                                <button onClick={ this.handleDeleteComment } className="btn btn-danger align-self-center" data-value={ comment.id }>Supprimer</button>
                            </li>
                        )
                    }) }
                </ul>
            </div>
        )
    }
}
