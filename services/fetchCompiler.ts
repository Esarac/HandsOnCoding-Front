import axios from "axios";

export const postCode = async(language: string, code: string) =>{
    const {data, status} = await axios.post('http://localhost:12345/code',
    {
        language,
        text: code
    })

    return {data, status};
}