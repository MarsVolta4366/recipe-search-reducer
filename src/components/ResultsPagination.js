import { Pagination } from "@mui/material"

const ResultsPagination = ({ params, setParams, pageCount, currentPage, setCurrentPage, theme }) => {

    const handleChange = (_event, value) => {
        const offset = 10 * (value - 1)
        setParams({
            ...params,
            offset: offset
        })
        setCurrentPage(value)
    }

    return (
        <>
            <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handleChange}
                variant={theme === "light" ? "lightPagination" : "darkPagination"} />
        </>
    )
}

export default ResultsPagination