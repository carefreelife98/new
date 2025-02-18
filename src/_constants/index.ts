export const MAIN_PATH = () => '/';
export const POST_BY_CAT_PATH = (categoryName: string, subCategoryName: string) => `/${categoryName}/${subCategoryName}`;
export const POST_DETAIL_PATH = (categoryName: string, subCategoryName: string, fileName: string) => `/${categoryName}/${subCategoryName}/${fileName}`;