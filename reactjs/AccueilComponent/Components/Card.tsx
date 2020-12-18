import React, { Component } from 'react'
import { CardInterfaceProps, CardInterfaceSate } from '../Definitions'
import { abbreviateNumber } from 'js-abbreviation-number'
import moment from 'moment'

export default class Card extends Component<CardInterfaceProps, CardInterfaceSate> {
    private readonly HOST: string = 'http://gestion-photo.com/'
    render () {
        return (
            <div className="col-md-4 mt-4 mb-4">
                <div className="card">
                    <div className="card-header">
                        <div className="text-uppercase font-weight-bold">
                            <a href={ '/detail/' + this.props.id.replace(this.HOST, '') }>{ this.props.title }</a>
                        </div>
                        <div>
                            <i className="far fa-clock mr-2 text-secondary"><span className="p-2">{ moment(new Date(this.props.postedAt)).format('DD/MM/YYYY') }</span></i>
                        </div>
                    </div>
                    <img className="card-img" src={ '/assets/picture/' + this.props.fileName } height="300" width="300" />
                    <div className="card-footer text-muted">
                        <div className="d-flex flex-row-reverse">
                            <i className="m-2 far fa-eye"><span className="p-2">{ abbreviateNumber(+this.props.view, 1) }</span></i>
                            <i className="m-2 far fa-thumbs-down"><span className="p-2">{ abbreviateNumber(+this.props.dislike, 1) }</span></i>
                            <i className="m-2 far fa-thumbs-up"><span className="p-2">{ abbreviateNumber(+this.props.like, 1) }</span></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
