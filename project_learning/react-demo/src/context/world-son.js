import React, { Component } from 'react'
import MainContext from './context'

export class Worldson extends Component {

  render() {
    return (
        <div>
            Son of World page -- { this.context }
        </div>
    )
  }
}
Worldson.contextType = MainContext

export default Worldson
