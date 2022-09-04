import { File } from "../models/models";

export const putTemplate = async(id:string, template: File) => {
    let data = '';

    try{
        const response = await fetch('http://localhost:8080/api/v1/templates/'+id,
        {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({content:template.content}),
        })
        
        data = await response.json()
    }
    catch(e){
        console.log(e)
    }

    return data;
}

export const putSolution = async(id:string, solution: File) => {
    let data = '';

    try{
        const response = await fetch('http://localhost:8080/api/v1/solutions/'+id,
        {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({content:solution.content}),
        })
        
        data = await response.json()
    }
    catch(e){
        console.log(e)
    }

    return data;
}