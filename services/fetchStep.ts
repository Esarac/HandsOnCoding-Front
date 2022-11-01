import axios from 'axios'
import { Step, StepDTO, StepNested } from "../models/step";
import { File, FileRawDTO } from '../models/file';
import { Test, TestDTO, TestRawDTO } from '../models/test';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/steps`

// Step
export const getStep = async (stepId: string) => {
    const { data, status } = await axios.get<StepNested>(`${BASE_URL}/${stepId}`)

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

export const putStep = async (stepId: string, step: StepDTO) => {
    const { data, status } = await axios.put<Step>(`${BASE_URL}/${stepId}`, step)

    return { data, status }
}

export const deleteStep = async (stepId: string, force: boolean) => {
    const { data, status } = await axios.delete<Step>(`${BASE_URL}/${stepId}?force=${force}`)

    return { data, status }
}

// Template
export const postTemplate = async (stepId: string, template: FileRawDTO) => {
    const { data, status } = await axios.post<File>(`${BASE_URL}/${stepId}/template`, template)

    return { data, status }
}

export const postSolution = async (stepId: string, solution: FileRawDTO) => {
    const { data, status } = await axios.post<File>(`${BASE_URL}/${stepId}/solution`, solution)

    return { data, status }
}

// Tests
export const getTests = async (stepId: string) => {
    const { data, status } = await axios.get<Test[]>(`${BASE_URL}/${stepId}/tests`)

    return { data, status }
}

export const postTest = async (stepId: string, test: TestRawDTO) => {
    const { data, status } = await axios.post<Test>(`${BASE_URL}/${stepId}/tests`, test)

    return { data, status }
}

export const putTest = async (stepId: string, testId: string, test: Test) => {
    const { data, status } = await axios.put<File>(`${BASE_URL}/${stepId}/tests/${testId}`, test)

    return { data, status }
}

export const deleteTest = async (stepId: string, testId: string) => {
    const { data, status } = await axios.delete<File>(`${BASE_URL}/${stepId}/tests/${testId}`)

    return { data, status }
}