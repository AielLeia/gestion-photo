import React, { Component } from 'react'
import moment from 'moment'
import { abbreviateNumber } from 'js-abbreviation-number'
import { ContentInterfaceProps, ContentInterfaceState, PictureAttribute } from '../Definitions'
import Axios from 'axios'

export default class Content extends Component<ContentInterfaceProps, ContentInterfaceState> {
    constructor (props: ContentInterfaceProps) {
        super(props)
        this.state = {
            url: '',
            pictures: props.initialPictures,
            length: props.length,
            visible: true
        }
    }

    static getDerivedStateFromProps (props: ContentInterfaceProps, state: ContentInterfaceState): ContentInterfaceState | null {
        if (props.initialPictures !== state.pictures && props.url !== state.url) {
            return {
                pictures: props.initialPictures,
                length: props.length,
                url: props.url,
                visible: true
            }
        }
        return null
    }


    public moreLoad = (): void => {
        this.load()
    }

    render () {
        let { pictures } = this.state
        return (
            <div className={ this.props.styleClass }>
                <div className="row">
                    { pictures.map((picture, index) => {
                        return <div key={ index } className="col-md-6 mt-4 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <div className="text-uppercase font-weight-bold">
                                        <a href={ '/detail/' + picture.id.replace('http://gestion-photo.com/', '') }>{ picture.title }</a>
                                    </div>
                                    <div>
                                        <i className="far fa-clock mr-2 text-secondary"><span className="p-2">{ moment(new Date(picture.postedAt)).format('DD/MM/YYYY') }</span></i>
                                    </div>
                                </div>
                                <img className="card-img" src={ '/assets/picture/' + picture.fileName } height="300" width="300" />
                                <div className="card-footer text-muted">
                                    <div className="d-flex flex-row-reverse">
                                        <i className="m-2 far fa-eye"><span className="p-2">{ abbreviateNumber(+picture.view, 1) }</span></i>
                                        <i className="m-2 far fa-thumbs-down"><span className="p-2">{ abbreviateNumber(+picture.dislike, 1) }</span></i>
                                        <i className="m-2 far fa-thumbs-up"><span className="p-2">{ abbreviateNumber(+picture.like, 1) }</span></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }) }
                </div>
                { (this.state.visible) ?
                    <button className="btn btn-primary m-4" onClick={ this.moreLoad }>plus de photos</button>
                    : null
                }
            </div>
        )
    }

    private load (): void {
        Axios
            .get(this.state.url, {
                params: {
                    offset: this.state.length
                },
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                let data: PictureAttribute[] = []
                Array.from(response.data).forEach((element: any) => {
                    data.push(
                        {
                            id: element.row.id,
                            fileName: element.row.fileName,
                            postedAt: element.row.postedAt,
                            title: element.row.title,
                            like: element.row.like,
                            dislike: element.row.dislike,
                            view: element.row.view,
                            isConnected: false
                        }
                    )
                });
                let result: PictureAttribute[] = this.state.pictures.slice()
                data.forEach(d => result.push(d))
                if (response.headers['cant-fetch'] == 'true') {
                    this.setState({ visible: false })
                }
                this.setState({ pictures: result, length: result.length })
            })
            .catch(error => { throw error })
    }
}
