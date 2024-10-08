import React, { Component } from "react";

export class ClassLifecycle extends Component {
  state = {
    count: 0,
  };

  componentDidUpdate() {
    document.title = `你点击了${this.state.count}次!`;
  }
  render() {
    return (
      <div>
        <p>你点击了{this.state.count}次！</p>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default ClassLifecycle;
