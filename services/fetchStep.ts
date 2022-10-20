import axios from 'axios'
import { Step, StepDTO, StepNested } from "../models/steps";
import { Template, TemplateRawDTO } from '../models/templates';
import { Solution, SolutionRawDTO } from 'models/solutions';

const BASE_URL = "http://localhost:8080/api/v1/steps"

export const getStep = async (id: string) => {
    const { data, status } = await axios.get<StepNested>(`${BASE_URL}/${id}`)

    return { data, status }
}

export const getSteps = async () => {
    const { data, status } = await axios.get<Step[]>(`${BASE_URL}`)

    return { data, status }
}

export const postStep = async (step: StepDTO) => {
    const { data, status } = await axios.post<Step>(`${BASE_URL}`, step)

    return { data, status }
}

export const putStep = async (id: string, step: StepDTO) => {
    const { data, status } = await axios.put<Step>(`${BASE_URL}/${id}`, step)

    return { data, status }
}

export const deleteStep = async (id: string, force: boolean) => {
    const { data, status } = await axios.delete<Step>(`${BASE_URL}/${id}?force=${force}`)

    return { data, status }
}

export const postStepTemplate = async (id: string, template: TemplateRawDTO)=>{
    const { data, status} = await axios.post<Template>(`${BASE_URL}/${id}/template`, template)
    
    return { data, status }
}

export const postStepSolution = async (id: string, solution: SolutionRawDTO)=>{

    const { data, status} = await axios.post<Solution>(`${BASE_URL}/${id}/solution`, solution)
    
    return { data, status }
}