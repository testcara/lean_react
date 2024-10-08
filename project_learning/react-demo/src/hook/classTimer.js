import React, { Component } from "react";

export class ClassTimer extends Component {
  state = {
    count: 0,
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return <div>{this.state.count}</div>;
  }
}

export default ClassTimer;
