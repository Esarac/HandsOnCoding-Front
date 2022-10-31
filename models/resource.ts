export interface ResourceRawDTO extends Omit<ResourceDTO, 'courseId'>{};

export interface ResourceDTO extends Omit<Resource, 'id'>{};

export interface Resource{
    id: string;
    title: string;
    link: string;
    courseId: string;
};