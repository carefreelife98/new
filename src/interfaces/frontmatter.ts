export default interface FrontMatter {
    title: string;
    description: string;
    author: string;
    date: string;
    categories: string[];
    tags: string[];
    thumbnail?: string;
};

export interface FrontMatterWithFilename extends FrontMatter {
    filename: string;
}

export interface FrontMatterWithFilePath extends FrontMatter {
    filepath: string;
}