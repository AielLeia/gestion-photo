import React, { Component } from 'react'
import { DetailPictureInterfaceProps, DetailPictureInterfaceState } from './Definitions'
import DataPrint from './Components/DataPrint'

export default class DetailPicture extends Component<DetailPictureInterfaceProps, DetailPictureInterfaceState> {
    render () {
        return (
            <div>
                <DataPrint
                    pictureId={ this.props.pictureId }
                />
            </div>
        )
    }
}
