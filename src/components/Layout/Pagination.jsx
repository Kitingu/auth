const Pagination = ({ currentPage, totalPages, setCurrentPage, itemsPerPage, totalItems }) => {
  // Only show pagination if totalItems is more than itemsPerPage
  if (totalItems <= itemsPerPage) {
    return null; // Don't render anything if items are less than or equal to itemsPerPage
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageLinks = 5; // Show 5 page links around the current page

    if (totalPages <= maxPageLinks) {
      // If total pages are less than maxPageLinks, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page, last page, and a few around the current page
      const startPage = Math.max(currentPage - 2, 1);
      const endPage = Math.min(currentPage + 2, totalPages);

      // Add first page
      if (startPage > 1) {
        pageNumbers.push(1);
      }

      // Add ellipsis if there's a gap between the first page and startPage
      if (startPage > 2) {
        pageNumbers.push('...');
      }

      // Add pages around the current page
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if there's a gap between the endPage and the last page
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      // Add last page
      if (endPage < totalPages) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav>
      <ul className="pagination">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            {page === '...' ? (
              <span className="page-link">...</span>
            ) : (
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
