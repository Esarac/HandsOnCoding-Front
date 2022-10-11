export interface TemplateRawDTO extends Omit<TemplateDTO, 'stepId'>{};

export interface TemplateDTO extends Omit<Template, 'id' | 'updatedAt'>{};

export interface Template {
    id: string;
    name: string;
    content: string;
    updatedAt: Date;
    stepId: string;
}