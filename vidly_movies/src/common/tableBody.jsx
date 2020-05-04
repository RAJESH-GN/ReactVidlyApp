import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  getBody = (item, property) => {
    if (property.content) {
      return property.content(item);
    }
    return _.get(item, property.path);
  };

  render() {
    return (
      <tbody>
        {this.props.items.map((item) => (
          <tr key={item._id}>
            {this.props.columns.map((property) => (
              <td key={item._id + (property.path || property.key)}>
                {this.getBody(item, property)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
