export interface AccueilInterfaceProps { }

export interface CardInterfaceProps {
    id: string
    fileName: string
    postedAt: string
    title: string
    like: string
    dislike: string
    view: string
    isConnected: boolean
}

export interface CardInterfaceSate { }

export interface AccueilInterfaceSate {
    cards: Array<CardInterfaceProps>,
    length: number,
    visible: boolean
}