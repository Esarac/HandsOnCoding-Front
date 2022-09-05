import { Step, StepWithId } from "../models/models";

export const putStep = async(id:string, step: Step) => {
    let data: StepWithId | null = null;

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

export const getStep = async(id:string) => {
    let data: StepWithId | null = null;

    try{
        const response = await fetch("http://localhost:8080/api/v1/steps/" + id)
        data = await response.json()
    }
    catch(e){
        console.log(e)
    }

    return data;
}

export const getSteps = async() => {
    let data: StepWithId[] = [];

    try{
        const response = await fetch("http://localhost:8080/api/v1/steps/")
        data = await response.json()
    }
    catch(e){
        console.log(e)
    }

    return data;
}