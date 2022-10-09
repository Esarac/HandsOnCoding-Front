import axios from "axios";

export const postCode = async(language: string, code: string) =>{
    const {data, status} = await axios.post('http://localhost:12345/compileInput',
    {
        language,
        code
    })

    return {data, status};
}