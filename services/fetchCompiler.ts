import axios from "axios";
import { CodeInput, CodeOutput, CodeTestInput, CodeTestOutput } from "models/compiler";

const BASE_URL = `${process.env.NEXT_PUBLIC_COMPILER_URL}`

export const postCode = async(input: CodeInput) =>{
    const {data, status} = await axios.post<CodeOutput>(`${BASE_URL}/compileInput`, input)
    
    return {data, status};
}

export const runTest = async(code: CodeInput, input: string, output: string)=>{
    const inputTest: CodeTestInput = {...code, input, answer: output}
    const {data, status} = await axios.post<CodeTestOutput>(`${BASE_URL}/judgeInput`, inputTest)

    return {data, status}
}