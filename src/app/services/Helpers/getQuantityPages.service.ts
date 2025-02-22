export const GetQuantityPages = (totalItems: number, itemsPerPage: number) => {
    return Math.ceil(totalItems / itemsPerPage);
};