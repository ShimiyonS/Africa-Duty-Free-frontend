import React, { useState, useMemo } from "react";

const Pagination = ({
  currentPage = 1,
  pageSize = 5,
  totalPages = 1,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  siblingCount = 1,
}) => {
  const [jump, setJump] = useState("");

  const pages = useMemo(() => {
    const total = Math.max(1, Math.floor(totalPages || 1));
    const siblings = Math.max(0, siblingCount);
    const totalPageNumbers = siblings * 2 + 5;

    if (total <= totalPageNumbers) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 2);
    const rightSiblingIndex = Math.min(currentPage + siblings, total - 1);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < total - 1;

    const result = [];
    result.push(1);

    if (showLeftDots) {
      result.push("...");
    } else {
      for (let i = 2; i < leftSiblingIndex; i++) result.push(i);
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) result.push(i);

    if (showRightDots) {
      result.push("...");
    } else {
      for (let i = rightSiblingIndex + 1; i < total; i++) result.push(i);
    }

    result.push(total);
    return result;
  }, [currentPage, totalPages, siblingCount]);

  const handleGoTo = () => {
    const n = Number(jump);
    if (!Number.isFinite(n)) return setJump("");
    if (n >= 1 && n <= totalPages) onPageChange(n);
    setJump("");
  };

  const changePage = (p) => {
    if (p === "..." || p < 1 || p > totalPages) return;
    if (p !== currentPage) onPageChange(p);
  };

  return (
    <div className="pagination-container">
      {/* items per page selector */}
      <div>
        <label style={{ marginRight: 8 }}>Items per page:</label>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* pager */}
      <div className="pagination-box">
        <button
          className="pagination-btn"
          onClick={() => changePage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>

        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="pagination-dots">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => changePage(p)}
              className={`pagination-page-btn ${
                p === currentPage ? "active" : ""
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          className="pagination-btn"
          onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>

      {/* jump to page */}
      <div>
        <input
          type="number"
          value={jump}
          placeholder="Page #"
          onChange={(e) => setJump(e.target.value)}
          style={{ width: 80, marginRight: 8 }}
        />
        <button onClick={handleGoTo} className="pagination-btn">
          Go
        </button>
        <div className="pagination-info">
          Page {currentPage} of {Math.max(1, Number(totalPages || 1))}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
