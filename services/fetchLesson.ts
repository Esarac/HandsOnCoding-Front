import axios from 'axios'
import { Language } from 'models/language';
import { Lesson, LessonDTO, LessonNested } from "../models/lessons";

const BASE_URL_LESSONS = `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/lessons`

export const getLesson = async (id: string) => {
    const { data, status } = await axios.get<LessonNested>(`${BASE_URL_LESSONS}/${id}`)

    return { data, status }
}

export const getLessons = async () => {
    const { data, status } = await axios.get<Lesson[]>(`${BASE_URL_LESSONS}`)

    return { data, status }
}

export const postLesson = async (lesson: LessonDTO) => {
    const { data, status } = await axios.post<Lesson>(`${BASE_URL_LESSONS}`, lesson)

    return { data, status }
}

export const putLesson = async (id: string, lesson: LessonDTO) => {
    const { data, status } = await axios.put<Lesson>(`${BASE_URL_LESSONS}/${id}`, lesson)

    return { data, status }
}

export const deleteLesson = async (id: string) => {
    const { data, status } = await axios.delete<Lesson>(`${BASE_URL_LESSONS}/${id}`)

    return { data, status }
}

const BASE_URL_LANGUAGES = `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/languages`

export const getLanguages = async () => {
    const { data, status } = await axios.get<Language[]>(`${BASE_URL_LANGUAGES}`)
    
    return { data, status }
}