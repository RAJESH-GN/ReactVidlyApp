import React, { Component } from "react";
//input items to show as array,selectedItem
//output is the item that is selected to handle
const ListGroup = (props) => {
  const { items, selectedItem, onGenreSelect } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className={
            item._id == selectedItem._id
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
