export interface TemplateDTO extends Omit<Template, 'updatedAt' | 'id'>{};

export interface Template {
    id: string;
    name: string;
    content: string;
    updatedAt: Date;
    stepId: string;
}