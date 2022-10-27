import axios from 'axios'
import { TemplateDTO } from 'models/templates'
import { SolutionDTO } from 'models/solutions'

const BASE_URL = `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1`

//Template
const TEMPLATE_BASE_URL = `${BASE_URL}/templates`

export const putTemplate = async(id:string, template: TemplateDTO) => {
    const {data, status} = await axios.put<TemplateDTO>(`${TEMPLATE_BASE_URL}/${id}`,
        template
    )

    return {data, status}
}

export const postTemplate = async(template: TemplateDTO) => {
    const {data, status} = await axios.post<TemplateDTO>(`${TEMPLATE_BASE_URL}`,
        template
    )

    return {data, status}
}

// Solution
const SOLUTION_BASE_URL = `${BASE_URL}/solutions`

export const putSolution = async(id:string, solution: SolutionDTO) => {
    const {data, status} = await axios.put<SolutionDTO>(`${SOLUTION_BASE_URL}/${id}`,
        solution
    )

    console.log(data)

    return {data, status}
}

export const postSolution = async(solution: SolutionDTO) => {
    const {data, status} = await axios.post<SolutionDTO>(`${SOLUTION_BASE_URL}`,
        solution
    )

    return {data, status}
}
