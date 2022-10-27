import axios from 'axios'
import { Lesson, LessonNested } from "../models/lessons";

const BASE_URL = `${process.env.BACK_URL}/api/v1/lessons`

export const getLesson = async (id: string) => {
    const { data, status } = await axios.get<LessonNested>(`${BASE_URL}/${id}`)

    return { data, status }
}

export const getLessons = async () => {
    const { data, status } = await axios.get<Lesson[]>(`${BASE_URL}`)

    return { data, status }
}

export const postLesson = async (lesson: Lesson) => {
    const { data, status } = await axios.post<Lesson>(`${BASE_URL}`, lesson)

    return { data, status }
}

export const putLesson = async (id: string, lesson: Lesson) => {
    const { data, status } = await axios.put<Lesson>(`${BASE_URL}/${id}`, lesson)

    return { data, status }
}

export const deleteLesson = async (id: string) => {
    const { data, status } = await axios.delete<Lesson>(`${BASE_URL}/${id}`)

    return { data, status }
}