import React, { Component } from 'react'
import Wrapper from './Components/Wrapper'
import { GaleryInterfaceProps, GaleryInterfaceState } from './Definitions'

export default class Galery extends Component<GaleryInterfaceProps, GaleryInterfaceState> {
    render () {
        return (
            <div>
                <h1 className="mb-4">Galérie</h1>
                <Wrapper />
            </div>
        )
    }
}
