import React, { Component } from 'react'
import MainContext from './context'

export class Worldson extends Component {

  render() {
    return (
      <div>
        <hr/>
        Son of World Page<br/>
        <p>name: {this.context.name}</p>
        <p>age: {this.context.age}</p>
        </div>
    )
  }
}
Worldson.contextType = MainContext

export default Worldson
