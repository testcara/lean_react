import React, { Component } from 'react'
import MainContext from './context'
import Worldson from './world-son'

export class World extends Component {
  static contextType = MainContext
  render() {
    return (
      <div>
        <hr/>
        World page<br/>
        <p>name: {this.context.name}</p>
        <p>age: {this.context.age}</p>
        <Worldson />
      </div>
    )
  }
}

export default World
