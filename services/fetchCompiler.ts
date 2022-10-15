import axios from "axios";
import { CompilerInput, CompilerOutput } from "models/compiler";

export const postCode = async(input: CompilerInput) =>{
    const {data, status} = await axios.post<CompilerOutput>('http://localhost:12345/compileInput', input)

    return {data, status};
}