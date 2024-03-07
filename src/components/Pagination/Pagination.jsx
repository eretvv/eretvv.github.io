import React from 'react';
import './pagination.css';

function Pagination({ currentPage, totalPages, goToPrevPage, goToNextPage }) {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={goToPrevPage}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      <div className="pagination-page">{currentPage}</div>
      <button
        className="pagination-btn"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  );
}

export default Pagination;
