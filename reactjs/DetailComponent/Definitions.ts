export interface PictureAttribute {
    id: string
    fileName: string
    postedAt: string
    isStored: string
    belongsTo: string
    isPosted: string
    title: string
    description: string
    isVisible: boolean
    like: number
    dislike: number
    view: number
}

export interface UserAttribute {
    id: string
    firstName: string
    lastName: string
}

export interface CommentAttribute {
    id: string
    visitorName: string
    to: string
    createAt: string
    content: string
}

export interface DetailInterfaceProps {
    id: string
}
export interface DetailInterfaceState {
    picture: PictureAttribute
    state: 'loaded' | 'error' | 'loading'
}

export interface RelatedInterfaceProps {
    title: string
    url: string
}
export interface RelatedInterfaceState {
    pictures: Array<PictureAttribute>
    visible: boolean
}

export interface HeaderInterfaceProps {
    picture: PictureAttribute
}
export interface HeaderInterfaceState {
    user: UserAttribute
}

export interface CommentInterfaceProps {
    id: string
}
export interface CommentInterfaceState {
    comments: Array<CommentAttribute>
    error: {
        key: string
        message: string
    }
}