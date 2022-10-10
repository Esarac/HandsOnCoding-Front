import { Template } from "./templates"
import { Solution } from "./solutions"

export interface StepDTO extends Omit<Step, 'id'>{};

export interface Step {
    id: string;
    description: string;
    lessonId: string;
} 

export interface StepNested extends Step {
    template: Template | null;
    solution: Solution | null;
}