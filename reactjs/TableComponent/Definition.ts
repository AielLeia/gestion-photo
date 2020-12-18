export interface VirtualFolderAttribute {
    id: string
    name: string
    count: number
}

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

export interface TableInterfaceProps {
    userId: string
}
export interface TableInterfaceState { }

export interface VirtualFolderInterfaceProps {
    userID: string
}
export interface VirtualFolderInterfaceState {
    virtualFolders: VirtualFolderAttribute[]
    pictures: PictureAttribute[]
    showPictures: boolean,
    showAddVirtualFolder: boolean,
    title: string
    addState: {
        error: string | undefined
        success: string | undefined
    }
}
