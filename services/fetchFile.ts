import axios from 'axios'
import { File } from "../models/models";

//Deprecated
export interface FileResponse extends File{
    id: string
}

export const putTemplate = async(id:string, template: File) => {
    const {data, status} = await axios.put<FileResponse>('http://localhost:8080/api/v1/templates/'+id,
        template
    )

    return {data, status}
}

export const putSolution = async(id:string, solution: File) => {
    const {data, status} = await axios.put<FileResponse>('http://localhost:8080/api/v1/solutions/'+id,
        solution
    )

    return {data, status}
}