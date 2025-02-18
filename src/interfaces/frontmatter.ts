export default interface FrontMatter {
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    teaser: string;
};

export interface FrontMatterWithFilename extends FrontMatter {
    filename: string;
}

export interface FrontMatterWithFilePath extends FrontMatter {
    filepath: string;
}