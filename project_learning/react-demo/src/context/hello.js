import React, { Component } from 'react'
import World from './world'
import MainContext from './context'

export class Hello extends Component {
    static contextType = MainContext
    render() {
        return (
            <div>
                Hello Page -- { this.context }
                <World />
            </div>
        )
    }
}

export default Hello
