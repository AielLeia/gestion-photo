import React, { Component } from 'react'
import { TableInterfaceProps, TableInterfaceState } from './Definition'
import VirtualFolder from './Components/VirtualFolder'

export default class Table extends Component<TableInterfaceProps, TableInterfaceState> {
    render () {
        return (
            <div>
                <VirtualFolder
                    userID={ this.props.userId }
                />
            </div>
        )
    }
}
