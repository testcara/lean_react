import React, { Component } from "react";

export class Counter extends Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
}

export default Counter;
