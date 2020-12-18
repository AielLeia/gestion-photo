import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import { WrapperInterfaceProps, WrapperInterfaceState, PictureAttribute } from '../Definitions'
import Axios from 'axios'

export default class Wrapper extends Component<WrapperInterfaceProps, WrapperInterfaceState> {
    constructor (props: WrapperInterfaceProps) {
        super(props)
        this.state = {
            url: 'http://localhost:3000/api/galery/all',
            pictures: []
        }
    }

    componentDidMount () {
        this.load(this.state.url)
    }

    onUrlChange = (url: string): void => {
        if (this.state.url !== url)
            this.load(url)
    }

    render () {
        return (
            <div className="row mt-4">
                <Sidebar
                    styleClass="col-md-3"
                    onUrlChange={ this.onUrlChange }
                />
                <Content
                    styleClass="col-md-9"
                    url={ this.state.url }
                    length={ 12 }
                    initialPictures={ this.state.pictures }
                />
            </div>
        )
    }

    private load (url: string): void {
        Axios
            .get(url, {
                params: {
                    offset: 0
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
                // if (where === 'moreLoad') {
                //     let result: PictureAttribute[] = this.state.pictures.slice()
                //     data.forEach(d => result.push(d))
                //     if (response.headers['cant-fetch'] == 'true') {
                //         this.setState({ visible: false })
                //     }
                //     this.setState({ pictures: result, length: result.length })
                // } else {
                this.setState({ pictures: data, url: url })
                this.forceUpdate()
                // }
            })
            .catch(error => { throw error })
    }
}
