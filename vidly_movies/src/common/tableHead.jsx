import React, { Component } from "react";

//input column name as array
// sortColumn:object
// onSort:Event
class TableHead extends Component {
  handleSort = (path) => {
    console.log("TableHead -> handleSort -> path", path);
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  getSortedIcon = (column) => {
    if (this.props.sortColumn.path !== column.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    else {
      return <i className="fa fa-sort-desc"></i>;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.handleSort(column.path)}
            >
              {column.label}
              {this.getSortedIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
