export interface FileRawDTO extends Omit<FileDTO, 'stepId'>{};

export interface FileDTO extends Omit<File, 'id' | 'updatedAt'>{};

export interface File{
    id: string;
    name: string;
    content: string;
    updatedAt: Date;
    stepId: string;
};