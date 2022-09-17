import axios from 'axios'
import { Step } from "../models/models";

export interface StepResponse extends Step {
    id: string
}

export const getStep = async (id: string) => {
    const { data, status } = await axios.get<StepResponse>('http://localhost:8080/api/v1/steps/' + id)

    return { data, status }
}

export const getSteps = async () => {
    const { data, status } = await axios.get<StepResponse[]>('http://localhost:8080/api/v1/steps/')

    return { data, status }
}

export const postStep = async (step: Step) => {
    const { data, status } = await axios.post<StepResponse>('http://localhost:8080/api/v1/steps/', step)

    return { data, status }
}

export const putStep = async (id: string, step: Step) => {
    const { data, status } = await axios.put<StepResponse>('http://localhost:8080/api/v1/steps/' + id, step)

    return { data, status }
}

export const deleteStep = async (id: string) => {
    const { data, status } = await axios.delete<StepResponse>('http://localhost:8080/api/v1/steps/' + id)

    return { data, status }
}