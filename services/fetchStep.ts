import axios from 'axios'
import { Step, StepNested } from "../models/steps";

export const getStep = async (id: string) => {
    const { data, status } = await axios.get<StepNested>('http://localhost:8080/api/v1/steps/' + id)

    return { data, status }
}

export const getSteps = async () => {
    const { data, status } = await axios.get<Step[]>('http://localhost:8080/api/v1/steps/')

    return { data, status }
}

export const postStep = async (step: Step) => {
    const { data, status } = await axios.post<Step>('http://localhost:8080/api/v1/steps/', step)

    return { data, status }
}

export const putStep = async (id: string, step: Step) => {
    const { data, status } = await axios.put<Step>('http://localhost:8080/api/v1/steps/' + id, step)

    return { data, status }
}

export const deleteStep = async (id: string) => {
    const { data, status } = await axios.delete<Step>('http://localhost:8080/api/v1/steps/' + id)

    return { data, status }
}