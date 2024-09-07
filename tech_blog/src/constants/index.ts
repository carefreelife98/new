export const MAIN_PATH = () => '/';
export const POST_SUB_CAT_PATH = (subCategoryNumber: number | string) => `/${subCategoryNumber}`;
export const POST_DETAIL_PATH = (subCategoryNumber: number | string, postNumber: number | string) => `${POST_SUB_CAT_PATH(subCategoryNumber)}/detail/${postNumber}`;