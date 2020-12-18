export interface DashboardInterfaceProps {
    userId: string
}
export interface DashboardInterfaceState {
    like: number
    dislike: number
    view: number
    dataset: {
        like: {
            data: Array<number>
            labels: Array<string>
        }
        dislike: {
            data: Array<number>
            labels: Array<string>
        }
        view: {
            data: Array<number>
            labels: Array<string>
        }
    }
}

export interface CounterInterfaceProps {
    title: string
    counter: number
    color: string
}
export interface CounterInterfaceState { }

export interface ChartInterfaceProps {
    tilte: string
    labels: Array<string>
    data: Array<number>
    color: string
}
export interface ChartInterfaceState {
    data: Array<number>
    labels: Array<string>
}