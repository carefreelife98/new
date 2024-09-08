export const MAIN_PATH = () => '/';
export const POST_BY_CAT_PATH = (categoryName: string, subCategoryName: string) => `/${categoryName}/${subCategoryName}`;
// export const POST_DETAIL_PATH = (subCategoryName: number | string, postNumber: number | string) => `${POST_BY_CAT_PATH(subCategoryNumber)}/detail/${postNumber}`;