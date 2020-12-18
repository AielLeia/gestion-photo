import React, { Component } from 'react'
import moment from 'moment'
import { HeaderInterfaceProps, HeaderInterfaceState, UserAttribute } from '../Definitions'
import Axios from 'axios'

export default class Header extends Component<HeaderInterfaceProps, HeaderInterfaceState> {
    constructor (props: HeaderInterfaceProps) {
        super(props)
        this.state = {
            user: {
                id: '',
                firstName: '',
                lastName: ''
            }
        }
    }

    componentDidMount () {
        Axios
            .get('http://localhost:3000/api/user/' + this.props.picture.isPosted.replace('http://gestion-photo.com/', ''), {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                console.log(response.data)
                let result: UserAttribute = {
                    id: response.data.row.id,
                    firstName: response.data.row.firstName,
                    lastName: response.data.row.lastName
                }
                this.setState({ user: result })
            })
            .catch(error => { throw error })
    }

    render () {
        return (
            <div>
                <h1 className="my-4 text-uppercase">{ this.props.picture.title }</h1>

                <div>
                    <img className="img-fluid" src={ '/assets/picture/' + this.props.picture.fileName } />
                </div>

                <div>
                    <h3 className="my-3">Description</h3>
                    <p>{ this.props.picture.description }</p>
                    <h5 className="my-3 text-muted">Posté par: { this.state.user.firstName + ' ' + this.state.user.lastName.toUpperCase() } à { moment(new Date(this.props.picture.postedAt)).format('DD/MM/YYYY') }</h5>
                </div>

            </div>
        )
    }
}
