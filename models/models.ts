export interface Step {
    description: string
    template?: File
    solution?: File
}

export interface FileWhitId extends File{
    id: string
}

export interface File{
    name: string
    content: string
}