export interface SolutionDTO extends Omit<Solution, 'updatedAt' | 'id'>{};


export interface Solution {
    id: string;
    name: string;
    content: string;
    updatedAt: Date;
    stepId: string;
}