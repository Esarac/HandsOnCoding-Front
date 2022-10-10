import axios from 'axios'
import { Lesson, LessonNested } from "../models/lessons";

export const getLesson = async (id: string) => {
    const { data, status } = await axios.get<LessonNested>('http://localhost:8080/api/v1/lessons/' + id)

    return { data, status }
}

export const getLessons = async () => {
    const { data, status } = await axios.get<Lesson[]>('http://localhost:8080/api/v1/lessons/')

    return { data, status }
}

export const postLesson = async (lesson: Lesson) => {
    const { data, status } = await axios.post<Lesson>('http://localhost:8080/api/v1/lessons/', lesson)

    return { data, status }
}

export const putLesson = async (id: string, lesson: Lesson) => {
    const { data, status } = await axios.put<Lesson>('http://localhost:8080/api/v1/lessons/' + id, lesson)

    return { data, status }
}

export const deleteLesson = async (id: string) => {
    const { data, status } = await axios.delete<Lesson>('http://localhost:8080/api/v1/lessons/' + id)

    return { data, status }
}