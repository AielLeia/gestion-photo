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

export interface CategoryAttribute {
    id: string
    name: string
}

export interface VirtualFolderAttribute {
    id: string
    name: string
}

export interface CommentAttribute {
    id: string
    visitorName: string
    content: string
    createAt: string
}

export interface DetailPictureInterfaceProps {
    userId: string
    pictureId: string
}
export interface DetailPictureInterfaceState { }


export interface DataPrintInterfaceProps {
    pictureId: string
}
export interface DataPrintInterfaceState {
    picture: PictureAttribute
    categories: Array<CategoryAttribute>
    virtualFolders: Array<VirtualFolderAttribute>
    comments: Array<CommentAttribute>
    save: boolean
    updated: boolean
}