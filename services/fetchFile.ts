import axios from 'axios'
import { TemplateDTO } from 'models/templates'
import { SolutionDTO } from 'models/solutions'

export const putTemplate = async(id:string, template: TemplateDTO) => {
    const {data, status} = await axios.put<TemplateDTO>('http://localhost:8080/api/v1/templates/'+id,
        template
    )

    return {data, status}
}

export const postTemplate = async(template: TemplateDTO) => {
    const {data, status} = await axios.post<TemplateDTO>('http://localhost:8080/api/v1/templates/',
        template
    )

    return {data, status}
}

export const putSolution = async(id:string, solution: SolutionDTO) => {
    const {data, status} = await axios.put<SolutionDTO>('http://localhost:8080/api/v1/solutions/'+id,
        solution
    )

    console.log(data)

    return {data, status}
}

export const postSolution = async(solution: SolutionDTO) => {
    const {data, status} = await axios.post<SolutionDTO>('http://localhost:8080/api/v1/solutions/',
        solution
    )

    return {data, status}
}
