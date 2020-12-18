import React, { Component } from 'react'
import Axios from 'axios'
import { RelatedInterfaceProps, RelatedInterfaceState, PictureAttribute } from '../Definitions'

export default class Related extends Component<RelatedInterfaceProps, RelatedInterfaceState> {
    constructor (props: RelatedInterfaceProps) {
        super(props)
        this.state = {
            pictures: [],
            visible: false
        }
    }

    componentDidMount () {
        Axios
            .get(this.props.url, {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                if (response.data === null) return
                let result: Array<PictureAttribute> = []
                for (let index: number = 0; index < response.data.length; index++) {
                    result.push(
                        response.data[index].row
                    )
                }
                this.setState({ pictures: result, visible: true })
            })
            .catch(error => { throw error })
    }

    render () {
        if (this.state.visible)
            return (
                <div>
                    <h3 className="my-4">{ this.props.title }</h3>

                    <div className="row">

                        { this.state.pictures.map((picture, index) => <div key={ index } className="col-md-3 col-sm-6 mb-4">
                            <a href={ 'http://localhost:3000/detail/' + picture.id.replace('http://gestion-photo.com/', '') }>
                                <img style={ { width: '250px', height: '250px' } } src={ '/assets/picture/' + picture.fileName } alt="" />
                            </a>
                        </div>) }

                    </div>
                </div>
            )
        else
            return ''
    }
}
