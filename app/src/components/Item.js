import React, { Component } from "react";

class Item extends Component {
  clickedOption = (event, index) => {
    alert("clicked at index: ", index);
  };

  render() {
    return (
      <div
        className="option"
        onClick={event => this.clickedOption(event, this.props.position)}
      >
        <option value={this.props.item} />
      </div>
    );
  }
}

export default Item;
