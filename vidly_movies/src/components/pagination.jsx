import React, { Component } from "react";
import _ from "lodash";
import propTypes from "prop-types";
//input No of Items,Items per page
const Pagination = (props) => {
  const { totalItems, itemsPerPage, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(totalItems / itemsPerPage);
  if (pagesCount == 1) return null;
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {_.range(1, pagesCount + 1).map((i) => (
          <li
            className={currentPage == i ? "page-item active" : "page-item"}
            key={i}
          >
            <a className="page-link" onClick={() => onPageChange(i)}>
              {i}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalItems: propTypes.number.isRequired,
  itemsPerPage: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};
export default Pagination;
