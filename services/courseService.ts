import axios from 'axios'
import { Step, StepDTO, StepNested } from "../models/step";
import { File, FileRawDTO } from '../models/file';
import { Test, TestRawDTO } from '../models/test';
import { Course, CourseDTO, CourseNested } from 'models/course';
import { Lesson, LessonDTO, LessonNested } from 'models/lesson';
import { Language } from 'models/language';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1`

// Language
const LANGUAGES_BASE_URL = `${BASE_URL}/languages`

export const getLanguages = async () => {
    const { data, status } = await axios.get<Language[]>(`${LANGUAGES_BASE_URL}`)
    
    return { data, status }
}

// Course
const COURSE_BASE_URL = `${BASE_URL}/courses`

export const getCourse = async (courseId: string) => {
    const {data, status} = await axios.get<CourseNested>(`${COURSE_BASE_URL}/${courseId}`)

    return {data, status}
}

export const getCourseDefault = async (courseId: string) => {
    const {data, status} = await axios.get<Course>(`${COURSE_BASE_URL}/${courseId}?info=default`)

    return {data, status}
}

export const getCourses = async () => {
    const {data, status} = await axios.get<Course[]>(`${COURSE_BASE_URL}`)

    return {data, status}
}

export const postCourse = async (course: CourseDTO) => {
    const {data, status} = await axios.post<Course>(`${COURSE_BASE_URL}`, course)

    return {data, status}
}

export const putCourse = async (courseId: string, course: CourseDTO) => {
    const {data, status} = await axios.put<Course>(`${COURSE_BASE_URL}/${courseId}`, course)

    return {data, status}
}

export const deleteCourse = async (courseId: string, force: boolean=false) => {
    const {data, status} = await axios.delete<Course>(`${COURSE_BASE_URL}/${courseId}`)

    return {data, status}
}

// Lesson
const LESSONS_BASE_URL = `${BASE_URL}/lessons`

export const getLesson = async (lessonId: string) => {
    const { data, status } = await axios.get<LessonNested>(`${LESSONS_BASE_URL}/${lessonId}`)
    
    return { data, status }
}

export const getLessons = async () => {
    const { data, status } = await axios.get<Lesson[]>(`${LESSONS_BASE_URL}`)

    return { data, status }
}

export const postLesson = async (lesson: LessonDTO) => {
    const { data, status } = await axios.post<Lesson>(`${LESSONS_BASE_URL}`, lesson)

    return { data, status }
}

export const putLesson = async (lessonId: string, lesson: LessonDTO) => {
    const { data, status } = await axios.put<Lesson>(`${LESSONS_BASE_URL}/${lessonId}`, lesson)

    return { data, status }
}

export const deleteLesson = async (lessonId: string) => {
    const { data, status } = await axios.delete<Lesson>(`${LESSONS_BASE_URL}/${lessonId}`)

    return { data, status }
}

// Step
const STEP_BASE_URL = `${BASE_URL}/steps`

export const getStep = async (stepId: string) => {
    const { data, status } = await axios.get<StepNested>(`${STEP_BASE_URL}/${stepId}`)

    return { data, status }
}

export const getSteps = async () => {
    const { data, status } = await axios.get<Step[]>(`${STEP_BASE_URL}`)

    return { data, status }
}

export const postStep = async (step: StepDTO) => {
    const { data, status } = await axios.post<Step>(`${STEP_BASE_URL}`, step)

    return { data, status }
}

export const putStep = async (stepId: string, step: StepDTO) => {
    const { data, status } = await axios.put<Step>(`${STEP_BASE_URL}/${stepId}`, step)

    return { data, status }
}

export const deleteStep = async (stepId: string, force: boolean=false) => {
    const { data, status } = await axios.delete<Step>(`${STEP_BASE_URL}/${stepId}?force=${force}`)

    return { data, status }
}

// Template
export const postTemplate = async (stepId: string, template: FileRawDTO) => {
    const { data, status } = await axios.post<File>(`${STEP_BASE_URL}/${stepId}/template`, template)

    return { data, status }
}

// Solution
export const postSolution = async (stepId: string, solution: FileRawDTO) => {
    const { data, status } = await axios.post<File>(`${STEP_BASE_URL}/${stepId}/solution`, solution)

    return { data, status }
}

// Test
export const getTests = async (stepId: string) => {
    const { data, status } = await axios.get<Test[]>(`${STEP_BASE_URL}/${stepId}/tests`)

    return { data, status }
}

export const postTest = async (stepId: string, test: TestRawDTO) => {
    const { data, status } = await axios.post<Test>(`${STEP_BASE_URL}/${stepId}/tests`, test)

    return { data, status }
}

export const putTest = async (stepId: string, testId: string, test: Test) => {
    const { data, status } = await axios.put<File>(`${STEP_BASE_URL}/${stepId}/tests/${testId}`, test)

    return { data, status }
}

export const deleteTest = async (stepId: string, testId: string) => {
    const { data, status } = await axios.delete<File>(`${STEP_BASE_URL}/${stepId}/tests/${testId}`)

    return { data, status }
}