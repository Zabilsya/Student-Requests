import { useState } from 'react';

export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (newPage: number) => {
        setCurrentPage(newPage)
    }

    return {
        currentPage,
        changePage
    }
}