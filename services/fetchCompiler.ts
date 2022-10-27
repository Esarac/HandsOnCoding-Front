import axios from "axios";
import { CompilerInput, CompilerOutput } from "models/compiler";

const BASE_URL = `${process.env.NEXT_PUBLIC_COMPILER_URL}`

export const postCode = async(input: CompilerInput) =>{
    const {data, status} = await axios.post<CompilerOutput>(`${BASE_URL}/compileInput`, input)
    
    return {data, status};
}