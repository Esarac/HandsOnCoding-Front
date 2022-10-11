export interface SolutionRawDTO extends Omit<SolutionDTO, 'stepId'>{};

export interface SolutionDTO extends Omit<Solution, 'id' | 'updatedAt'>{};

export interface Solution {
    id: string;
    name: string;
    content: string;
    updatedAt: Date;
    stepId: string;
}