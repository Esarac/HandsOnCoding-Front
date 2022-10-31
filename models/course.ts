import { Lesson } from "./lessons"
import { Resource } from "./resource"

export interface CourseDTO extends Omit<Course, 'id'>{};

export interface Course{
    id: string;
    title: string;
    description: string;
};

export interface CourseNested extends Course{
    lessons: Lesson[]
    resources: Resource[]
}