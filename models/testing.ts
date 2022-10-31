import { Language, LanguageDTO } from "./language";
import { Course, CourseDTO } from "./course";
import { Resource, ResourceRawDTO } from "./resource";
import { Lesson, LessonRawDTO } from "./lessons";
import { StepNested, StepRawDTO } from "./step";
import { FileRawDTO } from "./file";
import { TestRawDTO } from "./test";

//Input
export interface ScenarioDTO{
    courses: CourseFullDTO[]
    languages: LanguageDTO[]
}

interface CourseFullDTO extends CourseDTO{
    lessons: LessonFullDTO[]
    resources: ResourceRawDTO[]
}

interface LessonFullDTO extends LessonRawDTO{
    steps: StepFullDTO[]
}

interface StepFullDTO extends StepRawDTO{
    template?: FileRawDTO
    solution?: FileRawDTO
    tests: TestRawDTO[]
}

//Output
export interface Scenario{
    languages: Language[]
    courses: CourseFull[]
}

interface CourseFull extends Course{
    lessons: LessonFull[]
    resources: Resource[]
}

interface LessonFull extends Lesson{
    steps: StepNested[]
}