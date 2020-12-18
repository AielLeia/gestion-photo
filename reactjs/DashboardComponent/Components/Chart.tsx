import React, { Component } from 'react'
import { ChartInterfaceProps, ChartInterfaceState } from '../Definitions'
import ChartJS from 'chart.js'
import moment from 'moment'

export default class Chart extends Component<ChartInterfaceProps, ChartInterfaceState> {
    private chartRef: React.RefObject<HTMLCanvasElement>

    constructor (props: ChartInterfaceProps) {
        super(props)
        this.state = {
            data: [],
            labels: []
        }
        this.chartRef = React.createRef()
    }

    shouldComponentUpdate (nextProps: ChartInterfaceProps, nextState: ChartInterfaceState): boolean {
        new ChartJS(this.chartRef.current as HTMLCanvasElement, {
            type: 'line',
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Mois'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Nombres'
                        }
                    }]
                }
            },
            data: {
                labels: nextProps.labels.map(l => moment(l).format('MMMM')),
                datasets: [{
                    label: nextProps.tilte,
                    data: nextProps.data,
                    fill: false,
                    borderColor: nextProps.color,
                    pointRadius: 2,
                    borderWidth: 3,
                    lineTension: 0
                }]
            }
        })
        return true
    }

    render () {
        if (this.props.data !== this.state.data && this.props.labels !== this.state.labels) {
        }
        return (
            <canvas ref={ this.chartRef } />
        )
    }
}
