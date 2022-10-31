export interface TestRawDTO extends Omit<TestDTO, 'stepId'>{};

export interface TestDTO extends Omit<Test, 'id'>{}

export interface Test{
    id: string;
    message: string;
    input: string;
    output: string;
    stepId: string;
}