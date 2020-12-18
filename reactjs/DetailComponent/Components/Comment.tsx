import React, { Component } from 'react'
import { CommentInterfaceProps, CommentInterfaceState, CommentAttribute } from '../Definitions'
import Axios from 'axios'

export default class Comment extends Component<CommentInterfaceProps, CommentInterfaceState> {
    constructor (props: CommentInterfaceProps) {
        super(props)
        this.state = {
            comments: [],
            error: {
                key: '',
                message: ''
            }
        }
    }

    componentDidMount () {
        Axios
            .get('http://localhost:3000/api/comments/' + this.props.id, {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                if (response.data === null) return
                let results: CommentAttribute[] = []
                for (let i: number = 0; i < response.data.length; i++) {
                    results.push({
                        id: response.data[i].row.id,
                        visitorName: response.data[i].row.visitorName,
                        createAt: response.data[i].row.createAt,
                        content: response.data[i].row.content,
                        to: response.data[i].row.to
                    })
                }
                this.setState({ comments: results })
            })
            .catch(error => { throw error })
    }

    public handlePostComment = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        let btn: HTMLButtonElement = e.currentTarget.elements['submit-button' as any] as HTMLButtonElement
        btn.setAttribute('disabled', '')
        btn.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> attente...'

        let to: string = this.props.id.replace('http://gestion-photo.com/', '')
        let firstName: HTMLInputElement = (e.currentTarget.elements['firstName' as any] as HTMLInputElement)
        let lastName: HTMLInputElement = (e.currentTarget.elements['lastName' as any] as HTMLInputElement)
        let content: HTMLTextAreaElement = (e.currentTarget.elements['content' as any] as HTMLTextAreaElement)

        if (firstName.value.trim() === '') {
            let r = {
                key: 'firstName',
                message: 'Ce champs est requis'
            }
            btn.removeAttribute('disabled')
            btn.innerHTML = 'Poster'
            this.setState({ error: r })
            return
        }
        if (lastName.value.trim() === '') {
            let r = {
                key: 'lastName',
                message: 'Ce champs est requis'
            }
            btn.removeAttribute('disabled')
            btn.innerHTML = 'Poster'
            this.setState({ error: r })
            return
        }
        if (content.value.trim() === '') {
            let r = {
                key: 'content',
                message: 'Ce champs est requis'
            }
            btn.removeAttribute('disabled')
            btn.innerHTML = 'Poster'
            this.setState({ error: r })
            return
        }

        Axios
            .post('http://localhost:3000/api/add-comment', {
                to: to, firstName: firstName.value.trim(), lastName: lastName.value.trim(), content: content.value.trim()
            }, {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                console.log(response.data)
                if (response.data === 200) {
                    btn.removeAttribute('disabled')
                    btn.innerHTML = 'Posté un commentaire'
                    this.setState({ comments: [{ content: content.value.trim(), visitorName: firstName.value.trim() + ' ' + lastName.value.trim().toUpperCase(), to, id: '', createAt: '' }, ...this.state.comments], error: { key: '', message: '' } })
                    firstName.value = ''
                    lastName.value = ''
                    content.value = ''
                }
            })
            .catch(error => { throw error })

    }

    render () {
        let { comments } = this.state
        return (
            <div>
                <h3>Posté un commentaire</h3>
                <form onSubmit={ this.handlePostComment }>
                    <div className="form-row">
                        <div className="col-md-6 mb-4">
                            <label htmlFor="firstName">Prènom</label>
                            <input type="text" className={ "form-control" + (this.state.error.key === 'firstName' ? ' is-invalid' : '') } name="firstName" id="firstName" />
                            {
                                this.state.error.key !== 'firstName' ? null :
                                    <div className="invalid-feedback">{ this.state.error.message }</div>
                            }
                        </div>
                        <div className="col-md-6 mb-4">
                            <label htmlFor="lastName">Nom</label>
                            <input type="text" className={ "form-control" + (this.state.error.key === 'lastName' ? ' is-invalid' : '') } name="lastName" id="lastName" />
                            {
                                this.state.error.key !== 'lastName' ? null :
                                    <div className="invalid-feedback">{ this.state.error.message }</div>
                            }
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-4">
                            <label htmlFor="content">Contenue</label>
                            <textarea name="content" className={ "form-control" + (this.state.error.key === 'content' ? ' is-invalid' : '') } id="content" rows={ 5 } />
                            {
                                this.state.error.key !== 'content' ? null :
                                    <div className="invalid-feedback">{ this.state.error.message }</div>
                            }
                        </div>
                    </div>
                    <button name="submit-button" className="btn btn-primary mb-4" type="submit">Poster</button>
                </form>
                <h3 className="mb-4"><i className="fas fa-comments"></i> { this.state.comments.length } Commentaire{ this.state.comments.length > 1 ? 's' : '' }</h3>
                { comments.map((comment, index) => {
                    return (
                        <li key={ index } className="media my-4">
                            <a href="#" className="pull-left">
                                <img src="https://randomuser.me/api/portraits/lego/7.jpg" style={ { maxWidth: '50px' } } />
                            </a>
                            <div className="media-body ml-4">
                                <span className="text-muted pull-right">
                                    <small className="text-muted">{ comment.visitorName }</small>
                                </span>
                                <p>
                                    { comment.content }
                                </p>
                            </div>
                        </li>
                    )
                }) }
            </div>
        )
    }
}
