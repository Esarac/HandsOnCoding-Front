export interface CompilerInput{
    language: string
    code: string
    input?: string
}

export interface CompilerOutput{
    code: number
    msg: string
}