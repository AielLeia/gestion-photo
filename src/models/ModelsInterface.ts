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
    pseudo: string
    password: string
    phoneNumber: string
}

export interface CommentAttribute {
    id: string
    visitorName: string
    content: string
    to: string
    createAt: string
}

export interface CategoryAttribute {
    id: string
    name: string
    count: number
}

export interface VirtualFolderAttribute {
    id: string
    name: string
    isCreated: string
    count: number
}