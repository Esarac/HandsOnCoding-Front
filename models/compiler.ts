export interface CodeInput{
    language: string
    code: string
    input?: string
}

export interface CodeOutput{
    code: number
    msg: string
}

export interface CodeTestInput extends CodeInput{
    answer: string
}

export interface CodeTestOutput extends CodeOutput{
    expected: string
    result: string
}