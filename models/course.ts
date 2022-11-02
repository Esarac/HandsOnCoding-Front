import { Lesson, LessonFull, LessonFullDTO } from "./lesson"
import { Resource, ResourceRawDTO } from "./resource"

export interface CourseDTO extends Omit<Course, 'id'>{};

export interface CourseFullDTO extends CourseDTO{
    lessons: LessonFullDTO[]
    resources: ResourceRawDTO[]
}

export interface Course{
    id: string;
    title: string;
    description: string;
};

export interface CourseNested extends Course{
    lessons: Lesson[]
    resources: Resource[]
}

export interface CourseFull extends Course{
    lessons: LessonFull[]
    resources: Resource[]
}