export interface CategoryAttribute {
    id: string
    name: string
    count: number
}

export interface PictureAttribute {
    id: string
    fileName: string
    postedAt: string
    title: string
    like: string
    dislike: string
    view: string
    isConnected: boolean
}

export interface GaleryInterfaceState { }
export interface GaleryInterfaceProps { }

export interface WrapperInterfaceState {
    url: string
    pictures: Array<PictureAttribute>
}
export interface WrapperInterfaceProps { }

export interface SidebarInterfaceState {
    url: string
    categories: Array<CategoryAttribute>
}
export interface SidebarInterfaceProps {
    styleClass: string
    onUrlChange: (url: string) => void
}

export interface ContentInterfaceState {
    pictures: Array<PictureAttribute>
    url: string
    length: number
    visible: boolean
}
export interface ContentInterfaceProps {
    styleClass: string
    url: string
    length: number
    initialPictures: Array<PictureAttribute>
}
