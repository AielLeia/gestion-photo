import React, { Component } from 'react'
import Header from './Components/Header'
import Related from './Components/Related'
import { DetailInterfaceProps, DetailInterfaceState, PictureAttribute } from './Definitions'
import axios, { AxiosResponse } from 'axios'
import Comment from './Components/Comment'
import Spinner from 'react-bootstrap/Spinner'

export default class Detail extends Component<DetailInterfaceProps, DetailInterfaceState> {
    constructor (props: DetailInterfaceProps) {
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
            state: 'loading'
        }
    }

    componentDidMount () {
        axios
            .get('http://localhost:3000/api/picture/' + this.props.id, {
                headers: {
                    from: 'js-react'
                }
            })
            .then((response: AxiosResponse<any>) => {
                if (response.data === null) {
                    this.setState({ state: 'error' })
                    return
                }
                let result: PictureAttribute = {
                    id: response.data.row.id,
                    fileName: response.data.row.fileName,
                    postedAt: response.data.row.postedAt,
                    isStored: response.data.row.isStored,
                    belongsTo: response.data.row.belongsTo,
                    isPosted: response.data.row.isPosted,
                    title: response.data.row.title,
                    description: response.data.row.description,
                    isVisible: response.data.row.isVisible,
                    like: response.data.row.like,
                    dislike: response.data.row.dislike,
                    view: response.data.row.view
                }
                this.setState({ picture: result, state: 'loaded' })
            })
            .catch(error => { throw error })
    }

    render () {
        if (this.state.state === 'loaded') {
            return (
                <div>
                    <Header picture={ this.state.picture } />
                    <Related
                        url={ 'http://localhost:3000/api/picturesBy/' + this.state.picture.belongsTo.replace('http://gestion-photo.com/', '') + '?field=belongsTo' }
                        title="Dans la même catégorie"
                    />
                    <Related
                        url={ 'http://localhost:3000/api/picturesBy/' + this.state.picture.isPosted.replace('http://gestion-photo.com/', '') + '?field=isPosted' }
                        title="Du même auteur"
                    />
                    <Comment id={ this.state.picture.id } />
                </div>
            )
        } else if (this.state.state === 'error') {
            return (
                <div>
                    <h1>404 page non trouvée</h1>
                </div>
            )
        } else {
            return (
                <div className="text-center">
                    <Spinner animation="grow" variant="primary" />
                </div>
            )
        }
    }
}
