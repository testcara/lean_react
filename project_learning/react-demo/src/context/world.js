import React, { Component } from 'react'
import MainContext from './context'
import Worldson from './world-son'

export class World extends Component {
  static contextType = MainContext
  render() {
    return (
      <div>
        World page -- {this.context}
        <Worldson />
      </div>
    )
  }
}

export default World
