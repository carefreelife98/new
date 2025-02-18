export default interface MarkdownFileCount {
    total: number;
    countsBySubCategory: Record<string, number>;
}