import React, { Component } from 'react'
import World from './world'
import MainContext from './context'

export class Hello extends Component {
    static contextType = MainContext
    render() {
        return (
            <div>
                Hello Page<br/>
                <p>name: {this.context.name}</p>
                <p>age: {this.context.age}</p>
                <World />
            </div>
        )
    }
}

export default Hello
