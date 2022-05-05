export interface IPaginationData<T> {
    page: number
    totalPages: number
    rows: T[]
}