export interface LanguageDTO extends Omit<Language, 'id'>{};

export interface Language{
    name: string;
    extension: string;
    logo: string;
};