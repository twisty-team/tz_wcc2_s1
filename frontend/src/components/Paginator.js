import React from "react";
import Pagination from 'react-bootstrap-4-pagination';

const Paginator = ({ total_page, paginationConfig}) => {
    if (total_page > 1) {
        return (
            <Pagination {...paginationConfig} />
        )
    }
    return ('')
}

export default Paginator;