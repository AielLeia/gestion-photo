import React, { Component } from 'react'
import { AccueilInterfaceProps, AccueilInterfaceSate, CardInterfaceProps } from './Definitions'
import axios from 'axios'
import Card from './Components/Card'

export default class Accueil extends Component<AccueilInterfaceProps, AccueilInterfaceSate> {
    public state: AccueilInterfaceSate

    private BASE_URL: string = 'http://localhost:3000/api/'

    constructor (props: AccueilInterfaceProps) {
        super(props)
        this.state = {
            cards: [],
            length: 0,
            visible: true
        }
    }

    componentDidMount () {
        this.load()
    }

    public moreLoad = (): void => {
        this.load()
    }

    render () {
        return (
            <div>
                <div className="row mt-4">
                    { this.state.cards.map((card, index) => {
                        return (
                            <Card
                                key={ index }
                                id={ card.id }
                                fileName={ card.fileName }
                                postedAt={ card.postedAt }
                                title={ card.title }
                                like={ card.like }
                                dislike={ card.dislike }
                                view={ card.view }
                                isConnected={ card.isConnected }
                            />
                        )
                    }
                    ) }
                </div>
                { (this.state.visible) ?
                    <button className="btn btn-primary m-4" onClick={ this.moreLoad }>plus de photos</button>
                    : null
                }
            </div>
        )
    }

    private load (): void {
        axios.get(this.BASE_URL + 'pictures', {
            params: {
                offset: this.state.length
            },
            headers: {
                'from': 'js-react'
            }
        }).then(response => {
            let data: CardInterfaceProps[] = []
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
            let result: CardInterfaceProps[] = this.state.cards.slice()
            data.forEach(d => result.push(d))
            if (response.headers['cant-fetch'] == 'true') {
                this.setState({ visible: false })
            }
            this.setState({ cards: result, length: result.length })
        }).catch(err => { throw err })
    }
}
