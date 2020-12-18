import React, { Component } from 'react'
import { CounterInterfaceProps, CounterInterfaceState } from '../Definitions'
import numeral from 'numeral'

export default class Counter extends Component<CounterInterfaceProps, CounterInterfaceState> {
    render () {
        return (
            <div>
                <div className="card mb-3" style={ { backgroundColor: this.props.color } }>
                    <div className="card-header font-weight-bold">{ this.props.title }</div>
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold">Total</h5>
                        <p className="card-text float-right" style={ { fontSize: '24px' } }>{ numeral(this.props.counter).format('0,0') }</p>
                    </div>
                </div>
            </div>
        )
    }
}
