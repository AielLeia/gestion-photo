import React, { Component } from 'react'
import { DashboardInterfaceProps, DashboardInterfaceState } from './Definitions'
import Axios from 'axios'
import Counter from './Components/Counter'
import Chart from './Components/Chart'

export default class Dashboard extends Component<DashboardInterfaceProps, DashboardInterfaceState> {
    constructor (props: DashboardInterfaceProps) {
        super(props)
        this.state = {
            like: 0,
            dislike: 0,
            view: 0,
            dataset: {
                like: {
                    data: [],
                    labels: []
                },
                dislike: {
                    data: [],
                    labels: []
                },
                view: {
                    data: [],
                    labels: []
                }
            }
        }
    }
    componentDidMount () {
        Axios
            .get('http://localhost:3000/api/statistics/' + this.props.userId.replace('http://gestion-photo.com/', ''), {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                this.setState({ like: response.data.like, dislike: response.data.dislike, view: response.data.view })
            })
            .catch(error => { throw error })
        Axios
            .get('http://localhost:3000/api/statisticsbymonth/' + this.props.userId.replace('http://gestion-photo.com/', ''), {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                this.setState({ dataset: response.data })
                this.forceUpdate()
            })
            .catch(error => { throw error })

    }

    render () {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <Counter
                            title="Likes"
                            counter={ this.state.like }
                            color="#29717A"
                        />
                    </div>
                    <div className="col-md-4">
                        <Counter
                            title="Dislikes"
                            counter={ this.state.dislike }
                            color="#2A9181"
                        />
                    </div>
                    <div className="col-md-4">
                        <Counter
                            title="Vues"
                            counter={ this.state.view }
                            color="#27875D"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Chart
                            tilte="Likes"
                            labels={ this.state.dataset.like.labels }
                            data={ this.state.dataset.like.data }
                            color="#29717A"
                        />
                    </div>
                    <div className="col-md-6">
                        <Chart
                            tilte="Dislikes"
                            labels={ this.state.dataset.dislike.labels }
                            data={ this.state.dataset.dislike.data }
                            color="#2A9181"
                        />
                    </div>
                    <div className="col-md-12">
                        <Chart
                            tilte="Vues"
                            labels={ this.state.dataset.view.labels }
                            data={ this.state.dataset.view.data }
                            color="#27875D"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
