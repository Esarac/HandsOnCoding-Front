import { Step } from "../models/models";

export const putStep = async(id:string, step: Step) => {
    let data = '';

    try{
        const response = await fetch('http://localhost:8080/api/v1/steps/'+id,
        {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(step),
        })
        
        data = await response.json()
    }
    catch(e){
        console.log(e)
    }

    return data;
}