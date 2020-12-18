export interface RouteInterface {
    name: string,
    link: string,
    method: string,
    action: string
}

export interface RouteCollectionInterface {
    routes: Array<RouteInterface>
}