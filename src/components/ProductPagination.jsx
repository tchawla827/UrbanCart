import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ProductPagination({ page, setPage, totalPages }) {
  const navigate = useNavigate();
  const { page_number } = useParams();

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    navigate(`/page/${pageNumber}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handdlePrev = () => {
    if (page_number && parseInt(page_number) > 1) {
      navigate(`/page/${parseInt(page_number) - 1}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handdleNext = () => {
    if (page_number && parseInt(page_number) < 10) {
      navigate(`/page/${parseInt(page_number) + 1}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentPage = page_number ? parseInt(page_number) : page;

  return (
    <div className="flex items-center justify-center mt-12 mb-8">
      <nav className="flex items-center space-x-2" aria-label="Pagination">
        {/* Previous Button */}
        <button
          onClick={handdlePrev}
          disabled={currentPage <= 1}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={i}
                onClick={() => handlePageClick(pageNumber)}
                className={`flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                  isActive
                    ? 'bg-blue-600 dark:bg-blue-500 text-white border border-blue-600 dark:border-blue-500 shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handdleNext}
          disabled={currentPage >= totalPages}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}

export default ProductPagination;
