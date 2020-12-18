import React, { Component } from 'react'
import { SidebarInterfaceProps, SidebarInterfaceState, CategoryAttribute } from '../Definitions'
import Axios from 'axios'
import slugify from 'slugify'

export default class Sidebar extends Component<SidebarInterfaceProps, SidebarInterfaceState> {
    constructor (props: SidebarInterfaceProps) {
        super(props)
        this.state = {
            url: '',
            categories: []
        }
    }

    componentDidMount () {
        Axios
            .get('http://localhost:3000/api/categories', {
                headers: {
                    from: 'js-react'
                }
            })
            .then(response => {
                let results: CategoryAttribute[] = []
                for (let i: number = 0; i < response.data.length; i++) {
                    results.push({
                        id: response.data[i].row.id,
                        name: response.data[i].row.name,
                        count: response.data[i].row.count
                    })
                }
                this.setState({ categories: results })
            })
            .catch(error => { throw new error })
    }


    render () {
        let { categories } = this.state
        let total = 0
        for (let i = 0; i < categories.length; i++) total += +(categories[i].count);
        return (
            <div className={ this.props.styleClass }>
                <ul className="list-group">
                    <a style={ { textDecoration: 'none' } } onClick={ this.onUrlChange } href="http://localhost:3000/api/galery/all">
                        <li className="list-group-item d-flex justify-content-between align-items-center ">
                            Tout
                            <span className="badge badge-primary badge-pill">{ total }</span>
                        </li>
                    </a>
                    { categories.map((category, index) => {
                        return (
                            <a key={ index } onClick={ this.onUrlChange } style={ { textDecoration: 'none' } } href={ "http://localhost:3000/api/galery/" + category.id.replace('http://gestion-photo.com/', '') }>
                                <li key={ index } className="list-group-item d-flex justify-content-between align-items-center ">
                                    { category.name }
                                    <span className="badge badge-primary badge-pill">{ category.count }</span>
                                </li>
                            </a>
                        )
                    }) }
                </ul>
            </div>
        )
    }

    onUrlChange = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.stopPropagation()
        e.preventDefault()
        this.props.onUrlChange(e.currentTarget.href)
    }
}
