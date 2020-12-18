import HelperInterface from './HelperInterface'
import { RouteInterface } from '../../core/router/RouterInterface'
import App from '../../core/App'
import moment from 'moment'

let helpers: HelperInterface[] = [
    {
        name: 'path',
        fn: (name: string): string => {
            let routes: RouteInterface[] = App.getInstance().getAppRouter().getRoutes()
            let route: RouteInterface | undefined
            route = routes.find(r => r.name === name)
            return route === undefined ? '' : route.link
        }
    },
    {
        name: 'dateParser',
        fn: (date: string): string => {
            return moment(new Date(date)).format('DD-MM-YYYY')
        }
    },
    {
        name: 'base_url',
        fn: (url: string): string => {
            return 'http://localhost:3000' + url
        }
    },
    {
        name: 'not',
        fn: (value: any): any => {
            return !value
        }
    },
    {
        name: 'replace',
        fn: (value: string, oldValue: string, newValue: string): string => {
            return value.replace(oldValue, newValue)
        }
    }
]

export default helpers