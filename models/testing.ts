import { Language, LanguageDTO } from "./language";
import { CourseFull, CourseFullDTO } from "./course";

//Input
export interface ScenarioDTO{
    courses: CourseFullDTO[]
    languages: LanguageDTO[]
}

//Output
export interface Scenario{
    languages: Language[]
    courses: CourseFull[]
}