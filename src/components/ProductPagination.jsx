import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function ProductPagination({ page,setPage, totalPages }) {

    const navigate = useNavigate()

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
        navigate(`/page/${pageNumber}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const {page_number} = useParams()

    const handdlePrev = () => {
        if(page_number > 1){
            navigate(`/page/${page_number-1}`)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const handdleNext = () => {
        if(page_number < 10){
            navigate(`/page/${page_number - -1}`)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <div className="flex items-center justify-center mt-[50px]">
            <div onClick={() => {handdlePrev()}}  className="mx-1 cursor-pointer text-sm font-semibold text-gray-900">
                &larr;
            </div>
            {
                Array.from({ length: totalPages }).map((_, i) => {
                    return (
                        <a key={i} onClick={() => { handlePageClick(i+1) }} className="mx-1 cursor-pointer flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105">
                            {i + 1}
                        </a>
                    )
                })
            }
            <div onClick={() => {handdleNext()}} className="mx-2 cursor-pointer text-sm font-semibold text-gray-900">
                &rarr;
            </div>
        </div>
    )
}

export default ProductPagination